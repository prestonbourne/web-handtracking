const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes.js");
const dotenv = require('dotenv');

(function main() {
  dotenv.config();
  const app = createExpressApp();


})();

function createExpressApp() {
  const port = process.env.PORT || 3001;
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static("public"));
  app.use(express.json());
  app.use(cors());
  app.use("/", routes);

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
  return app;
}
