const express = require("express");
const { secretKey } = require("./config");
let sequelize = require("./models");

let registerController = require("./controllers/registerController");

module.exports = function appInit() {
  let app = new express();
  return new Promise(async (resolve) => {
    app.use(express.json());
    // connect database
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync()
    console.log("Database has been synced.");

    // controllers
    app.use("/api", registerController);

    resolve(app);
  });
};
