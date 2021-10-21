const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { secretKey } = require("./config");
let morgan = require("morgan");
let sequelize = require("./models");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

let registerController = require("./controllers/registerController");
let loginController = require("./controllers/loginController");
let taskController = require("./controllers/taskController");

module.exports = function appInit() {
  let app = new express();
  return new Promise(async (resolve) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("tiny"));
    
    // connect database
    await sequelize.authenticate();
    console.log("[Database] Connection has been established successfully.");
    await sequelize.sync();
    console.log("[Database] Database has been synced.");

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

    //swagger API
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    resolve(app);
  });
};
