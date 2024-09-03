import { startSession, Mongoose } from "mongoose";
import mongoose from "mongoose";
// import { IUser } from "./user.interface";
 //import { UserRegModel } from "./user.model";
import { Facility } from "./facility.interface";
import FacilityModel from "./facility.model";

const createFacilityIntoDB = async (facilityData: Facility) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const newUser = await FacilityModel.create([facilityData], { session });
    await session.commitTransaction();
    session.endSession();
    return newUser;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllFacilityFromDB = async () => {
  // const result = await FacilityModel.find();
  const result = await FacilityModel.find({ isDeleted: false });

  return result;
};

// const updateFacilityInDB = async (id, updateData) => {
//   const facility = await FacilityModel.findByIdAndUpdate(id, updateData, {
//     new: true,
//     runValidators: true,
//   });
//   return facility;
// };

const updateFacilityInDB = async (id:string, productData:Facility) => {
  console.log(id);

  const result = await FacilityModel.findByIdAndUpdate(id, productData, {
    new: true,
  });
  // if (!result) {
  //   throw new Error("No data Found");
  // }
  console.log(result);
  return result;
};

const deleteFacilityInDB = async (id:string) => {
  //const result1 = await FacilityModel.findOne(_id: id)
  // console.log('this is data',result1)
  const result = await FacilityModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  // if (!result) {
  //   throw new Error("No data Found");
  // }

  return result;
};

export const facilityServices = {
  createFacilityIntoDB,
  getAllFacilityFromDB,
  updateFacilityInDB,
  deleteFacilityInDB,
};
