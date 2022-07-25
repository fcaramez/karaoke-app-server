const router = require("express").Router();
import { Request, Response, NextFunction } from "express";
const authRoutes: NodeModule = require("./auth.routes");
const requestRoutes: NodeModule = require("./request.routes");

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json("All is good in here");
});

router.use("/auth", authRoutes);
router.use("/api", requestRoutes);

module.exports = router;
