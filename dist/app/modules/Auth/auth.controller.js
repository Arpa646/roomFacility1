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
exports.AuthControllers = void 0;
const asynch_1 = __importDefault(require("../../middleware/asynch"));
const auth_services_1 = require("./auth.services");
const loginUser = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const [accessToken, user] = yield auth_services_1.AuthServices.loginUser(req.body);
    // res.cookie('refreshToken', refreshToken, {
    //   secure: config.NODE_ENV === 'production',
    //   httpOnly: true,
    // });
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
}));
exports.AuthControllers = {
    loginUser,
};
