const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.put(
    "/api/test/offer-cultivars",
    [authJwt.verifyToken],
    controller.updateOffers
  );

  app.get(
    "/api/test/offer-cultivars",
    [authJwt.verifyToken],
    controller.getOffers
  );

  app.get(
    "/api/test/want-cultivars",
    [authJwt.verifyToken],
    controller.getWants
  );

  app.put(
    "/api/test/want-cultivars",
    [authJwt.verifyToken],
    controller.updateWants
  );
};
