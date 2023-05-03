"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("./UserController");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("/", UserController_1.createUser);
userRouter.get(":pod_id", UserController_1.getUserByPodId);
