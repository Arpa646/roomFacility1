"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const asynch_1 = __importDefault(require("../../middleware/asynch"));
const response_1 = __importDefault(require("../../utils/response"));
const http_status_codes_1 = require("http-status-codes");
// import { userValidationSchema } from "./user.validation"; // Uncomment if you need validation
const createUser = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield user_service_1.UserServices.createUserIntoDB(UserData);
    (0, response_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User registered successfully",
        data: result,
    });
}));
const getAllUser = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getAllUserFromDB();
    if (result.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Data Found",
            data: [],
        });
    }
    (0, response_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
}));
exports.userControllers = {
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
