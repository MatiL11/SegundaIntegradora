const routerSession = require("../routes/session.router");
const productsRouteDB = require("../routes/productsDB.router");
const cartsRouteDB = require("../routes/cartsDB.router");
const chatsRouter = require("../routes/chats.router");
const routerViews = require("../routes/views.router");

const router = (app) => {
  app.use(routerViews);
  app.use("/api/session", routerSession);
  // //rutas mongo
  app.use("/api/productsDB/", productsRouteDB);
  app.use("/api/cartsDB/", cartsRouteDB);
  app.use("/api/chats/", chatsRouter);
};

module.exports = router;
