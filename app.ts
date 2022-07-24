
require("dotenv/config");
require("./db");
import express from "express";
import allRoutes from "./routes/index.routes";

const app: any = express();
require("./config")(app);

app.use("/", allRoutes);

require("./error-handling")(app);
export default app;
