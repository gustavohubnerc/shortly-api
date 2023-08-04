import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function createUser(req, res){
    const { name, email, password } = req.body;
    
    try {
        const userExists = await db.query("SELECT id FROM users WHERE email = $1", [email]);
        if(userExists) return res.status(409).send("User already exists");

        const hashPassword = bcrypt.hashSync(password, 10);
       
        await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hashPassword]);
        
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }

}