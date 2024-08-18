/**
 * Filename: user.ts
 * Student Name / Student ID:
 * Rajbeer Kaur, 200513296
 * Date: August 17, 2024
 */

import mongoose, { PassportLocalDocument, Schema } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

interface IUser extends PassportLocalDocument
{
    username: string,
    email: string,
    displayName: string,
    created: Date,
    updated: Date
}

const userSchema = new Schema<IUser>
({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
},
{
    collection: 'users'
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model<IUser & PassportLocalDocument>('User', userSchema);

declare global 
{
    export type UserDocument = mongoose.Document &
    {
        _id: String,
        username: String,
        email: String,
        displayName: String,
    }
}

export default User;