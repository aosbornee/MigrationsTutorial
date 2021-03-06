const express = require("express");
const http = require("http");
const cors = require("cors");
require("express-async-errors");
const { errorHandler } = require("./api/middlewares/errorHandler");
// const { redisSession } = require("./api/middlewares/session");
const db = require("./models");
const { userRoutes } = require("./api/routes/user");
const { batchRoutes } = require("./api/routes/batch");

const app = express();
app.use(cors());
app.use(express.json());

// configure session middleware
// app.use(redisSession);

const server = http.createServer(app);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/batch", batchRoutes);

app.delete("/api/user/:id", async (req, res) => {
  const id = req.params.id;

  const user = await db.User.destroy({
    where: {
      id,
    },
  });
  console.log(user);

  res.send("user deleted");
});

app.use(errorHandler);

module.exports = {
  server,
};
