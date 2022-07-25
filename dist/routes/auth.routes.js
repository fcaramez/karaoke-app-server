"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const saltRounds = 10;
const User = require("../models/User.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { isAuthenticated } = require("../middleware/jwt.middleware");
router.get("/verify", isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload);
});
router.post("/signup", (req, res, next) => {
    const { username, type, password } = req.body;
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
    User.findOne({ username }).then((found) => {
        if (found) {
            return res.status(400).json({ errorMessage: "Username already taken!" });
        }
        return bcrypt_1.default
            .genSalt(saltRounds)
            .then((salt) => bcrypt_1.default.hash(password, salt))
            .then((hashedPassword) => {
            return User.create({
                username,
                type,
                password: hashedPassword,
            });
        })
            .then((user) => {
            req.session.user = user;
            res.status(201).json(user);
        })
            .catch((error) => {
            if (error instanceof mongoose_1.default.Error.ValidationError) {
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
});
router.post("/login", (req, res, next) => {
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
        bcrypt_1.default.compare(password, user.password).then((isSamePassword) => {
            if (!isSamePassword) {
                return res.status(400).json({ errorMessage: "Wrong password!" });
            }
            const { _id, username, type } = user;
            const payload = { _id, username, type };
            const authToken = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: "24h",
            });
            return res.status(200).json({ authToken });
        });
    })
        .catch((err) => {
        next(err);
    });
});
module.exports = router;
