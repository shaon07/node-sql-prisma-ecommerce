import { NextFunction, Request, Response, } from "express";
import ApiError from "../utils/ApiError";

export const errorHandler = ((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    if(res.headersSent){
        return next(err);
    }
    res.status(err.statusCode || 500).json({
        ...err,
        message: err.message,
        success: err.success,
        errors: err.errors,
    });
})