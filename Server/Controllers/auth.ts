/**
 * Filename: auth.ts
 * Student Name / Student ID:
 * Rajbeer Kaur, 200513296
 * Date: August 17, 2024
 */

import { Request, Response, NextFunction } from "express";
import passport from "passport";
import mongoose from "mongoose";

import User from "../Models/user";
import { generateToken } from "../Util";

/**
 * Register a new user
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function signUpUser(req: Request, res: Response, next: NextFunction): void
{
    // instantiating a new user object
    let newUser = new User
    ({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.firstName + " " + req.body.lastName
    })

    User.register(newUser, req.body.password, (err) => 
    {
        if(err instanceof mongoose.Error.ValidationError) {
            console.error("All fields are required");
            return res.status(400).json({success: false, msg: "ERROR: User not registered. All the Fields are Required", data: null, token: null});
        }

        if(err) {
            console.error("ERROR: Inserting New User");
            if(err.name == "UserExistsError") {
                console.error("ERROR: User already exists");
            }
            return res.status(400).json({success: false, msg: "ERROR: User Not Registered", data: null, token: null});
        }

        return res.json({success: true, msg: "User Registered Successfully", data: newUser, token: null});
    })
}

/**
 * Processes the Login Request
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function signInUser(req: Request, res: Response, next: NextFunction) : void
{
    passport.authenticate('local', (err: any, user: any, info: any) => 
    {
        // are there any server errors?
        if(err) 
        {
            console.error(err);
            return res.status(400).json({success: false, msg: "ERROR: Server Error", data: null, token: null});
        }

        // are there any login errors?
        if(!user) 
        {
            console.error("Login Error: User Credentials error or User Not Found");
            return res.status(400).json({success: false, msg: "ERROR: Login Error", data: null, token: null});
        }

        req.logIn(user, (err) => 
        {
            // are there any database errors?
            if(err)
            {
                console.error(err);
                return res.status(400).json({success: false, msg: "ERROR: Database Error", data: null, token: null});
            }

            const authToken = generateToken(user);

            return res.json({success: true, msg: "User Logged in Successfully", data: user, token: authToken});
        });
        return;
    })(req, res, next);
}

/**
 * Processes the Logout Request
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function logoutUser(req: Request, res: Response, next: NextFunction) : void
{
    req.logOut(()=> {
        console.log("User Logged out Successfully")
        return res.status(200).json({success: false, msg: "User Logged out Successfully", data: null, token: null});
    })
}