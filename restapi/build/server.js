"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_prom_bundle_1 = __importDefault(require("express-prom-bundle"));
const LocationRouter_1 = require("./location/LocationRouter");
const UserRouter_1 = require("./user/UserRouter");
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 5000;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://uo270285:Password@lomapes1a.wjvvv7r.mongodb.net/?retryWrites=true&w=majority');
module.exports = mongoose;
const router = express_1.default.Router();
const metricsMiddleware = (0, express_prom_bundle_1.default)({ includeMethod: true });
app.use(metricsMiddleware);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/locations", LocationRouter_1.locationRouter);
app.use("/users", UserRouter_1.userRouter);
const options = {
    key: fs_1.default.readFileSync('./certificate/private-key.pkey'),
    cert: fs_1.default.readFileSync('./certificate/certificate.cert')
};
https_1.default.createServer(options, app).listen(port, () => {
    console.log('Server HTTPS. Webapp started on port ' + port);
}).on("error", (error) => {
    console.error('Error occured: ' + error.message);
});
