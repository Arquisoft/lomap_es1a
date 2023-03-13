import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import { createLocation } from './location/LocationController';
import { LocationModel } from './location/LocationModel';

const api:Router = express.Router()

interface User {
    name: string;
    password: string;
}


//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];
let locations: Array<LocationModel> = [];

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);

api.post(
  "/users/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name;
    let password = req.body.email;
    let user: User = {name:name,password:password}
    users.push(user);
    return res.sendStatus(200);
  }
);

api.post(
  "/location/add",createLocation
)

export default api;