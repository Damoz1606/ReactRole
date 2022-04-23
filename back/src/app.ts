import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import session from "express-session";
import MongoStore from 'connect-mongo';
import config from './config/config';

import userRoutes from './app/routes/user.routes';

import './config/passport';
import { MONGO_URI } from './config/database.config';

const app = express();

//settings
app.set("port", config.PORT);

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

//routes
app.use("/api/v1/", userRoutes);

export default app;