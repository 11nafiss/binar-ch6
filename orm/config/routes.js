const express = require("express");
const swagger = require("swagger-ui-express");
const controllers = require("../app/controllers");
const swgDoc = require("../docs/openapi.json");

const appRouter = express.Router();
const apiRouter = express.Router();

appRouter.use("/api-docs", swagger.serve, swagger.setup(swgDoc));
appRouter.get("/", controllers.main.index);

/**
 * TODO: Implement your own API
 *       implementations
 */
apiRouter.get("/api/v1/cars", controllers.api.v1.auth.authorize, controllers.api.v1.car.list);
apiRouter.post("/api/v1/cars", controllers.api.v1.auth.authorize, controllers.api.v1.car.create);
apiRouter.put(
    "/api/v1/car/update/:id",
    controllers.api.v1.auth.authorize,
    controllers.api.v1.car.update
);
apiRouter.delete(
  "/api/v1/car/delete/:id",
  controllers.api.v1.auth.authorize,
  controllers.api.v1.car.destroy
);
apiRouter.put(
  "/api/v1/car/restore/:id",
  controllers.api.v1.auth.authorize,
  controllers.api.v1.car.restore
);

//authentication
apiRouter.get("/api/v1/whoAmI", controllers.api.v1.auth.authorize, controllers.api.v1.auth.whoAmI);
apiRouter.post(
  "/api/v1/login",
  controllers.api.v1.auth.login
);
apiRouter.post(
  "/api/v1/register",
  controllers.api.v1.auth.register
);
apiRouter.post(
  "/api/v1/registerAdmin",
  controllers.api.v1.auth.authorize,
  controllers.api.v1.auth.registerAdmin
);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

appRouter.get("/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

appRouter.use(apiRouter);
appRouter.use(controllers.api.main.onLost);
appRouter.use(controllers.api.main.onError);

module.exports = appRouter;
