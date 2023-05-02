import { Router, Request, Response } from "express";
import {
  createLocation,
  getAllLocations,
  getLocationById,
  getMonuments,
  getOther,
  getRestaurants,
  getShops
} from "./LocationController";
const Location = require("./LocationModel");

const locationRouter = Router();

locationRouter.post('/', createLocation);
locationRouter.get('/', getAllLocations);
locationRouter.get('/info/:id', getLocationById);
locationRouter.get('/shops', getShops);
locationRouter.get('/restaurants', getRestaurants);
locationRouter.get('/monuments', getMonuments);
locationRouter.get('/others', getOther);


export { locationRouter };
