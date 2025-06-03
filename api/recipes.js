import express from "express";
const router = express.Router();
export default router;

import { getRecipes, createRecipe, getRecipeById, updateRecipe, deleteRecipe } from "#db/queries/recipes";

router.get("/", async(req, res) => {
    const recipes = await getRecipes();
    return res.send(recipes);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    if(!Number.isInteger(id) && id < 0){
        return res.status(400).send({error: "Please send a valid recipe."});
    };

    const recipe = await getRecipeById(id);
    if(!recipe){
        return res.status(404).send({error: "Recipe does not exist!"});
    };
    res.send(recipe);
});

router.post("/", async (req, res)=> {
    if(!req.body){
        return res.status(400).send({error: "Missing req.body"});
    };

    const {title, instructions, prep_time} = req.body;
    if(!title || !instructions || !prep_time){
        return res.status(400).send({error: "Missing requires params."});
    };

    const recipe = await createRecipe({title, instructions, prep_time});
    res.status(201).send(recipe);
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    if(!req.body){
        return res.status(400).send({error: "Missing req.body"});
    };

    const {title, instructions, prep_time} = req.body;
    if(!title || !instructions || !prep_time){
        return res.status(404).send({error: "Missing requires fields."});
    };

    if(!Number.isInteger(id) && id < 0){
        return res.status(400).send({error: "Please send valid recipe."});
    };

    const recipe = await getRecipeById(id);
    if(!recipe){
        return res.status(404).send({error: "Recipe does not exist."});
    };

    const updated = await updateRecipe({id, title, instructions, prep_time});
    res.status(200).send(updated);
});

router.delete("/", async (req, res) => {
    const id = req.params.id;
    if(!Number.isInteger(id) && id < 0){
        res.status(400).send({error: "Please send a valid recipe."});
    };

    const recipe = await getRecipeById(id);
    if(!recipe){
        return res.status(404).send({error: "Recipe not found."});
    };

    const deletes = await deleteRecipe(id);
    if(!deletes){
        res.status(404).send({error: "Recipe does not exist."});
    };
    res.sendStatus(204);
});