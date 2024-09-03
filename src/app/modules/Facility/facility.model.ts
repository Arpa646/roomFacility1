import { Facility } from "./facility.interface";
import { Schema, model } from "mongoose"; // Added import for `model`
const facilitySchema = new Schema<Facility>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false, // Default value is false indicating the record is not deleted
  },
});

// Create the model
const FacilityModel = model<Facility>("Facility", facilitySchema);

export default FacilityModel;
