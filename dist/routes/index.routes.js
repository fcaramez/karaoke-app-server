"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const authRoutes = require("./auth.routes");
const requestRoutes = require("./request.routes");
router.get("/", (req, res, next) => {
    res.json("All is good in here");
});
router.use("/auth", authRoutes);
router.use("/api", requestRoutes);
module.exports = router;
