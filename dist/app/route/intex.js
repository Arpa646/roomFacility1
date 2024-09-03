"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/Auth/auth.route");
const user_route_1 = require("../modules/Registration/user.route");
const facility_route_1 = require("../modules/Facility/facility.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const availableslot_route_1 = require("../modules/CheckAvailable/availableslot.route");
const router = express_1.default.Router();
const modulerRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/facility',
        route: facility_route_1.FacilityRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/check-availability',
        route: availableslot_route_1.slotRoutes,
    },
];
modulerRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
