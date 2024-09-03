import { startSession, ObjectId } from "mongoose";
import mongoose from "mongoose";

import { Booking } from "./booking.inteface";
import BookingModel from "./booking.model";
import { UserRegModel } from "../Registration/user.model";
import FacilityModel from "../Facility/facility.model";



const createBookingIntoDB = async (bookingData: Booking, userid: string) => {
  const session = await mongoose.startSession();

  try {
      session.startTransaction();
      
      const { facility, date, startTime, endTime } = bookingData;
      
      const facilitdata = await FacilityModel.findOne({ _id: facility }).session(session);

      if (!facilitdata) {
          throw new Error("No facility found");
      }

      const facilityprice = facilitdata.pricePerHour;

      //const queryDate = date ? new Date(date as string) : new Date();
      const queryDate = typeof date === 'string' ? new Date(date) : new Date();




      const existingBookings = await BookingModel.find({
          facility: facility,
          date: queryDate,
          startTime: startTime,
          endTime: endTime,
      }).session(session);

      if (existingBookings.length > 0) {
          throw new Error("Facility is unavailable during the requested time slot.");
      }

      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const startInMinutes = startHour * 60 + startMinute;
      const endInMinutes = endHour * 60 + endMinute;

      const durationInHours = (endInMinutes - startInMinutes) / 60;
      const price = durationInHours * facilityprice;

      const newBooking = new BookingModel({
          facility: facility,
          date: queryDate,
          startTime: startTime,
          endTime: endTime,
          user: userid,
          payableAmount: price,
          isBooked: "confirmed",
      });

      const newUser = await newBooking.save({ session });
      
      await session.commitTransaction();
      session.endSession();
      
      return newUser;
  } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err; // Re-throw the original error
  }
};






// const createBookingIntoDB = async (bookingData: Booking, userid: string) => {
//   // const user = await UserRegModel.findOne({ _id: userid });
//   // console.log("this is user", user._id.toString());

//   const session = await Mongoose.startSession();

//   // const Id = user._id.toString();

//   const { facility, date, startTime, endTime } = bookingData;
//   const facilitdata = await FacilityModel.findOne({ _id: facility });
//   // if facility is nor available it return error
//   // if (!facilitdata) {
//   //   return res.status(404).json({
//   //     success: false,
//   //     statusCode: StatusCodes.NOT_FOUND,
//   //     message: "No Data Found",
//   //     data: [],
//   //   });
//   // }

//   if (!facilitdata) {
//     throw new Error("No facility Found");
//   }
//   const facilityprice = facilitdata.pricePerHour;

//   // Parse the date or use today's date if not provided
//   const queryDate = date ? new Date(date as string) : new Date();

//   // Check facility availability

//   const existingBookings = await BookingModel.find({
//     facility: facility,
//     date: date,

//     startTime: startTime,
//     endTime: endTime,
//   });
//   console.log("this", existingBookings);

//   //console.log(existingBookings);

//   if (existingBookings.length > 0) {
//     throw new Error("Facility is unavailable during the requested time slot.");
//   }

//   // const facilityDetails = await FacilityModel.findById(facility);
//   // if (!facilityDetails) {
//   //   return next(new AppError("Facility not found!", 404));
//   // }
//   const [startHour, startMinute] = startTime.split(":").map(Number);
//   const [endHour, endMinute] = endTime.split(":").map(Number);

//   const startInMinutes = startHour * 60 + startMinute;
//   const endInMinutes = endHour * 60 + endMinute;

//   // Calculate duration in hours
//   const durationInHours = (endInMinutes - startInMinutes) / 60;

//   // Calculate price
//   const price = durationInHours * facilityprice;
//   // const hours = (new Date(`1970-01-01T${endTime}Z`).getHours() - new Date(`1970-01-01T${startTime}Z`).getHours());
//   // const payableAmount = hours * facilityDetails.pricePerHour;

//   const newBooking = new BookingModel({
//     facility: facility,
//     date: queryDate,
//     startTime: startTime,
//     endTime: endTime,
//     user: userid,
//     payableAmount: price,
//     isBooked: "confirmed",
//   });

//   try {
//     session.startTransaction();
//     const newUser = await BookingModel.create([newBooking], { session });
//     await session.commitTransaction();
//     session.endSession();
//     return newUser;
//   } catch (err: any) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error(err);
//   }
// };

const getAllBookingsFromDB = async () => {
  const io = await UserRegModel.findOne({ _id: "6675cac287245387ae84f79e" });
  console.log("this is ", io);

  const result = await BookingModel.find({ isBooked: "confirmed" })
    .populate("user")
    .populate("facility");

  if (!result) {
    throw new Error("No data Found");
  }
  return result;
};

const findBookingsByUserId = async (userId: string) => {
  console.log("this is id", userId);

  const bookings = await BookingModel.find({
    user: userId,
    isBooked: "confirmed",
  }).populate({
    path: "facility",
    match: { isDeleted: false },
  });
  console.log("this is booking", bookings);
  if (!bookings) {
    throw new Error("No data Found");
  }
  return bookings;
};
const BookingCancle = async (id:string) => {
  //const result1 = await FacilityModel.findOne(_id: id)
  console.log("this is data", id);

  const result = await BookingModel.findByIdAndUpdate(
    id,
    { isBooked: "cancelled" },
    {
      new: true,
    }
  ).populate({
    path: "facility",
    match: { isDeleted: false },
  });

  if (!result) {
    throw new Error("No data Found");
  }
  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  findBookingsByUserId,
  BookingCancle,
};
