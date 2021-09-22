const express = require("express");

let router = express.Router();

router.post("/login",(req,res,next)=>{
  let username = req.body.username
  let password = req.body.password
})