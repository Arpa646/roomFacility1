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
exports.checkSlotController = void 0;
const asynch_1 = __importDefault(require("../../middleware/asynch"));
const response_1 = __importDefault(require("../../utils/response"));
const availableslot_services_1 = require("./availableslot.services");
const checkslot = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { date } = req.query;
    const date = req.query.date || '';
    const result = yield availableslot_services_1.slotServices.checkslot(date);
    console.log(result);
    if (result.length === 0) {
        return res.status(404).json({
            success: true,
            message: "No slot AvailAble on this Date ",
            data: [],
        });
    }
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Availability checked successfully",
        data: result,
    });
}));
exports.checkSlotController = { checkslot };
