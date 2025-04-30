const Template = require("../models/Template");

exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll();
    const formatted = templates.map((template) => ({
      id: template.id,
      title: template.title,
      description: template.description,
      category: template.category,
      questions: template.fields.length,
      estimatedTime: template.estimatedTime,
      fields: template.fields.map((field) => ({
        label: field.label,
        type: field.type,
        required: field.required,
        options: field.options || [],
      })),
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    }));

    res.json({
      templates: formatted,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getTemplateById = async (req, res) => {
  try {
    const template = await Template.findByPk(req.params.id);
    if (!template) return res.status(404).json({ error: "Template not found" });
    res.json(template);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.createTemplate = async (req, res) => {
  try {
    const template = await Template.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(template);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

exports.cloneTemplate = async (req, res) => {
  const Form = require("../models/Form");
  try {
    const template = await Template.findByPk(req.params.id);
    if (!template) return res.status(404).json({ error: "Template not found" });

    const form = await Form.create({
      title: template.title + " (Copy)",
      description: template.description,
      fields: template.fields,
      userId: req.user.id,
    });

    res.status(201).json(form);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
