import  {Booking}  from './booking.inteface';
import mongoose, { Schema, Document, Model } from "mongoose";

// Define the schema for the Booking model
const bookingSchema: Schema<Booking> = new Schema<Booking>({
  facility: {
    type: Schema.Types.ObjectId,
    ref: "Facility", // Matches the model name in FacilityModel
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Matches the model name for UserRegModel
    required: true,
  },
  payableAmount: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});

// Create the Booking model using the schema
const BookingModel: Model<Booking> = mongoose.model<Booking>(
  "Booking",
  bookingSchema
);

export default BookingModel;
