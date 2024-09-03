"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const availableslot_controller_1 = require("./availableslot.controller");
const router = express_1.default.Router();
router.get('/', availableslot_controller_1.checkSlotController.checkslot);
exports.slotRoutes = router;
