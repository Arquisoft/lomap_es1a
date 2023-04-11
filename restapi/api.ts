import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import { locationRouter } from './location/LocationRouter';
import { userRouter } from './user/UserRouter';

const api = express();




export default api;
