// models/Template.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Template = sequelize.define(
  "Template",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estimatedTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fields: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Template;
