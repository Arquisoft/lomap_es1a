import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api"; 
import { locationRouter } from "./location/LocationRouter";
import { userRouter } from "./user/UserRouter";
import https from "https";
import fs from "fs";

const app: Application = express();
const port: number = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://uo270285:Password@lomapes1a.wjvvv7r.mongodb.net/?retryWrites=true&w=majority');
module.exports = mongoose;

const router = express.Router();

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    }
));

app.use(bp.json());

app.use("/locations", locationRouter);
app.use("/users", userRouter);

const options = {
    key: fs.readFileSync('./certificate/private-key.pkey'),
    cert: fs.readFileSync('./certificate/certificate.cert')
}

https.createServer(options, app).listen(port, ():void => {
    console.log('(HTTPS) Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});
