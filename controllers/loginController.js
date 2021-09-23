const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

let router = express.Router();

router.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let isExisted = await userModel.count({
    where: { username: username }
  });

  if (isExisted) {
    let userDoc = await userModel.findOne({
      where: { username: username }
    });
    let result = await bcrypt.compare(password, userDoc.password);

    if (result) {
      req.session.user = username;
      return res.status(200).end();
    }
  }

  return res.status(401).json({
    message: "LOGIN_FAILED"
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).end();
});

router.get("/isLogin", (req, res) => {
  let isLogin = false;
  if (req.session.user) {
    isLogin = true;
  }
  res.status(200).json({
    isLogin: isLogin
  });
});

module.exports = router;
