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
exports.bookingController = void 0;
const payment_service_1 = require("./payment.service");
const asynch_1 = __importDefault(require("../../middleware/asynch"));
const response_1 = __importDefault(require("../../utils/response"));
const booking_services_1 = require("./booking.services");
const booking_validation_1 = require("./booking.validation");
const http_status_codes_1 = require("http-status-codes");
const createBooking = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { booking: bookingData } = req.body;
    const validationResult = booking_validation_1.bookingValidationSchema.safeParse(bookingData);
    if (!validationResult.success) {
        const validationErrors = validationResult.error.errors.map((error) => ({
            path: error.path.join("."),
            message: error.message,
        }));
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            success: false,
            errors: validationErrors,
        });
    }
    const result = yield booking_services_1.bookingServices.createBookingIntoDB(bookingData, req.user.useremail);
    console.log("this", result);
    (0, response_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Booking created successfully",
        data: result,
    });
    // Initiate the payment and log the response
    //await initiatePayment();
}));
const getAllBookings = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // sendResponse(res, {
    //   statusCode: StatusCodes.OK,
    //   success: true,
    //   message: "Bookings retrieved successfully",
    //   data: result,
    // });
    try {
        const result = yield booking_services_1.bookingServices.getAllBookingsFromDB();
        if (!result || result.length === 0) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "No bookings found",
                data: [],
            });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Facility retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Server error",
                error: err.message,
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Unknown server error",
            });
        }
    }
}));
const getBookingsByEmail = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { useremail } = req.user;
    const result = yield booking_services_1.bookingServices.findBookingsByUserId(useremail);
    if (result.length === 0) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: "No bookings found",
            data: [],
        });
    }
    (0, response_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: result,
    });
}));
const cancelBooking = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_services_1.bookingServices.BookingCancle(id);
    if (!result) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Booking not found",
        });
    }
    (0, response_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Booking canceled successfully",
        data: result,
    });
}));
const confirmationController = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the booking details based on the transaction ID
    const transactionId = req.query.transactionid;
    const bookingDetails = yield payment_service_1.paymentServices.confirmationService(transactionId);
    // If booking details are not found, handle it
    if (!bookingDetails) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(`
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
              h1 { color: red; }
              p { color: #333; }
            </style>
          </head>
          <body>
            <h1>Payment Failed</h1>
            <p>Sorry, we couldn't find your booking details.</p>
            <a href="https://flourishing-stroopwafel-629c6d.netlify.app">Go to Homepage</a>
          </body>
        </html>
      `);
    }
    // Destructure necessary data
    const { date, startTime, endTime, payableAmount } = bookingDetails;
    res.send(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f8ff;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .container {
              text-align: center;
              background-color: #ffffff;
              padding: 50px;
              border-radius: 10px;
              box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #28a745;
              font-size: 36px;
            }
            p {
              font-size: 18px;
              color: #333;
            }
            .button {
              margin-top: 20px;
              padding: 10px 20px;
              background-color: #28a745;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              transition: background-color 0.3s ease;
            }
            .button:hover {
              background-color: #218838;
            }
            .summary {
              text-align: left;
              margin: 20px 0;
            }
            .summary p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Payment Success!</h1>
            <p>Thank you for your payment. Your transaction has been successfully processed.</p>

            <div class="summary">
              <h2>Booking Summary</h2>
    
              <p><strong>Booking Date:</strong> ${new Date(date).toLocaleDateString()}</p>
              <p><strong>Start Time:</strong> ${startTime}</p>
              <p><strong>End Time:</strong> ${endTime}</p>
              <p><strong>Total Payment:</strong> $${payableAmount}</p>
            </div>

            <a class="button" href="https://flourishing-stroopwafel-629c6d.netlify.app">Go to Homepage</a>
          </div>
        </body>
      </html>
    `);
}));
exports.bookingController = {
    createBooking,
    getAllBookings,
    getBookingsByEmail,
    cancelBooking,
    confirmationController,
};
