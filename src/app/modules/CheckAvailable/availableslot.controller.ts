import { Request, Response, NextFunction } from 'express';
import catchAsync from "../../middleware/asynch";
import sendResponse from "../../utils/response";
import { slotServices } from "./availableslot.services";

const checkslot = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // const { date } = req.query;

  const date = req.query.date as string || '';
  const result = await slotServices.checkslot(date);
  console.log(result);
  
  if (result.length === 0) {
    return res.status(404).json({
      success: true,
      message: "No slot AvailAble on this Date ",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Availability checked successfully",
    data: result,
  });
});

export const checkSlotController = { checkslot };
