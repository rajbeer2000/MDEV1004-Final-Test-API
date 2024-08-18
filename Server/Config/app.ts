/**
 * Filename: app.ts
 * Student Name / Student ID:
 * Rajbeer Kaur, 200513296
 * Date: August 17, 2024
 */

import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

// modules for authentication
import session from 'express-session';
import passport from 'passport';

// prevent memory leaks with memorystore
import createMemoryStore from 'memorystore';
const MemoryStore = createMemoryStore(session);

// modules for JWT support
import cors from 'cors';
import passportJWT from 'passport-jwt';

// define JWT Aliases
let JWTStrategy = passportJWT.Strategy; // alias
let ExtractJwt = passportJWT.ExtractJwt; // alias

// define authgentication strategy
// let strategy = passportLocal.Strategy; // Created alias

// import the User Model
import User from '../Models/user'

// importing mongoose and db
import mongoose from 'mongoose';
import db from './db';

mongoose.connect(db.remoteURI);

// DB Connection Events
mongoose.connection.on('connected', () => {
  console.log(`MDEV1004 Final Test API: Connected to MongoDB Atlas`);
})

import indexRouter from '../Routes/index';
import videoGameRouter from '../Routes/videoGame';

// create an express application
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// add cors to the config
app.use(cors());

// setup express session
app.use(session({
  cookie: { maxAge: 86400000 }, // 1 day in milliseconds
  store: new MemoryStore({checkPeriod: 86400000}), // 1 day in milliseconds
  secret: db.secret,
  saveUninitialized: false,
  resave: false
}));

// initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// implement an authentication strategy
passport.use(User.createStrategy());

// serialize and deserialize the user info
passport.serializeUser(User.serializeUser() as any);
passport.deserializeUser(User.deserializeUser())

// setup JWT options
let jwtOptions = 
{
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: db.secret, 
};

// setup JWT strategy
let strategy = new JWTStrategy(jwtOptions, (jwt_payload: any, done: any) => 
{
  try 
  {
    const user = User.findById(jwt_payload.id);
    if(user) 
    {
      return done(null, user);
    } 
    return done(null, false);
  } catch (error) 
  {
    return done(error, null);
  }
});

// deploy the strategy
passport.use(strategy);

app.use('/api', indexRouter);
/* example: Secure the entire video game routes with JWT authentication */
// app.use('/api/videoGame', passport.authenticate('jwt', {session: false}), videoGameRouter);
app.use('/api/videoGame', videoGameRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end('Error: Please ensure that you prefix your API requests with /api');
});

export default app;
