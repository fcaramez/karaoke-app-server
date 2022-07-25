"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const Request = require("../models/Request.model");
router.post("/request", (req, res, next) => {
    const { song, singers } = req.body;
    if (!song || !singers) {
        return res.status(400).json({ errorMessage: "Please submit both fields!" });
    }
    Request.create({ song, singers })
        .then((request) => {
        return res.status(200).json(request);
    })
        .catch((error) => {
        return res.status(400).json({ errorMessage: error.message });
    });
});
router.delete("/request/:id", (req, res, next) => {
    const { id } = req.params;
    Request.findByIdAndRemove(id)
        .then((deletedObject) => {
        res.status(200).json(deletedObject);
    })
        .catch((error) => {
        res.status(400).json({ errorMessage: "Error deleteing request" });
    });
});
module.exports = router;
