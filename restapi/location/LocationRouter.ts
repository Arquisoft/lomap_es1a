import { Router, Request, Response } from "express";
import {
  createLocation,
  getAllLocations,
  getLocationById
} from "./LocationController";
const Location = require("./LocationModel");

const locationRouter = Router();

locationRouter.post('/', createLocation);
locationRouter.get('/', getAllLocations);
locationRouter.get('/info/:id', getLocationById);

export { locationRouter };
