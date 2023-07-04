const jsonServer = require("json-server");
const jsonServerAuth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 2222;

server.db = router.db;

const authOptions = {
  auth: jsonServerAuth,
  authConfig: {
    users: "users.json",
  },
  noCors: false,
  static: "./public",
};

server.use(middlewares);
server.use(authOptions.auth);
server.use(router);

server.listen(port, () => {
  console.log("JSON Server with json-server-auth is running on port " + port);
});
