"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideoGame = exports.updateVideoGame = exports.addVideoGame = exports.getVideoGameById = exports.getVideoGameList = void 0;
const videoGame_1 = __importDefault(require("../Models/videoGame"));
const Util_1 = require("../Util");
function getVideoGameList(req, res, next) {
    videoGame_1.default.find({})
        .then((data) => {
        res.status(200).json({ success: true, msg: "Video game List Retrieved successfully", data: data, token: null });
    })
        .catch((err) => {
        console.error("getVideoGameList Error: ", err);
    });
}
exports.getVideoGameList = getVideoGameList;
function getVideoGameById(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({ success: false, msg: "A valid id is required to fetch a video game", data: null, token: null });
    }
    else {
        videoGame_1.default.findById({ _id: id })
            .then((data) => {
            if (data) {
                res.status(200).json({ success: true, msg: "A video game Retrived by id", data: data, token: null });
            }
            else {
                res.status(400).json({ success: false, msg: "Video game not found", data: null, token: null });
            }
        })
            .catch((err) => {
            console.log("getVideoGameById Error", err);
        });
    }
}
exports.getVideoGameById = getVideoGameById;
function addVideoGame(req, res, next) {
    let genres = (req.body.genres) ? (0, Util_1.CreateStringArray)(req.body.genres) : (0, Util_1.CreateStringArray)("");
    let directors = (req.body.directors) ? (0, Util_1.CreateStringArray)(req.body.directors) : (0, Util_1.CreateStringArray)("");
    let writers = (req.body.writers) ? (0, Util_1.CreateStringArray)(req.body.writers) : (0, Util_1.CreateStringArray)("");
    let actors = (req.body.actors) ? (0, Util_1.CreateStringArray)(req.body.actors) : (0, Util_1.CreateStringArray)("");
    let videoGameToAdd = new videoGame_1.default({
        title: req.body.title,
        genres: req.body.genres,
        platforms: req.body.platforms,
        releaseDate: req.body.releaseDate,
        developers: req.body.developers,
        designers: req.body.designers,
        publishers: req.body.publishers,
        rating: req.body.rating,
        description: req.body.description,
        imageURL: req.body.imageURL,
        artists: req.body.artists,
        modes: req.body.modes
    });
    videoGame_1.default.create(videoGameToAdd)
        .then(() => {
        res.status(200).json({ success: true, msg: "A new video game added successfully", data: videoGameToAdd, token: null });
    })
        .catch((err) => {
        console.log("addVideoGame Error:", err);
    });
}
exports.addVideoGame = addVideoGame;
function updateVideoGame(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({ success: false, msg: "A valid id is required to update a video game", data: null, token: null });
    }
    else {
        let videoGameToUpdate = new videoGame_1.default({
            _id: id,
            title: req.body.title,
            genres: req.body.genres,
            platforms: req.body.platforms,
            releaseDate: req.body.releaseDate,
            developers: req.body.developers,
            designers: req.body.designers,
            publishers: req.body.publishers,
            rating: req.body.rating,
            description: req.body.description,
            imageURL: req.body.imageURL,
            artists: req.body.artists,
            modes: req.body.modes
        });
        videoGame_1.default.updateOne({ _id: id }, videoGameToUpdate)
            .then(() => {
            res.status(200).json({ success: true, msg: "A new video game updated successfully", data: videoGameToUpdate, token: null });
        })
            .catch((err) => {
            console.log("updateVideoGame Error:", err);
        });
    }
}
exports.updateVideoGame = updateVideoGame;
function deleteVideoGame(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({ success: false, msg: "A valid id is required to delete a video game", data: null, token: null });
    }
    else {
        videoGame_1.default.deleteOne({ _id: id })
            .then(() => {
            res.status(200).json({ success: true, msg: "Video game deleted successfully", data: id, token: null });
        })
            .catch((err) => {
            console.log("deleteVideoGame Error:", err);
        });
    }
}
exports.deleteVideoGame = deleteVideoGame;
//# sourceMappingURL=videoGame.js.map