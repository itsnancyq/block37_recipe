import express from "express";
const app = express();
import recipesRouter from "./api/recipes.js";
import ingredientsRouter from "./api/ingredients.js";
export default app;

app.use(express.json());

app.use("/recipes", recipesRouter);
app.use("/ingredients", ingredientsRouter);

app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).send("Sorry! Something went wrong! :0(");
});