import { Router, Request, Response } from "express";
import { createLocation, getLocationsByPodId } from "./LocationController";

const locationRouter = Router();

locationRouter.post("/", createLocation);
locationRouter.get(":pod_id", getLocationsByPodId);

export { locationRouter };
