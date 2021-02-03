const express = require("express");
const redis = require("redis");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 4192;

const app = express();
const indexRouter = require('./routes/index.routes');
const db = require('./db');

// REDIS
const client = redis.createClient({
  host: "redis",
  port: "6379",
});

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("error", (err) => {
  console.log("Redis client error ocurred", err);
});
// REDIS END

db.sequelize.authenticate()
.then(() => {
  console.log("Database connected");
  return db.sequelize.sync();
})
.then(() => {
  console.log("Database synced");
})
.catch((e) => {
  console.error("Error ocurred while connecting to postgres", e);
  process.exit(1);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use('/api/v1', indexRouter);

app.use((_, res) => {
  return res
    .status(404)
    .send({ message: "Endpoint Not found", success: false });
});

app.listen(PORT, () => console.log(`Listening on ::${PORT}`));
