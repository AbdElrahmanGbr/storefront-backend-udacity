-- Table Definition
CREATE TABLE "orders" (
	id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_status VARCHAR(50) CHECK ("order_status" IN('pending', 'delievered')) NOT NULL DEFAULT 'pending'
);