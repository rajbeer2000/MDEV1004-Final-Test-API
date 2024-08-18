/**
 * Filename: videoGame.ts
 * Student Name / Student ID:
 * Rajbeer Kaur, 200513296
 * Date: August 10, 2024
 */

import express from 'express';
const router = express.Router();
import passport from 'passport';

import { getVideoGameList, getVideoGameById, addVideoGame, updateVideoGame, deleteVideoGame } from '../Controllers/videoGame';
 

/* List of Video Game Routes/endpoints */

// Handles GET request to fetch a video game list - fallback in case /list is not used   
router.get('/', (req, res, next) => { getVideoGameList(req, res, next); });

// Handles GET request to fetch a video game list
router.get('/list', (req, res, next) => { getVideoGameList(req, res, next); });

// Handles GET request to fetch a video game by id
router.get('/find/:id', (req, res, next) => { getVideoGameById(req, res, next); });

// Handle POST request to add a video game
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => { addVideoGame(req, res, next); });

// Handle PUT request to add a video game
router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => { updateVideoGame(req, res, next); }); 

// Handles DELETE request to delete a video game
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => { deleteVideoGame(req, res, next); });

export default router;
