"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOther = exports.getMonuments = exports.getRestaurants = exports.getShops = exports.getLocationById = exports.getAllLocations = exports.createLocation = void 0;
const Location = require("./LocationModel");
function createLocation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, category, longitud, latitud } = req.body;
            const location = new Location({
                name,
                longitud,
                latitud,
                category
            });
            yield location.save();
            res.status(201).json({ message: 'LocationCreated', location });
            console.log("Location created: ", location);
        }
        catch (err) {
            console.error(err);
            console.log(req.body);
            res.status(500).json({ message: 'error error' });
        }
    });
}
exports.createLocation = createLocation;
function getAllLocations(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allLocations = yield Location.find({});
            res.send({ status: "Ok", data: allLocations });
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error al obtener las ubicaciones");
        }
    });
}
exports.getAllLocations = getAllLocations;
function getLocationById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        try {
            const allLocations = yield Location.findById(id);
            res.send({ status: "Ok", dir: id, data: allLocations });
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error al obtener las ubicaciones");
        }
    });
}
exports.getLocationById = getLocationById;
function getShops(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const locations = yield Location.find({ category: "shop" }).exec();
            res.send({ status: "Ok", data: locations });
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error al obtener las tiendas");
        }
    });
}
exports.getShops = getShops;
function getRestaurants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const locations = yield Location.find({ category: "restaurant" }).exec();
            res.send({ status: "Ok", data: locations });
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error al obtener los restaurantes");
        }
    });
}
exports.getRestaurants = getRestaurants;
function getMonuments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const locations = yield Location.find({ category: "monument" }).exec();
            res.send({ status: "Ok", data: locations });
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error al obtener los monumentos");
        }
    });
}
exports.getMonuments = getMonuments;
function getOther(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const locations = yield Location.find({ category: "other" }).exec();
            res.send({ status: "Ok", data: locations });
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Error al obtener otros");
        }
    });
}
exports.getOther = getOther;
