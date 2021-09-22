const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

let router = express.Router();

router.post("/register", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let isExisted = await userModel.count({
    where: { username: username }
  });
  if (isExisted) {
    return res.status(409).json({
      message: "USERNAME_EXISTED"
    });
  }
  let password_hash = await bcrypt.hash(password, 10);
  await userModel.create({ username: username, password: password_hash });
  return res.status(200).end();
});

module.exports = router;
