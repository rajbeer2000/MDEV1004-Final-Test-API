/**
 * Filename: index.ts
 * Student Name / Student ID:
 * Rajbeer Kaur, 200513296
 * Date: August 17, 2024
 */

import jwt from 'jsonwebtoken';
import db from '../Config/db';

/**
 * Sanitize an array of strings
 *
 * @export
 * @param {string} inputString
 * @return {*}  {string[]}
 */
export function CreateStringArray(inputString: string | string[]): string[] {
    if(Array.isArray(inputString)) {
        return inputString.map((value) => value.trim());
    } else if(typeof inputString === 'string') {
        return inputString.split(",").map((value) => value.trim());
    } else {
        console.log("Invalid input type");
        return [];
    }
}

/**
 * Generate a token for the user
 *
 * @export
 * @param {UserDocument} user
 * @return {*}  {string}
 */
export function generateToken(user: UserDocument): string
{
    const payload =
    {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
    }

    const jwtOptions =
    {
        expiresIn: 604800 // 1 week
        // Note: this may be a security risk, as the token will be valid for a week
    }

    return jwt.sign(payload, db.secret, jwtOptions);
}