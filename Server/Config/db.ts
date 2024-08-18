/**
 * Filename: db.ts
 * Student Name / Student ID:
 * Rajbeer Kaur, 200513296
 * Date: August 17, 2024
 */

let remoteURI = (process.env.MONGO_URI) as string;
let secret = (process.env.APP_SECRET) as string;

export default {
    remoteURI: remoteURI,
    secret: secret
}