const router = require("koa-router")();
const todos = require("../api/todos/routes");

router.use("/todos", todos);

module.exports = router;
