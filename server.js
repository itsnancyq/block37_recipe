import db from "#db/client";
import app from "./app.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const PORT = process.env.PORT ?? 3000;

await db.connect();

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`);
});

const verifyToken = () => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader.split(' ')[1];
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = decodedJWT
    next();
};

app.get("/", async (req, res, next) => {
    try{
        const allUsers = await client.query(`SELECT * FROM user`);
        
        if(!allUsers) 
            return res.status(404).send("Can't find users");

        res.status(200).json(allUsers);
    }catch(error){
        console.error(err)
        res.status(400).send("Can't find info");
    }
});

app.post("/register", async (req, res, next) => {
    const {name, email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await client.query(`INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;`,[name, email, hashedPassword]);

        if(!newUser)
            return res.status(401).send("Could not register new user");

        const token = jwt.sign({id: newUser.id, email: newUser.email}, process.env.JWT_SECRET);
        res.status(201).json(token);
    }catch(error){
        console.error(error);
        res.status(500).send("Error registering user");
    }
});

app.post("/login", async(req, res, next) => {
    const {email, password} = req.body;
    try{
        const userInfo = await client.query(` SELECT *
            FROM users 
            WHERE email = $1;`, [email]);

        const passwordMatch = await bcrypt.compare(password, userInfo.password);
        if(!passwordMatch) 
            return res.status(401).send("Not authorized");

        const token = jwt.sign({id: userInfo.id, email: userInfo.email});
        res.status(201).json(token);
    }catch(error){
        console.error("Could not login");
    }
});

app.get("/favorites", verifyToken, async (req, res, next)=>{
    try{
        const favorites = await client.query(`SELECT *
            FROM user
            WHERE favorite = true`);
        if(!favorites)
            return res.status(404).send("Can't find favorites");
        res.status(201).json(favorites);
    }catch(err){
        console.error(err);
        res.send("Error getting favorites");
    }
});

// 

