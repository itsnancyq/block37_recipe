import db from "#db/client";

// returns all ingredients
export async function getIngredients() {
    const sql = `
        SELECT *
        FROM ingredients;
    `;

    const {rows: ingredients} = await db.query(sql);
    return ingredients;
}

// returns ingredient by (id)
export async function getIngredientById(id) {
    const sql = `
        SELECT *
        FROM ingredients
        WHERE id = $1;
    `;

    const {rows: ingredient} = await db.query(sql, [id]);
    return ingredient[0];
}

// creates an ingredient (data)
export async function createIngredient({name, quantity, recipe_id}) {
    const sql = `
        INSERT INTO ingredients (name, quantity, recipe_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    const {rows: ingredient} = await db.query(sql, [name, quantity, recipe_id]);
    return ingredient;
}

// updates an ingredient by (ID, data)
export async function updateIngredient({id, name, quantity, recipe_id}) {
    const sql = `
        UPDATE ingredients
        SET name = $1, quantity = $2, recipe_id = $3
        WHERE id = $4
        RETURNING *;
    `

    const {rows: ingredient} = await db.query(sql, [name, quantity, recipe_id, id]);
    return ingredient[0];
}

// deletes an ingredient by (ID)
export async function deleteIngredient(id) {
    const sql = `
        DELETE FROM ingredient
        WHERE id = $1
        RETURNING *;
    `

    const {rows: ingredient} = await db.query(sql, [id]);
    return ingredient;
}


