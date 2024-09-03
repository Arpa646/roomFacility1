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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asynch_1 = __importDefault(require("./asynch"));
const auth = (...requiredRoles) => {
    return (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader);
        // Checking if the Authorization header is present
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "You are not authorized!",
            });
        }
        const token = authHeader.split(" ")[1];
        // Checking if the token is present
        if (!token) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "You are not authorized!",
            });
        }
        // Verifying the token
        jsonwebtoken_1.default.verify(token, "jjjnn", (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    statusCode: 401,
                    message: "You are not authorized!",
                });
            }
            const role = decoded.role;
            console.log("Decoded role:", role);
            console.log("Required roles:", requiredRoles);
            // Checking if the user has the required role
            if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
                return res.status(403).json({
                    success: false,
                    statusCode: 403,
                    message: "You have no access to this route",
                });
            }
            // Assigning the decoded payload to the request object
            req.user = decoded;
            next();
        });
    }));
};
exports.default = auth;
