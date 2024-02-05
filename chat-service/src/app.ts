import express, { Express } from "express";
import userRouter from "./routes/messageRoutes";
import { errorConverter, errorHandler } from "./middleware";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(errorConverter);
app.use(errorHandler);

export default app;
