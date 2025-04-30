const { sequelize } = require('../src/config/db');
const Template = require('../src/models/Template');
const dotenv = require('dotenv');
const templates = require('../templates.json');

dotenv.config();

const seed = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await Template.bulkCreate(templates);    
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
