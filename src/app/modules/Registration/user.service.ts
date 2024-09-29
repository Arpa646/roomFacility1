import { startSession } from "mongoose";
import mongoose from "mongoose";
import { IUser } from "./user.interface";
import { UserRegModel } from "./user.model";

//creating data into db using rollback and transiction
const createUserIntoDB = async (userData: IUser) => {
  //creating session
  console.log("ddd", userData);
  const session = await mongoose.startSession();

  try {
    //start transaction
    session.startTransaction();
    const newUser = await UserRegModel.create([userData], { session });
    await session.commitTransaction();
    session.endSession();
    console.log("........", newUser);
    return newUser;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllUserFromDB = async () => {
  const result = await UserRegModel.find();
  if (!result) {
    throw new Error("No data Found");
  }
  return result;
};

const getUserByIdFromDB = async (id: string) => {
  console.log('hii',id)
  const result = await UserRegModel.findOne({ _id: id});
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getUserByIdFromDB,
};
// const createFacultyIntoDB = async (password: string, payload: TFaculty) => {

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const newFaculty = await Faculty.create([payload], { session });

//     await session.commitTransaction();
//     await session.endSession();

//     return newFaculty;
//   } catch (err: any) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error(err);
//   }
// };
