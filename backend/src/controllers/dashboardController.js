const Form = require('../models/Form');
const Response = require('../models/Response');
const { Op, fn, col, literal, where } = require('sequelize');

exports.mainDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total and active surveys
    const totalSurveys = await Form.count({ where: { userId } });
    const activeSurveys = await Form.count({ where: { userId, isPublished: true } });

    // All forms for user
    const forms = await Form.findAll({ where: { userId }, attributes: ['id', 'title'] });
    const formIds = forms.map(f => f.id);

    // Total responses
    const totalResponses = await Response.count({ where: { formId: { [Op.in]: formIds } } });

    // Average response rate
    const responseRate = totalSurveys ? +(totalResponses / totalSurveys).toFixed(2) : 0;

    // Recent 5 responses
    const recentRaw = await Response.findAll({
      where: { formId: { [Op.in]: formIds } },
      include: [{ model: Form, as: 'form', attributes: ['title'] }],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    const recentResponses = recentRaw.map(r => ({
      id: r.id,
      surveyName: r.form.title,
      date: r.createdAt.toISOString()
    }));

    // Popular surveys (Top 5 by response count)
    const popularRaw = await Response.findAll({
      attributes: [
        'formId',
        [fn('COUNT', col('Response.id')), 'responses']
      ],
      where: { formId: { [Op.in]: formIds } },
      group: ['Response.formId'],
      include: [
        {
          model: Form,
          as: 'form',
          attributes: ['id', 'title']
        }
      ],
      order: [[fn('COUNT', col('Response.id')), 'DESC']],
      limit: 5
    });    

    const popularSurveys = popularRaw.map(row => ({
      id: row.form.id,
      name: row.form.title,
      responses: parseInt(row.get('responses')),
      completionRate: 100 // Placeholder: adjust if `isComplete` available
    }));

    // Completion rates per form
    const completionRates = await Promise.all(
      forms.map(async (form) => {
        const responses = await Response.findAll({ where: { formId: form.id } });
        const completed = responses.filter(r => r.isComplete).length;
        const rate = responses.length ? Math.round((completed / responses.length) * 100) : 0;
        return { name: form.title, rate };
      })
    );

    // Monthly responses (last 6 months)
    const monthly = await Response.findAll({
      attributes: [
        [fn('DATE_FORMAT', col('createdAt'), '%Y-%m'), 'date'],
        [fn('COUNT', '*'), 'responses']
      ],
      where: {
        formId: { [Op.in]: formIds },
        createdAt: {
          [Op.gte]: literal("DATE_SUB(CURDATE(), INTERVAL 6 MONTH)")
        }
      },
      group: [fn('DATE_FORMAT', col('createdAt'), '%Y-%m')],
      order: [[col('date'), 'ASC']]
    });

    const monthlyResponses = monthly.map(m => ({
      date: m.get('date'),
      responses: parseInt(m.get('responses'))
    }));

    // Device distribution (example only if device is stored)
    // const devices = await Response.findAll({
    //   attributes: ['device', [fn('COUNT', '*'), 'count']],
    //   where: { formId: { [Op.in]: formIds } },
    //   group: ['device']
    // });

    // const deviceDistribution = devices.map(d => ({
    //   device: d.device || 'Unknown',
    //   count: parseInt(d.get('count'))
    // }));

    // Final response
    res.json({
      totalSurveys,
      activeSurveys,
      totalResponses,
      responseRate,
      recentResponses,
      popularSurveys,
      monthlyResponses,
      completionRates,
      // deviceDistribution
    });
  } catch (err) {
    console.error('Dashboard fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};