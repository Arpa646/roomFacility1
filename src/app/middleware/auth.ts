import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "./asynch";
import { TUserRole } from "../modules/Registration/user.constant";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
    jwt.verify(token, "jjjnn", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "You are not authorized!",
        });
      }

      const role = (decoded as JwtPayload).role;
      console.log("Decoded role:", role);
      console.log("Required roles:", requiredRoles);

      // Checking if the user has the required role
      if (requiredRoles.length > 0 && !requiredRoles.includes(role as TUserRole)) {
        return res.status(403).json({
          success: false,
          statusCode: 403,
          message: "You have no access to this route",
        });
      }

      // Assigning the decoded payload to the request object
      req.user = decoded as JwtPayload;
      next();
    });
  });
};

export default auth;
