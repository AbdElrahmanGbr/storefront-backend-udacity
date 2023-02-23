import { query } from "../../database";
import ProductStore from "../../models/Product";
import { unsetTables } from "../../utils/unset_Tables";

const store = new ProductStore();

describe("Product Model", () => {
    beforeAll(async () => {
        await unsetTables();
    });

    beforeEach(async () => {
        await query(
            `INSERT INTO products (id, product_name, product_price, product_category) VALUES (1, 'Mango', 257.99, 'fruits')`
        );
    });

    afterEach(async () => {
        await query("DELETE FROM products");
    });

    it("index method should return a list of products", async () => {
        const result = await store.index();
        expect(result).toEqual([
            {
                id: 1,
                product_name: "Mango",
                product_price: 257.99,
                product_category: "fruits",
            },
        ]);
    });

    it("show method should return the correct product", async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            product_name: "Mango",
            product_price: 257.99,
            product_category: "fruits",
        });
    });

    it("create method should add a product", async () => {
        await query("DELETE FROM products");

        const result = await store.create({
            product_name: "Apple",
            product_price: 100.99,
            product_category: "fruits",
        });
        expect(result.product_name).toEqual("Apple");
        expect(result.product_price).toEqual(100.99);
        expect(result.product_category).toEqual("fruits");
    });

    it("delete method should remove the product", async () => {
        await store.delete(1);
        const result = await store.index();
        expect(result).toEqual([]);
    });

    it("update method should update the product", async () => {
        await store.update(1, {
            product_name: "Watermelon",
            product_price: 100.99,
            product_category: "fruits",
        });
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            product_name: "Watermelon",
            product_price: 100.99,
            product_category: "fruits",
        });
    });

    it("should get the correct product by category", async () => {
        const result = await store.category("fruits");
        expect(result).toEqual([
            {
                id: 1,
                product_name: "Mango",
                product_price: 257.99,
                product_category: "fruits",
            },
        ]);
    });
});
