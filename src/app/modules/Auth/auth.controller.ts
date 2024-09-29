import catchAsync from "../../middleware/asynch";
import sendResponse from "../../utils/response";
import { AuthServices } from "./auth.services";


import { Request, Response, NextFunction } from 'express';
const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const [accessToken,user,refreshToken] = await AuthServices.loginUser(req.body);

console.log(refreshToken)


  res.cookie('refreshToken', refreshToken, {
    secure: 'production' === 'production',
    httpOnly: true,
  });

  // sendResponse(res, {
  //   statusCode: 200,
  //   success: true,
  //   message: "User is logged in succesfully!",
  //   Token:accessToken,
  //   data: {
     
  //     data:user
  //   },
  // });
  return res.status(200).send({
    success: true,
    message: "User logged in successfully",
    token: accessToken,
    data: user
  });
});
export const AuthControllers = {
  loginUser,
};
