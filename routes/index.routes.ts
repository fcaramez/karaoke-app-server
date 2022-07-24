const router = require("express").Router();
import { Request, Response, NextFunction } from "express";
const authRoutes = require("./auth.routes");

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json("All is good in here");
});

router.use("/auth", authRoutes);

module.exports = router;
