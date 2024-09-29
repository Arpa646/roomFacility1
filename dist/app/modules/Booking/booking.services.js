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
exports.bookingServices = exports.createBookingIntoDB = void 0;
const user_model_1 = require("./../Registration/user.model");
const payment_utils_1 = require("./payment.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const booking_model_1 = __importDefault(require("./booking.model"));
const facility_model_1 = __importDefault(require("../Facility/facility.model"));
const uuid_1 = require("uuid");
const createBookingIntoDB = (bookingData, userid) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    // const user = await UserRegModel.find({
    //   user: userId,
    // });
    const userInfo = yield user_model_1.UserRegModel.findOne({ _id: userid });
    try {
        session.startTransaction();
        const { facility, date, startTime, endTime } = bookingData;
        const facilitdata = yield facility_model_1.default.findOne({ _id: facility }).session(session);
        if (!facilitdata) {
            throw new Error("No facility found");
        }
        const facilityprice = facilitdata.pricePerHour;
        const queryDate = typeof date === "string" ? new Date(date) : new Date();
        // Check for existing bookings
        const existingBookings = yield booking_model_1.default.find({
            facility,
            date: queryDate,
            startTime,
            endTime,
        }).session(session);
        if (existingBookings.length > 0) {
            throw new Error("Facility is unavailable during the requested time slot.");
        }
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);
        const durationInHours = (endHour * 60 + endMinute - (startHour * 60 + startMinute)) / 60;
        const price = durationInHours * facilityprice;
        const transactionid = (0, uuid_1.v4)();
        // Initialize booking object
        const newBooking = new booking_model_1.default({
            facility,
            date: queryDate,
            startTime,
            endTime,
            user: userid,
            payableAmount: price,
            isBooked: "confirmed",
            isPaid: "pending",
            transactionid,
            // Set to pending until payment is confirmed
        });
        const savedBooking = yield newBooking.save({ session });
        // Initiate Aamarpay payment
        const paymentData = {
            transactionid,
            amount: price,
            name: userInfo === null || userInfo === void 0 ? void 0 : userInfo.name,
            email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email,
            address: userInfo === null || userInfo === void 0 ? void 0 : userInfo.address,
            phone: userInfo === null || userInfo === void 0 ? void 0 : userInfo.phone
        };
        console.log(paymentData);
        const paymentResponse = yield (0, payment_utils_1.initiatePayment)(paymentData);
        // Log payment response
        // Save booking to the database after payment
        yield session.commitTransaction();
        session.endSession();
        return paymentResponse.data;
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        throw err;
    }
});
exports.createBookingIntoDB = createBookingIntoDB;
// Aamarpay payment initiation logic
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const io = yield user_model_1.UserRegModel.findOne({ _id: "6675cac287245387ae84f79e" });
    console.log("this is ", io);
    const result = yield booking_model_1.default.find({ isBooked: "confirmed" })
        .populate("user")
        .populate("facility");
    if (!result) {
        throw new Error("No data Found");
    }
    return result;
});
const findBookingsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("this is id", userId);
    const result = yield booking_model_1.default.find({ isBooked: "confirmed" })
        .populate("user")
        .populate("facility");
    // Only include facilities that are not deleted});
    console.log("this is booking", result);
    if (!result) {
        throw new Error("No data Found");
    }
    return result;
});
const BookingCancle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //const result1 = await FacilityModel.findOne(_id: id)
    console.log("this is data", id);
    const result = yield booking_model_1.default.findByIdAndUpdate(id, { isBooked: "cancelled" }, {
        new: true,
    }).populate({
        path: "facility",
        match: { isDeleted: false },
    });
    if (!result) {
        throw new Error("No data Found");
    }
    return result;
});
exports.bookingServices = {
    createBookingIntoDB: exports.createBookingIntoDB,
    getAllBookingsFromDB,
    findBookingsByUserId,
    BookingCancle,
};
