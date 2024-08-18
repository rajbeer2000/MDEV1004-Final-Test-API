"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
const videoGame_1 = require("../Controllers/videoGame");
router.get('/', (req, res, next) => { (0, videoGame_1.getVideoGameList)(req, res, next); });
router.get('/list', (req, res, next) => { (0, videoGame_1.getVideoGameList)(req, res, next); });
router.get('/find/:id', (req, res, next) => { (0, videoGame_1.getVideoGameById)(req, res, next); });
router.post('/add', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => { (0, videoGame_1.addVideoGame)(req, res, next); });
router.put('/update/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => { (0, videoGame_1.updateVideoGame)(req, res, next); });
router.delete('/delete/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => { (0, videoGame_1.deleteVideoGame)(req, res, next); });
exports.default = router;
//# sourceMappingURL=videoGame.js.map