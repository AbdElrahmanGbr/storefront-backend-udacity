import { Request, Response, Router } from "express";
import verifyToken, { CustomRequest } from "../middlewares/auth.middleware";
import { OrderStore } from "../models/Order";

const store = new OrderStore();
const router = Router();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (error) {
        res.status(400).json(error);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(parseInt(req.params.id));
        res.json(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const product = await store.create(req.body);
        res.json(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const product = await store.update(
            parseInt(req.params.id),
            req.body.order_status
        );
        res.json(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const product = await store.delete(parseInt(req.params.id));
        res.status(204).json(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

const addProduct = async (req: Request, res: Response) => {
    try {
        const product = await store.addProduct(
            parseInt(req.params.id),
            parseInt(req.body.productId),
            parseInt(req.body.quantity)
        );
        res.json(product);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await store.getProducts(parseInt(req.params.id));
        res.json(products);
    } catch (error) {
        res.status(400).json(error);
    }
};

const currentOrder = async (req: CustomRequest, res: Response) => {
    try {
        const order = await store.currentOrder(req.user?.id as number);
        res.json(order);
    } catch (error) {
        res.status(400).json(error);
    }
};

const completedOrders = async (req: CustomRequest, res: Response) => {
    try {
        const orders = await store.completedOrders(req.user?.id as number);
        res.json(orders);
    } catch (error) {
        res.status(400).json(error);
    }
};

router.use(verifyToken);

router.route("/").get(index).post(create);

router.route("/current").get(currentOrder);

router.route("/complete").get(completedOrders);

router.route("/:id").get(show).put(update).delete(destroy);

router.route("/:id/products").post(addProduct).get(getProducts);

export default router;