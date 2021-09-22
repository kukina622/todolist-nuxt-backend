const express = require("express");
const config = require("./config");
let app = new express();

app.listen(config.port , ()=>{
  console.log(`Start listening in ${config.port} port`)
})