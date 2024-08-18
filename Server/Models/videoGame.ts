/**
 * Filename: videogame.ts
 * Student Name / Student ID:
 * Rajbeer Kaur, 200513296
 * Date: August 17, 2024
 */

import { Schema, model } from "mongoose";

// VideoGame Interface - defines the structure of a video game document

interface IVideoGame {
    title: string;
    genres: string[];
    platforms: string[];
    releaseDate: Date;
    developers: string[];
    designers: string[];
    publishers: string[];
    rating: string;
    description: string;
    imageURL: string;
    artists: string[];
    modes: string[];
}

// VideoGame Schema - defines the structure of a video game document

let videoGameSchema = new Schema<IVideoGame>({
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

let VideoGame = model<IVideoGame>('VideoGame', videoGameSchema);

export default VideoGame;
