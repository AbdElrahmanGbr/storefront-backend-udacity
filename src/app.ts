import cors from "cors";
import express, { Application, Request, Response } from "express";
import { mountRoutes } from "./handlers";

const app: Application = express();

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

mountRoutes(app);

app.get("/", async function (req: Request, res: Response) {
    res.send("Hello World!");
});

export default app;