const express = require("express");
const taskModel = require("../models/taskModel");
const userModel = require("../models/userModel");
const auth = require("../middlewares/auth");

let router = express.Router();

router.use(auth);

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

router.post("/tasks", async (req, res) => {
  const username = req.session.user;
  const description = req.body.description;
  const end_date = new Date(req.body.end_date);
  const { uid } = (
    await userModel.findOne({
      where: { username: username },
      attributes: ["uid"]
    })
  ).dataValues;
  await taskModel.create({
    description: description,
    end_date: end_date,
    uid: uid
  });
  res.status(200).end();
});

router.patch("/tasks/:tid", async (req, res) => {
  const username = req.session.user;
  const tid = req.params.tid;
  const is_finish = !!req.body.is_finish;
  const { uid } = (
    await userModel.findOne({
      where: { username: username },
      attributes: ["uid"]
    })
  ).dataValues;
  try {
    await taskModel.update(
      { is_finish: is_finish },
      { where: { uid: uid, tid: tid } }
    );
    return res.status(200).end();
  } catch (error) {
    return res.status(404).json({
      message: "OPERATION_FAILED"
    });
  }
});

router.delete("/tasks/:tid", async (req, res) => {
  const username = req.session.user;
  const tid = req.params.tid;
  const { uid } = (
    await userModel.findOne({
      where: { username: username },
      attributes: ["uid"]
    })
  ).dataValues;
  try {
    await taskModel.destroy({
      where: {
        tid: tid,
        uid: uid
      }
    });
    return res.status(200).end();
  } catch (error) {
    return res.status(404).json({
      message: "OPERATION_FAILED"
    });
  }
});

module.exports = router;
