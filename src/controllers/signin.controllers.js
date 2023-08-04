import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function signIn(req, res){
    const { email, password } = req.body;

    try {
        const user = await db.query(`SELECT email, password FROM users WHERE email = $1`, [email]);
        if(!user.rows[0]) return res.status(401).send("User not found");

        const validPassword = bcrypt.compareSync(password, user.rows[0].password);
        if(!validPassword) return res.status(401).send("Invalid password");

        const token = uuidv4();

        await db.query(`INSERT INTO sessions (token) VALUES ($1)`, [token]);
        
        res.status(200).send({token: token});
    } catch (error) {
        res.status(500).send(error.message);
    }
}