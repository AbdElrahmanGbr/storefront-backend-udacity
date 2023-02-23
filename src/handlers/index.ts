import { Application } from "express";
import orderRouter from "./order.handler";
import productRouter from "./product.handler";
import userRouter from "./users.handler";

export const mountRoutes = (app: Application) => {
    app.use("/users", userRouter);
    app.use("/products", productRouter);
    app.use("/orders", orderRouter);
};