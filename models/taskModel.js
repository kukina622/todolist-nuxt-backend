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
    is_finish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: false
  }
);

Tasks.belongsTo(userModel, { foreignKey: "uid" });

module.exports = Tasks;
