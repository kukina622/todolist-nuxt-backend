const express = require("express");
const session = require("express-session");
const { secretKey } = require("./config");
let sequelize = require("./models");

let registerController = require("./controllers/registerController");
let loginController = require("./controllers/loginController");
let taskController = require("./controllers/taskController");

module.exports = function appInit() {
  let app = new express();
  return new Promise(async (resolve) => {
    app.use(express.json());
    // connect database
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("Database has been synced.");

    app.use(
      session({
        secret: secretKey,
        name: "user",
        saveUninitialized: false,
        resave: true
      })
    );

    // controllers
    app.use("/api", registerController);
    app.use("/api", loginController);

    app.use("/api", taskController);
    
    resolve(app);
  });
};
