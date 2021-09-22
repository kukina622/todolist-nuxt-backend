const { database } = require("../config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  database.name,
  database.username,
  database.password,
  {
    host: database.host,
    dialect: "mysql"
  }
);

module.exports = sequelize;
