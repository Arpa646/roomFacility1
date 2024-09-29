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
exports.AuthServices = void 0;
const user_model_1 = require("../Registration/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.UserRegModel.findOne({
        email: payload.email,
        password: payload.password
    });
    if (!user) {
        throw new Error("This user is not found!");
    }
    // checking if the user is already deleted
    //const isDeleted = user?.isDeleted;
    const isDeleted = user === null || user === void 0 ? void 0 : user.$isDeleted();
    if (isDeleted) {
        throw new Error("This user is not found!");
    }
    //checking if the password is correct
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    //create token and sent to the  client
    const jwtPayload = {
        userId: user.email,
        useremail: user._id,
        role: user.role,
    };
    console.log('for create token', jwtPayload);
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, "jjjnn", {
        expiresIn: "10d",
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, "production", {
        expiresIn: "365d",
    });
    return [accessToken, user, refreshToken];
});
exports.AuthServices = {
    loginUser,
};
