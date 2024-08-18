/**
 * Filename: videoGame.ts
 * Student Name / Student ID:
 * Rajbeer Kaur, 200513296
 * Date: August 17, 2024
 */

import { Request, Response, NextFunction } from "express";

import VideoGame from "../Models/videoGame";
import { CreateStringArray } from "../Util";

/**
 * This function fetch the video game list in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function getVideoGameList(req: Request, res: Response, next: NextFunction): void
{
    VideoGame.find({})
    .then((data) =>
    {
        res.status(200).json({success: true, msg: "Video game List Retrieved successfully", data: data, token: null})
    })
    .catch((err) =>
    {
        console.error("getVideoGameList Error: ", err);
    })
}

/**
 * This function fetch the single video game
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function getVideoGameById(req: Request, res: Response, next: NextFunction): void {
    // endpoint should be '/api:id'
    let id = req.params.id;

    // ensure that the id is valid
    if(id.length != 24) {
        res.status(400).json({success: false, msg: "A valid id is required to fetch a video game", data: null, token: null})
    } else {
        VideoGame.findById({_id: id})
        .then((data) => 
        {
            if(data) {
                res.status(200).json({success: true, msg: "A video game Retrived by id", data: data, token: null})
            } else {
                res.status(400).json({success: false, msg: "Video game not found", data: null, token: null})
            }
        })
        .catch((err) => {
            console.log("getVideoGameById Error", err);
        })
    }
}

/**
 * This function adds a video game to the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function addVideoGame(req: Request, res: Response, next: NextFunction): void {
    let genres = (req.body.genres) ? CreateStringArray(req.body.genres as string) : CreateStringArray("");
    let directors = (req.body.directors) ? CreateStringArray(req.body.directors as string) : CreateStringArray("");
    let writers = (req.body.writers) ? CreateStringArray(req.body.writers as string) : CreateStringArray("");
    let actors = (req.body.actors) ? CreateStringArray(req.body.actors as string) : CreateStringArray("");

    let videoGameToAdd = new VideoGame({
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
    

    VideoGame.create(videoGameToAdd)
    .then(() => {
        res.status(200).json({success: true, msg: "A new video game added successfully", data: videoGameToAdd, token: null});
    })
    .catch((err) => {
        console.log("addVideoGame Error:", err)
    })
}

/**
 * THis function updates a video game in the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function updateVideoGame(req: Request, res: Response, next: NextFunction): void {
    // endpoint should be '/api/update/:id'
    let id = req.params.id;

    // ensure that the id is valid
    if(id.length != 24) {
        res.status(400).json({success: false, msg: "A valid id is required to update a video game", data: null, token: null})
    } else {
        let videoGameToUpdate = new VideoGame({
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
        
    
        VideoGame.updateOne({_id: id}, videoGameToUpdate)
        .then(() => {
            res.status(200).json({success: true, msg: "A new video game updated successfully", data: videoGameToUpdate, token: null});
        })
        .catch((err) => {
            console.log("updateVideoGame Error:", err)
        })
    }
}

/**
 * This function deletes a video game from a database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function deleteVideoGame(req: Request, res: Response, next: NextFunction): void {
// endpoint should be '/api/delete/:id'
let id = req.params.id;

// ensure that the id is valid
if(id.length != 24) {
    res.status(400).json({success: false, msg: "A valid id is required to delete a video game", data: null, token: null})
} else {
    VideoGame.deleteOne({_id: id})
    .then(() => {
        res.status(200).json({success: true, msg: "Video game deleted successfully", data: id, token: null});
    })
    .catch((err) => {
        console.log("deleteVideoGame Error:", err)
    })
}
}

