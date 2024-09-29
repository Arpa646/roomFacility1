import express from "express";
//import { userControllers } from "./user.controller";

// import { facilityController } from "./facility.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../Registration/user.constant";
import { bookingController } from "./booking.controller";

const router = express.Router();

router.post("/", auth(USER_ROLE.user), bookingController.createBooking);
router.post("/success", bookingController.confirmationController);

router.get("/", auth(USER_ROLE.admin), bookingController.getAllBookings);

router.get("/user", auth(USER_ROLE.user), bookingController.getBookingsByEmail);
router.delete("/:id", auth(USER_ROLE.user), bookingController.cancelBooking);

export const BookingRoutes = router;
