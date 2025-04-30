const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Form = require('./Form');

const Response = sequelize.define('Response', {
  formId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Form,
      key: 'id'
    }
  },
  answers: {
    type: DataTypes.JSON,
    allowNull: false
  },
  submittedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true
});

// Define associations
Response.belongsTo(Form, { foreignKey: 'formId', as: 'form' });
Form.hasMany(Response, { foreignKey: 'formId', as: 'responses' });

module.exports = Response;
