import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils";
import config from "../config/config";

interface TokenPayload {
    id: string;
    name: string;
    email: string;
    iat: number;
    exp: number;
}

interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthRequest extends Request {
    user: IUser;
}

const jwtSecret = config.JWT_SECRET as string;

const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new ApiError(401, "Missing authorization header"));
    }

    const [, token] = authHeader.split(" ");
    try {
        const decoded = jwt.verify(token, jwtSecret) as TokenPayload;

        req.user = {
            _id: decoded.id,
            email: decoded.email,
            createdAt: new Date(decoded.iat * 1000),
            updatedAt: new Date(decoded.exp * 1000),
            name: decoded.name,
            password: "",
        };
        return next();
    } catch (error) {
        console.error(error);
        return next(new ApiError(401, "Invalid token"));
    }
};

const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode ||
            (error instanceof Error
                ? 400 // Bad Request
                : 500); // Internal Server Error
        const message =
            error.message ||
            (statusCode === 400 ? "Bad Request" : "Internal Server Error");
        error = new ApiError(statusCode, message, false, err.stack.toString());
    }
    next(error);
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (process.env.NODE_ENV === "production" && !err.isOperational) {
        statusCode = 500; // Internal Server Error
        message = "Internal Server Error";
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    };

    if (process.env.NODE_ENV === "development") {
        console.error(err);
    }

    res.status(statusCode).json(response);
    next();
};

export { authMiddleware, errorConverter, errorHandler };
