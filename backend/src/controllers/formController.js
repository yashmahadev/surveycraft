const Form = require('../models/Form');
const { Op } = require('sequelize');
const Response = require('../models/Response');
const sequelize = require('sequelize');

exports.createForm = async (req, res) => {
  try {
    const { title, description, fields } = req.body;

    const form = await Form.create({
      title,
      description,
      fields,
      userId: req.user.id,
    });

    res.status(201).json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getForms = async (req, res) => {
  try {
    const forms = await Form.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Response,
        as: 'responses',
        attributes: []
      }],
      attributes: [
        'id',
        'title',
        'description',
        'fields',
        'userId',
        'isPublished',
        'customSlug',
        'createdAt',
        'updatedAt',
        [sequelize.fn('COUNT', sequelize.col('responses.id')), 'totalResponses']
      ],
      group: ['Form.id', 'Form.title', 'Form.description', 'Form.fields', 'Form.userId', 'Form.isPublished', 'Form.customSlug', 'Form.createdAt', 'Form.updatedAt']
    });

    res.json({
      forms,
      message: 'Forms fetched successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateForm = async (req, res) => {
  try {
    const formId = req.params.id;

    const form = await Form.findByPk(formId);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    await form.update(req.body, {
      where: { id: formId }
    });
    res.status(200).json(form);
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const deleted = await Form.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFormResponses = async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.formId);
    if (!form) return res.status(404).json({ error: 'Form not found' });

    const responses = await Response.findAll({
      where: { formId: form.id },
      order: [['submittedAt', 'DESC']]
    });

    res.json({ form, responses });
  } catch (err) {
    console.error('Fetch responses error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.publishForm = async (req, res) => {
  try {
    const { published } = req.body;
    const formId = req.params.id;

    // Validate input
    if (typeof published !== 'boolean') {
      return res.status(400).json({ message: 'The "published" field must be a boolean (true or false).' });
    }

    // Find the form
    const form = await Form.findByPk(formId);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Update the form
    await form.update({ isPublished: published }, {
      where: { id: formId },
      returning: true,
      plain: true
    });

    // Fetch the updated form
    const updatedForm = await Form.findByPk(formId);
    res.status(200).json(updatedForm);

  } catch (error) {
    console.error('Error in /:id/publish:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateCustomSlug = async (req, res) => {
  try {
    const { id } = req.params;
    const { customSlug } = req.body;

    if (!customSlug) {
      return res.status(400).json({ message: 'Custom slug is required' });
    }

    // Check if slug is already taken
    const existingForm = await Form.findOne({ 
      where: { 
        customSlug,
        id: { [Op.ne]: id } // Not equal to current form id
      }
    });
    
    if (existingForm) {
      return res.status(400).json({ message: 'This custom URL is already taken' });
    }

    const form = await Form.update(
      { customSlug },
      { 
        where: { id },
        returning: true,
        plain: true
      }
    );

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json(form);
  } catch (error) {
    console.error('Error updating custom slug:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFormBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const form = await Form.findOne({ 
      where: {
        [Op.or]: [
          { id: slug },
          { customSlug: slug }
        ],
        isPublished: true
      }
    });

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json(form);
  } catch (error) {
    console.error('Error fetching form by slug:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 

exports.submitForm = async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    const response = await Response.create({
      formId: form.id,
      answers: req.body.responses
    });

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (err) {
    console.error('Error submitting form:', err);
    res.status(500).json({ message: 'Submission failed', error: err.message });
  }
};

exports.getFormResponseById = async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    res.json(form);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};