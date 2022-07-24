import mongoose from "mongoose";
const router: any = require("express").Router();
const Request: any = require("../models/Request.model");

router.post("/request", (req: any, res: any, next: any) => {
  const { song, singers } = req.body;

  if (!song || !singers) {
    res.status(400).json({ errorMessage: "Please submit both fields!" });
  }
  Request.create({ song, singers })
    .then((request: any) => {
      res.status(200).json(request);
    })
    .catch((error: any) => {
      res.status(400).json({ errorMessage: error.message });
    });
});

router.delete("/request/:id", (req: any, res: any, next: any) => {
  const { id } = req.params;
  Request.findByIdAndRemove(id)
    .then((deletedObject: any) => {
      res.status(200).json(deletedObject);
    })
    .catch((error: Error) => {
      res.status(400).json({ errorMessage: "Error deleteing request" });
    });
});

module.exports = router;
