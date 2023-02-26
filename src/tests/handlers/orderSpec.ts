import request from "supertest";
import app from "../../app";
import { query } from "../../database";
import UserStore, { UserWithId } from "../../models/User";
import { unsetTables } from "../../utils/unset_Tables";

let authedUser: UserWithId;
let token: string;

describe("/orders route", () => {
    beforeAll(async () => {
        await unsetTables();
        const store = new UserStore();

        const user = {
            first_name: "John",
            last_name: "Doe",
            username: "john",
            password: "password",
        };

        authedUser = await store.create(user);

        const res = await request(app).post("/users/authenticate").send({
            username: "john",
            password: "password",
        });

        token = res.body.token;
    });

    beforeEach(async () => {
        await query(
            `INSERT INTO orders (id, user_id, order_status) VALUES (1, $1, 'active')`,
            [authedUser.id]
        );
    });

    afterEach(async () => {
        await query("DELETE FROM orders");
        await query("DELETE FROM products");
    });

    it("GET /", async () => {
        const result = await request(app)
            .get("/orders")
            .set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(200);
        expect(result.body.length).toEqual(1);
    });

    it("GET /:id", async () => {
        const result = await request(app)
            .get("/orders/1")
            .set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(200);
        expect(result.body.user_id).toEqual(authedUser.id);
    });

    it("POST /", async () => {
        await query("DELETE FROM orders");

        const result = await request(app)
            .post("/orders")
            .set("Authorization", `Bearer ${token}`)
            .send({
                user_id: authedUser.id,
                order_status: "active",
            });

        expect(result.status).toEqual(200);
        expect(result.body.user_id).toEqual(authedUser.id);
    });

    it("PUT /:id", async () => {
        const result = await request(app)
            .put("/orders/1")
            .set("Authorization", `Bearer ${token}`)
            .send({
                order_status: "complete",
            });

        expect(result.status).toEqual(200);
        expect(result.body.order_status).toEqual("complete");
    });

    it("DELETE /:id", async () => {
        const result = await request(app)
            .delete("/orders/1")
            .set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(204);
    });

    it("POST /:id/products", async () => {
        await query(
            `INSERT INTO products (id, product_name, product_price, product_category) VALUES (1, 'Mango', 257.99, 'fruits')`
        );

        const result = await request(app)
            .post("/orders/1/products")
            .set("Authorization", `Bearer ${token}`)
            .send({
                productId: 1,
                quantity: 2,
            });

        expect(result.status).toEqual(200);
        expect(result.body.quantity).toEqual(2);
    });

    it("GET /:id/products", async () => {
        await query(
            `INSERT INTO products (id, product_name, product_price, product_category) VALUES (1, 'Mango', 257.99, 'fruits')`
        );

        await query(
            `INSERT INTO orders_products (order_id, product_id, quantity) VALUES (1, 1, 2)`
        );

        const result = await request(app)
            .get("/orders/1/products")
            .set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(200);
        expect(result.body.length).toEqual(1);
    });

    it("GET /current", async () => {
        const result = await request(app)
            .get("/orders/current")
            .set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(200);
        expect(result.body).toEqual({ id: 1, user_id: 1, order_status: "active" });
    });

    it("GET /complete", async () => {
        const result = await request(app)
            .get("/orders/complete")
            .set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(200);
        expect(result.body).toEqual([]);
    });
});