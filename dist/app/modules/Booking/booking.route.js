"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
//import { userControllers } from "./user.controller";
// import { facilityController } from "./facility.controller";
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../Registration/user.constant");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.bookingController.createBooking);
router.post("/success", booking_controller_1.bookingController.confirmationController);
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.bookingController.getAllBookings);
router.get("/user", (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.bookingController.getBookingsByEmail);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.bookingController.cancelBooking);
exports.BookingRoutes = router;
