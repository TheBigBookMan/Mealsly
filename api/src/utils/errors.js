import { Response } from 'express';

export const errorHttp = (
    res,
    error,
    errorMsg,
    status = 500
) => {
    console.error(errorMsg, error);
    res.status(status).json({
        message: 'Something went wrong.',
        error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
};