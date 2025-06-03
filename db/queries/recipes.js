import db from "#db/client";

// returns all recipes
export async function getRecipes() {
    const sql = `
        SELECT *
        FROM recipes;
    `;

    const {rows: recipes} = await db.query(sql);
    return recipes;
}

// returns recipes by (ID)
export async function getRecipeById(id) {
    const sql = `
        SELECT *
        FROM recipes
        WHERE id = $1;
    `;

    const {rows: recipe} = await db.query(sql, [id]);
    return recipe[0];
}

// creates recipe (data)
export async function createRecipe({title, instructions, prep_time}) {
    const sql = `
     INSERT INTO recipes (title, instructions, prep_time)
     VALUES ($1, $2, $3)
     RETURNING *;
    `;

    const {rows: recipe} = await db.query(sql, [title, instructions, prep_time]);
    return recipe;
}

// updates recipes (ID, data)
export async function updateRecipe({id, title, instructions, prep_time}) {
    const sql = `
        UPDATE recipes
        SET title = $1, instructions = $2, prep_time = $3
        WHERE id = $4
        RETURNING *;
    `;

    const {rows: recipe} = await db.query(sql, [title, instructions, prep_time, id]);
    return recipe[0];
}

// deletes item by (ID) 
export async function deleteRecipe(id) {
    const sql = `
        DELETE FROM recipes
        WHERE id = $1
        RETURNING *;
    `;

    const {rows: recipe} = await db.query(sql, [id]);
    return recipe;
}