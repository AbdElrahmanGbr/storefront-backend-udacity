import { Request, Response, Router } from "express";
import verifyToken from "../middlewares/auth.middleware";
import ProductStore from "../models/Product";

const store = new ProductStore();

const router = Router();

const index = async (req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (error) {
        res.status(400).json(error);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(Number(req.params.id));
        res.json(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const newProduct = await store.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const updated = await store.update(Number(req.params.id), req.body);
        res.json(updated);
    } catch (error) {
        res.status(400).json(error);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const product = await store.delete(Number(req.params.id));
        res.status(204).json(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

const category = async (req: Request, res: Response) => {
    try {
        const products = await store.category(req.params.category);
        res.json(products);
    } catch (error) {
        res.status(400).json(error);
    }
};

router.get("/", index);
router.get("/category/:category", category);
router.get("/:id", show);

router.post("/", verifyToken, create);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, destroy);

export default router;