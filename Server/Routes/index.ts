/**
 * Filename: index.ts
 * Student Name / Student ID:
 * Rajbeer Kaur, 200513296
 * Date: August 17, 2024
 */

import express from 'express';
const router = express.Router();

import { signInUser, logoutUser, signUpUser } from '../Controllers/auth';

/* List of authentication routes */

// Register User
router.post('/register', (req, res, next) => { signUpUser(req, res, next); });

// Login User
router.post('/login', (req, res, next) => { signInUser(req, res, next); });

// Logout User
router.get('/logout', (req, res, next) => { logoutUser(req, res, next); });

export default router;
