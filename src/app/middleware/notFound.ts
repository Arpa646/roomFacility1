import { NextFunction, Request, Response } from "express";

//this is gobal handler error crack system all error are catch here

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
};
export default notFound;
// app.use();
