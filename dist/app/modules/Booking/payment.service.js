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
exports.paymentServices = void 0;
const booking_model_1 = __importDefault(require("./booking.model"));
const confirmationService = (transactionid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_model_1.default.findOneAndUpdate({ transactionid }, {
            isPaid: "paid",
        }, { new: true } // returns the updated document
        );
        if (!result) {
            throw new Error("Booking not found or update failed");
        }
        console.log("confirmation", transactionid);
        return result;
    }
    catch (error) {
        console.error("Error confirming payment:", error);
        throw error;
    }
});
exports.paymentServices = { confirmationService };
