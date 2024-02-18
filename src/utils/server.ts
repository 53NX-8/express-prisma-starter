import express, { NextFunction, Request, Response } from "express";
import router from "../routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "config";
import morgan from "morgan";
import AppError from "./appError";

function createServer() {
    const app = express();
    app.use(express.json({ limit: "10kb" }));
    app.use(cookieParser());
    app.use(
        cors({
            origin: [config.get<string>("origin")],
            credentials: true,
        })
    );
    if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
    app.use("/api/v1", router);
    app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
        err.status = err.status || "error";
        err.statusCode = err.statusCode || 500;

        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    });
    return app;
}

export default createServer;