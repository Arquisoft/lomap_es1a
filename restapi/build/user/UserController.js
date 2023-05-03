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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByPodId = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("./UserModel"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { pod_id } = req.body;
            const user = new UserModel_1.default({
                pod_id
            });
            yield user.save();
            res.status(201).json({ message: 'LocationCreated', location });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
exports.createUser = createUser;
function getUserByPodId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pod_id } = req.params;
        try {
            const locations = yield UserModel_1.default.find({ pod_id });
            res.json(locations);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Error al obtener las ubicaciones");
        }
    });
}
exports.getUserByPodId = getUserByPodId;
;
