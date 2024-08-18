"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.signInUser = exports.signUpUser = void 0;
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../Models/user"));
const Util_1 = require("../Util");
function signUpUser(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.firstName + " " + req.body.lastName
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            console.error("All fields are required");
            return res.status(400).json({ success: false, msg: "ERROR: User not registered. All the Fields are Required", data: null, token: null });
        }
        if (err) {
            console.error("ERROR: Inserting New User");
            if (err.name == "UserExistsError") {
                console.error("ERROR: User already exists");
            }
            return res.status(400).json({ success: false, msg: "ERROR: User Not Registered", data: null, token: null });
        }
        return res.json({ success: true, msg: "User Registered Successfully", data: newUser, token: null });
    });
}
exports.signUpUser = signUpUser;
function signInUser(req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ success: false, msg: "ERROR: Server Error", data: null, token: null });
        }
        if (!user) {
            console.error("Login Error: User Credentials error or User Not Found");
            return res.status(400).json({ success: false, msg: "ERROR: Login Error", data: null, token: null });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ success: false, msg: "ERROR: Database Error", data: null, token: null });
            }
            const authToken = (0, Util_1.generateToken)(user);
            return res.json({ success: true, msg: "User Logged in Successfully", data: user, token: authToken });
        });
        return;
    })(req, res, next);
}
exports.signInUser = signInUser;
function logoutUser(req, res, next) {
    req.logOut(() => {
        console.log("User Logged out Successfully");
        return res.status(200).json({ success: false, msg: "User Logged out Successfully", data: null, token: null });
    });
}
exports.logoutUser = logoutUser;
//# sourceMappingURL=auth.js.map