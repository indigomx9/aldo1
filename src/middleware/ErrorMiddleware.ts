import { HttpException } from "./HttpException";
import express from "express";

export const notFoundError = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const error: any = new Error("Not Found!");
    error.status = 404;
    next(error);
};

export const errorHandler = (
    error: HttpException, 
    req: express.Request, 
    res: express.Response,
    next: express.NextFunction
) => {
    const status = error.status || 500;
    const message = error.message || "Error";
    res.status(status);
    res.send({ status, message });
};



