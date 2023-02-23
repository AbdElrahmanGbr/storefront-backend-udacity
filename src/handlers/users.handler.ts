import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/auth.middleware";
import UserStore from "../models/User";

const store = new UserStore();
const router = Router();

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (error) {
        res.status(400).json(error);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(Number(req.params.id));
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const newUser = await store.create(req.body);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json(error);
    }
};

const authenticate = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await store.authenticate(username, password);

        if (!user) {
            return res.status(401).json("Invalid credentials");
        }

        const token = jwt.sign({ user }, process.env.TOKEN_SECRET as jwt.Secret, {
            expiresIn: "4h",
        });

        res.json({ token });
    } catch (error) {
        res.status(400).json(error);
    }
};

router.post("/authenticate", authenticate);
router.post("/", create);

router.use(verifyToken);
router.get("/", index);
router.get("/:id", show);

export default router;