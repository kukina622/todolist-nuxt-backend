const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./index");
const userModel = require("./userModel");

const Tasks = sequelize.define(
  "Tasks",
  {
    tid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING
    },
    end_date: {
      type: DataTypes.DATEONLY
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: userModel,
        key: "uid"
      }
    }
  },
  {
    timestamps: false
  }
);

module.exports = Tasks;
