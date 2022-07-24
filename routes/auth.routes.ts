const router = require("express").Router();
import bcrypt from "bcrypt";
import mongoose from "mongoose";
const saltRounds: number = 10;
import User from "../models/User.model";
import jwt from "jsonwebtoken";
import isAuthenticated from "../middleware/jwt.middleware";
import { Request, Response, NextFunction } from "express";

router.get(
  "/verify",
  isAuthenticated,
  (req: any, res: Response, next: NextFunction) => {
    res.status(200).json(req.payload);
  }
);

router.post("/signup", (req: any, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your username!" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  User.findOne({ username }).then((found: mongoose.Document) => {
    if (found) {
      return res.status(400).json({ errorMessage: "Username already taken!" });
    }
  });

  return bcrypt
    .genSalt(saltRounds)
    .then((salt: any) => {
      bcrypt.hash(password, salt);
    })
    .then((hashedPassword: string) => {
      return User.create({
        username,
        password: hashedPassword,
      });
    })
    .then((user: mongoose.Document) => {
      req.session.user = user;
      res.status(201).json(user);
    })
    .catch((error: any) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errorMessage: error.message });
      }
      if (error.code === 11000) {
        return res.status(400).json({
          errorMessage: "Username already taken",
        });
      }
      return res.status(500).json({ errorMessage: error.message });
    });
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your Username" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Password needs to be at least 8 characters long",
    });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.status(400).json({ errorMessage: "Wrong Credentials" });
      }

      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: "Wrong password!" });
        }

        const { _id, username } = user;

        const payload = { _id, username };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "24h",
        });

        return res.status(200).json({ authToken });
      });
    })
    .catch((err: Error) => {
      next(err);
    });
});

export default router;