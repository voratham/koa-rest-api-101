const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-morgan");
const database = require("../database");
const router = require("../routing");

const app = new Koa();
app.use(logger("combined"));
app.use(bodyparser());
app.use(router.routes());

exports.start = async config => {
  try {
    await database.connect(config);
    console.log("Connection to database");
    await app.listen(config.PORT);
    console.log("Connection on port: " + config.PORT);
    console.log("---------------");
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    console.log("---------------");
  }
};
