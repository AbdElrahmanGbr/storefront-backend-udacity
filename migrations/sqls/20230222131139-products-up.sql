-- Table Definition
CREATE TABLE "products" (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_price NUMERIC NOT NULL,
    product_category VARCHAR(50) NOT NULL DEFAULT 'other'
);