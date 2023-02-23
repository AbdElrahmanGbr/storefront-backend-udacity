import { query } from "../../database";
import { OrderStore } from "../../models/Order";
import UserStore from "../../models/User";
import { unsetTables } from "../../utils/unset_Tables";

const store = new OrderStore();
const userStore = new UserStore();

const user = {
    first_name: "John",
    last_name: "Doe",
    username: "john",
    password: "password",
};

let userId: number;

describe("Order Model", () => {
    beforeAll(async () => {
        await unsetTables();

        const authUser = await userStore.create(user);
        userId = authUser.id as number;
    });

    beforeEach(async () => {
        await query(
            `INSERT INTO orders (id, user_id, order_status) VALUES (1, $1, 'pending')`,
            [userId]
        );
    });

    afterEach(async () => {
        await query("DELETE FROM orders");
    });

    it("index method should return a list of orders", async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                user_id: 1,
                order_status: "pending",
            },
        ]);
    });

    it("show method should return the correct order", async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            order_status: "pending",
        });
    });

    it("create method should add a order", async () => {
        await query("DELETE FROM orders");

        const result = await store.create({
            user_id: 1,
            order_status: "pending",
        });
        expect(result.user_id).toEqual(1);
        expect(result.order_status).toEqual("pending");
    });

    it("delete method should remove the order", async () => {
        await store.delete(1);
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it("update method should update the order order_status", async () => {
        await store.update(1, "delievered");

        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            order_status: "delievered",
        });
    });

    it("addProduct method should add a product to the order", async () => {
        await query(
            `INSERT INTO products (id, product_name, product_price, product_category) VALUES (1, 'test', 1, 'test')`
        );
        await store.addProduct(1, 1, 1);

        const result = await query(
            `SELECT * FROM orders_products WHERE Order_ID = 1 AND Product_ID = 1`
        );
        expect(result.rows[0]).toEqual({
            id: 1,
            order_id: 1,
            product_id: 1,
            quantity: 1,
        });
    });

    it("addProduct method should throw error if order is not pending", async () => {
        await query(`DELETE FROM products`);
        await query(
            `INSERT INTO products (id, product_name, product_price, product_category) VALUES (1, 'test', 1, 'test')`
        );
        await query(`UPDATE orders SET order_status = 'delievered' WHERE id = 1`);

        expectAsync(store.addProduct(1, 1, 1)).toBeRejected();
    });

    it("currentOrders method should return the current order", async () => {
        const result = await store.currentOrder(userId);
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            order_status: "pending",
        });
    });

    it("completedOrders method should return the completed orders", async () => {
        await query(`UPDATE orders SET order_status = 'delievered' WHERE id = 1`);

        const result = await store.completedOrders(userId);
        expect(result).toEqual([
            {
                id: 1,
                user_id: 1,
                order_status: "delievered",
            },
        ]);
    });

    it("getProducts method should return the products in the order", async () => {
        await query(`DELETE FROM products`);
        await query(
            `INSERT INTO products (id, product_name, product_price, product_category) VALUES (1, 'test', 1, 'test'), (2, 'test2', 2, 'test2')`
        );
        await query(
            `INSERT INTO orders_products (order_id, product_id, quantity) VALUES (1, 1, 1), (1, 2, 2)`
        );

        const result = await store.getProducts(1);
        expect(result).toEqual([
            { id: 1, product_name: "test", product_price: 1, product_category: "test" },
            { id: 2, product_name: "test2", product_price: 2, product_category: "test2" },
        ]);
    });
});