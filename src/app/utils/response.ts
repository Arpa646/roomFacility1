import { Response } from 'express';

const sendResponse = <T>(res: Response, data: {
    statusCode: number,
    success: boolean,
    message?: string,
    data?: T
}) => {
    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        message: data.message,
        success: data.success,
        data: data.data,
    });
};

export default sendResponse;
