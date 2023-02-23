import { query } from "../../database";
import UserStore from "../../models/User";
import { unsetTables } from "../../utils/unset_Tables";

const store = new UserStore();

describe("User Model", () => {
    beforeAll(async () => {
        await unsetTables();
    });

    beforeEach(async () => {
        await query(
            `INSERT INTO users (id, "first_name", "last_name", password_hashed, username) VALUES (1,'John', 'Doe', 'password', 'john')`
        );
    });

    afterEach(async () => {
        await query("DELETE FROM users");
    });

    it("should return a user", async () => {
        expect(store.show).toBeDefined();

        const result = await store.show(1);
        expect(result.first_name).toEqual("John");
        expect(result.last_name).toEqual("Doe");
    });

    it("should return a list of users", async () => {
        expect(store.index).toBeDefined();

        const result = await store.index();
        expect(result.length).toEqual(1);
    });

    it("should create a user", async () => {
        await query("DELETE FROM users");
        expect(store.create).toBeDefined();

        const result = await store.create({
            first_name: "Jane",
            last_name: "Doe",
            username: "jane",
            password: "password",
        });
        expect(result.first_name).toEqual("Jane");
        expect(result.last_name).toEqual("Doe");
    });

    it("should throw error if username is taken already", async () => {
        await expectAsync(
            store.create({
                username: "john",
                first_name: "name",
                last_name: "name",
                password: "password",
            })
        ).toBeRejected();
    });

    afterAll(async () => await unsetTables());
});