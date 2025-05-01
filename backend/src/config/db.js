const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

let db_name =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_NAME
    : process.env.DB_NAME;
let db_user =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_USER
    : process.env.DB_USER;
let db_password =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_PASSWORD
    : process.env.DB_PASSWORD;
let db_host =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_HOST
    : process.env.DB_HOST;
let db_port =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DB_PORT
    : process.env.DB_PORT;

const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  port: db_port,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
  }
};

module.exports = { sequelize, connectDB };
