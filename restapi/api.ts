import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import { locationRouter } from './location/LocationRouter';
import { userRouter } from './user/UserRouter';

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://uo270285:Password@lomapes1a.wjvvv7r.mongodb.net/?retryWrites=true&w=majority');
module.exports = mongoose;

const api:Router = express.Router()

api.use("/locations", locationRouter);
api.use("/users", userRouter)

export default api;