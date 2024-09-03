import { Request, Response, NextFunction } from 'express';

export const validateDataPresence = (req: Request, res: Response, next: NextFunction) => {
  const { data } = res.locals;

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }

  next();
};
