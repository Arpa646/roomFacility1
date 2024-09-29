import { paymentServices } from "./payment.service";
import catchAsync from "../../middleware/asynch";
import sendResponse from "../../utils/response";
import { bookingServices } from "./booking.services";
import { bookingValidationSchema } from "./booking.validation";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import axios from "axios";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { booking: bookingData } = req.body;
    const validationResult = bookingValidationSchema.safeParse(bookingData);

    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.map((error) => ({
        path: error.path.join("."),
        message: error.message,
      }));

      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        errors: validationErrors,
      });
    }

    const result = await bookingServices.createBookingIntoDB(
      bookingData,
      req.user.useremail
    );

    console.log("this", result);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Booking created successfully",
      data: result,
    });

    // Initiate the payment and log the response
    //await initiatePayment();
  }
);

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  // sendResponse(res, {
  //   statusCode: StatusCodes.OK,
  //   success: true,
  //   message: "Bookings retrieved successfully",
  //   data: result,
  // });
  try {
    const result = await bookingServices.getAllBookingsFromDB();
  

    if (!result || result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "No bookings found",
        data: [],
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Facility retrieved successfully",
      data: result,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Unknown server error",
      });
    }
  }
});

const getBookingsByEmail = catchAsync(async (req: Request, res: Response) => {
  const { useremail } = req.user;
 
  const result = await bookingServices.findBookingsByUserId(useremail);

  if (result.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "No bookings found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookingServices.BookingCancle(id);

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "Booking not found",
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Booking canceled successfully",
    data: result,
  });
});
const confirmationController = catchAsync(
  async (req: Request, res: Response) => {
    // Fetch the booking details based on the transaction ID
    const transactionId = req.query.transactionid as string;
    const bookingDetails = await paymentServices.confirmationService(transactionId);

    // If booking details are not found, handle it
    if (!bookingDetails) {
      return res.status(StatusCodes.NOT_FOUND).send(`
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
  }
);


export const bookingController = {
  createBooking,
  getAllBookings,
  getBookingsByEmail,
  cancelBooking,
  confirmationController,
};

