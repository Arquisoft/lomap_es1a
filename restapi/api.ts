import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import { LocationModel } from './location/LocationModel';
import { LocationController } from './location/LocationController';

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
  "/location/add",
  async (req: Request, res: Response): Promise<Response> => {
    const{name, category, comments} = req.body;

    LocationController.createLocation(name, category, comments)
    return res.sendStatus(200);
  }
);
api.get(
  "location/list",
  async (req:Request, res:Response): Promise<Response> => {
    return res.status(200).send(users);
  }
)

export default api;