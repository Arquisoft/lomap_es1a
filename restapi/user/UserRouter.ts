import { Router, Request, Response } from "express";
import { createUser, getUserByPodId } from "./UserController";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get(":pod_id", getUserByPodId);

export { userRouter };