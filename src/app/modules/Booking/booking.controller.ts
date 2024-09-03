












import catchAsync from "../../middleware/asynch";
import sendResponse from "../../utils/response";
import { bookingServices } from "./booking.services";
import { bookingValidationSchema } from "./booking.validation";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from 'express';

const createBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingServices.getAllBookingsFromDB();

  if (!result || result.length === 0) {
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

export const bookingController = {
  createBooking,
  getAllBookings,
  getBookingsByEmail,
  cancelBooking,
};













// import catchAsync from "../../middleware/asynch";
// import sendResponse from "../../utils/response";
// //import { facilityServices } from "./facility.services";
// import { bookingServices } from "./booking.services";
// import { bookingValidationSchema } from "./booking.validation";
// import { StatusCodes } from "http-status-codes";

// import { Request, Response, NextFunction } from 'express';
// const createBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//   const { booking: bookingData } = req.body;
//   const validationResult = bookingValidationSchema.safeParse(bookingData);
//   console.log(validationResult);
//   if (!validationResult.success) {
//     // Collect validation errors
//     const validationErrors = validationResult.error.errors.map((error) => ({
//       path: error.path.join("."),
//       message: error.message,
//     }));

//     // Return validation errors as JSON response
//     return res.status(400).json({
//       success: false,
//       errors: validationErrors,
//     });
//   }
//   const result = await bookingServices.createBookingIntoDB(
//     bookingData,
//     req.user.useremail
//   );

//   console.log('book',result);
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: "booking created  succesfully",
//     data: result,
//   });
// });

// const getAllBookings = async (req: Request, res: Response) => {
//   try {
//     const result = await bookingServices.getAllBookingsFromDB();

//     if (!result || result.length==0) {
//       return res.status(404).json({
//         success: false,
//         statusCode: StatusCodes.NOT_FOUND,
//         message: "No Data Found",
//         data: [],
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "bookings are retrieved succesfully",
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// const getBookingsByEmail = async (req: Request, res: Response) => {
//   const { useremail } = req.user;

//   try {
//     const result = await bookingServices.findBookingsByUserId(useremail);
//     if (result.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No Data Found",
//         data: [],
//       });
//     }
//     // const bookings = await findBookingsByUserId(user);

//     return res.status(200).json({
//       success: true,
//       message: "Bookings retrieved successfully",
//       data: result,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred",
//       error: error.message,
//       data: {
//         result,
//       },
//     });
//   }
// };
// const cancelBooking = catchAsync(async (req: Request, res: Response, next) => {
//   const { id } = req.params;
//   console.log("this is id", id);
//   try {
//     const result = await bookingServices.BookingCancle(id);
//     console.log(result)
//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: "Facility not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Facility deleted successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error deleting facility",
//       error: error.message,
//     });
//   }
// });

// export const bookingController = {
//   createBooking,
//   getAllBookings,
//   getBookingsByEmail,
//   cancelBooking,
// };
