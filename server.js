const appInit = require("./app");
const { port } = require("./config");

appInit().then((app) => {
  app.listen(port, () => {
    console.log(`[Backend] Start listening ${port} port`);
  });
});
