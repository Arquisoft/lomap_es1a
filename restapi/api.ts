import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import LocationController from './location';
import LocationModel from './location';

const api:Router = express.Router()

interface User {
    name: string;
    email: string;
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
    let email = req.body.email;
    let user: User = {name:name,email:email}
    users.push(user);
    return res.sendStatus(200);
  }
);

api.post(
  "/location/add",
  async (req: Request, res: Response): Promise<Response> => {
    let id = req.body.id;
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;
    let category = req.body.category;

    locations.push(new LocationModel (id, longitude, latitude, category));
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