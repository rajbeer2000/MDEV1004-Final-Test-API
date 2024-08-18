"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.CreateStringArray = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../Config/db"));
function CreateStringArray(inputString) {
    if (Array.isArray(inputString)) {
        return inputString.map((value) => value.trim());
    }
    else if (typeof inputString === 'string') {
        return inputString.split(",").map((value) => value.trim());
    }
    else {
        console.log("Invalid input type");
        return [];
    }
}
exports.CreateStringArray = CreateStringArray;
function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
    };
    const jwtOptions = {
        expiresIn: 604800
    };
    return jsonwebtoken_1.default.sign(payload, db_1.default.secret, jwtOptions);
}
exports.generateToken = generateToken;
//# sourceMappingURL=index.js.map