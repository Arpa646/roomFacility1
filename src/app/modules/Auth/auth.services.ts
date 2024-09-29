import { TLoginUser } from './auth.interface';
import { UserRegModel } from "../Registration/user.model";
import bcrypt from "bcrypt";


import jwt from "jsonwebtoken";
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
 
  const user = await UserRegModel.findOne({
    email: payload.email,
    password: payload.password
  });
  
  if (!user) {
    throw new Error("This user is not found!");

  }
  // checking if the user is already deleted

  //const isDeleted = user?.isDeleted;
  const isDeleted = user?.$isDeleted();

  if (isDeleted) {
    throw new Error("This user is not found!");

  }

  //checking if the password is correct

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.email,
    useremail: user._id,
    role: user.role,
  };
  console.log('for create token',jwtPayload);

  const accessToken = jwt.sign(jwtPayload, "jjjnn" as string, {
    expiresIn: "10d",
  });
  const refreshToken = jwt.sign(jwtPayload, "production" as string, {
    expiresIn: "365d",
  });






  return [accessToken,user,refreshToken];
};

export const AuthServices = {
  loginUser,

};
