import express, { Express } from "express";
import userRouter from "./routes";
import { errorConverter, errorHandler } from "./middleware";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", userRouter);
app.use(errorConverter);
app.use(errorHandler);

export default app;
