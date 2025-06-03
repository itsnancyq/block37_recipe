import express from "express";
const router = express.Router();
export default router;

import { getIngredients, getIngredientById, createIngredient, updateIngredient, deleteIngredient } from "#db/queries/ingredients";

router.get("/ingredients")(async(req, res) => {
    const ingredients = await getIngredients();
    return res.send(ingredients);
});

router.get("/ingredients/:id")(async (req, res) => {
    const id = req.params.id;
    if(!Number.isInteger(id)){
        return res.status(400).send({error: "Please send a valid ingredient."});
    };

    const ingredient = await getIngredientById(id);
    if(!ingredient){
        return res.status(404).send({error: "Ingredient does not exist!"});
    };
    res.send(ingredient);
});

router.post("/ingredients")(async (req, res)=> {
    if(!req.body){
        return res.status(400).send({error: "Missing req.body"});
    };

    const {name, quantity, recipe_id} = req.body;
    if(!name || !quantity || !recipe_id){
        return res.status(400).send({error: "Missing requires params."});
    };

    const ingredient = await createIngredient({name, quantity, recipe_id});
    res.status(201).send(ingredient);
});

router.put("/ingredients/:id")(async (req, res) => {
    const id = req.params.id;
    if(!req.body){
        return res.status(400).send({error: "Missing req.body"});
    };

    const {name, quantity, recipe_id} = req.body;
    if(!name || !quantity || !recipe_id){
        return res.status(404).send({error: "Missing requires fields."});
    };

    if(!Number.isInteger(id)){
        return res.status(400).send({error: "Please send valid ingredient."});
    };

    const ingredient = await getIngredientById(id);
    if(!ingredient){
        return res.status(404).send({error: "Ingredient does not exist."});
    };

    const updated = await updateIngredient({name, quantity, recipe_id});
    res.status(200).send(updated);
});

router.delete("/ingredients")(async (req, res) => {
    const id = req.params.id;
    if(!Number.isInteger(id)){
        res.status(400).send({error: "Please send a valid ingredient."});
    };

    const ingredient = await getIngredientById(id);
    if(!ingredient){
        return res.status(404).send({error: "Ingredient not found."});
    };

    const deletes = await deleteIngredient(id);
    if(!deletes){
        res.status(404).send({error: "Ingredient does not exist."});
    };
    res.sendStatus(204);
});


