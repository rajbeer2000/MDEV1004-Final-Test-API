"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let videoGameSchema = new mongoose_1.Schema({
    title: String,
    genres: [String],
    platforms: [String],
    releaseDate: Date,
    developers: [String],
    designers: [String],
    publishers: [String],
    rating: String,
    description: String,
    imageURL: String,
    artists: [String],
    modes: [String]
});
let VideoGame = (0, mongoose_1.model)('VideoGame', videoGameSchema);
exports.default = VideoGame;
//# sourceMappingURL=videoGame.js.map