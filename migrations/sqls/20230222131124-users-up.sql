-- Table Definition
CREATE TABLE "users" (
	id SERIAL PRIMARY KEY,
    "first_name" varchar(100) NOT NULL,
    "last_name" varchar(100) NOT NULL,
    username varchar(100) NOT NULL,
    password_hashed varchar(255) NOT NULL
);