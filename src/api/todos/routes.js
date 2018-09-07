const router = require("koa-router")();
const controller = require("./controller");

router.get("/", async ctx => {
  ctx.status = 200;
  ctx.body = { data: await controller.getAll() };
});

router.get("/:id", async (ctx, next) => {
  const data = await controller.get(ctx.params.id);
  console.log("data get params", data);
  console.log("---------------");
  ctx.status = 200;
  ctx.body = { data };
});

router.post("/", async (ctx, next) => {
  const data = await controller.create(ctx.request.body);
  if (data._message) {
    ctx.status = 400;
    ctx.body = { status: false, error: data._message };
  } else {
    ctx.status = 200;
    ctx.body = { data };
  }
});

router.put("/:id", async (ctx, next) => {
  const data = await controller.update({
    id: ctx.params.id,
    ...ctx.request.body
  });

  if (data) {
    ctx.status = 400;
    ctx.body = { error: data.error || data._message };
  }
  ctx.body = { data };
});

router.del("/:id", async (ctx, next) => {
  const data = await controller.delete(ctx.params.id);
  ctx.body = { data };
});

module.exports = router.routes();
