import { Router, Request, Response } from "express";
import {
  createLocation,
  getLocationsByPodId,
  getAllLocations,
} from "./LocationController";
import mongoose from "mongoose";

require("./LocationModel");
const Location = mongoose.model("Locations");

const locationRouter = Router();

locationRouter.post("/", createLocation);
locationRouter.get(":pod_id", getLocationsByPodId);
locationRouter.get("/", getAllLocations);

export { locationRouter };
