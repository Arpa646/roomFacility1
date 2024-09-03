

import { Request, Response, NextFunction } from 'express';
import { UserServices } from "./user.service";
import catchAsync from "../../middleware/asynch";
import sendResponse from "../../utils/response";
import { StatusCodes } from "http-status-codes";
// import { userValidationSchema } from "./user.validation"; // Uncomment if you need validation

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { user: UserData } = req.body;

  console.log(UserData);
  
  // Validation before creating user in the database
  // const resultvalidate = userValidationSchema.safeParse(UserData);
  // if (!resultvalidate.success) {
  //   console.log(resultvalidate.error.errors);
  //   return res.status(400).json({
  //     success: false,
  //     message: "Validation failed",
  //     errors: resultvalidate.error.errors,
  //   });
  // } else {
  //   console.log("Validation succeeded", resultvalidate.data);
  // }

  // Creating user into database
  const result = await UserServices.createUserIntoDB(UserData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUserFromDB();
  if (result.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

export const userControllers = {
  createUser,
  getAllUser,
};













// import { UserServices } from "./user.service";


// import catchAsync from "../../middleware/asynch";
// import sendResponse from "../../utils/response";
// import { StatusCodes } from "http-status-codes";
// import { userValidationSchema } from "./user.validation";
// const createUser = catchAsync(async ((req:Request,res:Response,next:NextFunction) => {
//   const { user: UserData } = req.body;

//   console.log(UserData);
//   //validation before create user on database
//   // const resultvalidate = userValidationSchema.safeParse(UserData);

//   // if (!resultvalidate.success) {
//   //   console.log(resultvalidate.error.errors);
//   // } else {
//   //   console.log("Validation succeeded", resultvalidate.data);
//   // }

//   //creating user into database
//   const result = await UserServices.createUserIntoDB(UserData);

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: "User Register succesfully",
//     data: result,
//   });
// });

// const getAllUser = catchAsync(async (req: Request, res: Response) => {
//   const result = await UserServices.getAllUserFromDB();
//   if (result.length === 0) {
//     return res.status(404).json({
//       success: false,
//       message: "No Data Found",
//       data: [],
//     });
//   }

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Students are retrieved succesfully",
//     data: result,
//   });
// });

// export const userControllers = {
//   createUser,
//   getAllUser,
// };
