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
exports.slotServices = void 0;
const booking_model_1 = __importDefault(require("../Booking/booking.model"));
const checkslot = (date) => __awaiter(void 0, void 0, void 0, function* () {
    let queryDate;
    if (date) {
        queryDate = new Date(date);
    }
    else {
        // Use today's date if no date is provided
        queryDate = new Date();
    }
    // Convert queryDate to the start of the day in UTC
    const startOfDay = new Date(Date.UTC(queryDate.getUTCFullYear(), queryDate.getUTCMonth(), queryDate.getUTCDate()));
    const endOfDay = new Date(startOfDay);
    endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);
    // Retrieve bookings for the specified date range
    const bookings = yield booking_model_1.default.find({
        date: {
            $gte: startOfDay,
            $lt: endOfDay
        }
    });
    console.log("Bookings for the day:", bookings);
    bookings.forEach(booking => {
        console.log(`startTime: ${booking.startTime}, endTime: ${booking.endTime}`);
    });
    // Define the total available time slots for the day (8 AM to 8 PM)
    const totalSlots = [
        { startTime: "08:00", endTime: "10:00" },
        { startTime: "10:00", endTime: "12:00" },
        { startTime: "12:00", endTime: "14:00" },
        { startTime: "14:00", endTime: "16:00" },
        { startTime: "16:00", endTime: "18:00" },
        { startTime: "18:00", endTime: "20:00" }
    ];
    // Remove booked slots from total slots
    const availableSlots = [];
    for (let i = 0; i < totalSlots.length; i++) {
        const slot = totalSlots[i];
        let isAvailable = true;
        for (let j = 0; j < bookings.length; j++) {
            const booking = bookings[j];
            const bookingStart = booking.startTime;
            const bookingEnd = booking.endTime;
            const slotStart = slot.startTime;
            const slotEnd = slot.endTime;
            // Check if the slot start and end times match exactly with any booking
            if (bookingStart == slotStart && bookingEnd == slotEnd) {
                isAvailable = false;
                break; // No need to check further if slot is not available
            }
        }
        // Only push the slot into availableSlots if it is available
        if (isAvailable) {
            availableSlots.push(slot);
        }
    }
    console.log("Available slots:", availableSlots);
    return availableSlots;
});
exports.slotServices = {
    checkslot
};
