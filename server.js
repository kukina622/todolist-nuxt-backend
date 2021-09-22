const appInit = require("./app");
const { port } = require("./config");

appInit().then((app) => {
  app.listen(port, () => {
    console.log(`Start listening ${port} port`);
  });
});
