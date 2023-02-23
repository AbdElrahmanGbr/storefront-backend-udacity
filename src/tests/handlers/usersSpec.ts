import request from "supertest";
import app from "../../app";
import UserStore from "../../models/User";
import { unsetTables } from "../../utils/unset_Tables";

const store = new UserStore();

const user = {
    first_name: "John",
    last_name: "Doe",
    username: "john",
    password: "password",
};

const user2 = {
    first_name: "Jane",
    last_name: "Doe",
    username: "jane",
    password: "password",
};

let token: string;

describe("/users route", () => {
    beforeAll(async () => {
        await store.create(user);
    });

    it("POST /authenticate", async () => {
        const result = await request(app)
            .post("/users/authenticate")
            .send({ username: "john", password: "password" });

        expect(result.status).toEqual(200);
        expect(result.body.token).toBeDefined();

        token = result.body.token;
    });

    it("GET /", async () => {
        const result = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(200);
        expect(result.body.length).toEqual(1);
    });

    it("GET /:id", async () => {
        const result = await request(app)
            .get(`/users/1`)
            .set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(200);
        expect(result.body.first_name).toEqual("John");
    });

    it("POST /", async () => {
        const result = await request(app).post("/users").send(user2);

        expect(result.status).toEqual(201);
        expect(result.body.first_name).toEqual("Jane");
    });

    afterAll(async () => {
        await unsetTables();
    });
});