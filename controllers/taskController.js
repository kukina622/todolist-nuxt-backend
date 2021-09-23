const express = require("express");
const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");
const auth = require("../middlewares/auth");

let router = express.Router();

router.get("/tasks", async (req, res) => {
  const username = req.session.user;
  let rawTasks = await taskModel.findAll({
    attributes: ["tid", "description", "end_date", "is_finish"],
    include: [
      {
        model: userModel,
        where: { username: username },
        attributes: []
      }
    ]
  });
  let tasks = rawTasks.map((task) => task.dataValues);
  res.status(200).json(tasks);
});

module.exports = router;
