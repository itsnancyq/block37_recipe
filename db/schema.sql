DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS users;

CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    title TEXT UNIQUE NOT NULL,
    instructions TEXT NOT NULL,
    prep_time INTEGER NOT NULL
);

CREATE TABLE ingredients(
    id SERIAL PRIMARY KEY,
    name text UNIQUE NOT NULL,
    quantity text NOT NULL,
    recipe_id INTEGER NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY.
    name text UNIQUE NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL
);