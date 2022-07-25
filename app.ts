require("dotenv/config");
require("./db");
import express from "express";
const allRoutes = require("./routes/index.routes")

const app: any = express();
require("./config")(app);

app.use("/", allRoutes);

require("./error-handling")(app);
module.exports = app;
