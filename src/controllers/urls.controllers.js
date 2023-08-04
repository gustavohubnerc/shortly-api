import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res){
    const { url } = req.body;
    
    try {
        const authorization = req.headers.authorization;
        if(!authorization) return res.status(401).send("Unauthorized");

        const token = authorization.replace("Bearer ", "");

        const user = await db.query(`SELECT "userId" FROM sessions WHERE token = $1`, [token]);
        if(user.rowCount === 0) return res.status(401).send("Unauthorized");
        
        const shortUrl = nanoid(8);

        const userId = user.rows[0].userId;

        const insertUrl = await db.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id`, [url, shortUrl, userId]);
        const id = insertUrl.rows[0].id;

        res.status(201).send({id, shortUrl});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getUrlById(req, res){
    const { id } = req.params;
    
    try {
        const url = await db.query(`SELECT id, url, "shortUrl" FROM urls WHERE id = $1`, [id]); 
        if(url.rowCount === 0) return res.status(404).send("Url not found");

        res.status(200).send(url.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function openShortUrl(req, res){
    const { shortUrl } = req.params;

    try {
        const url = await db.query(`SELECT url, id FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        if(url.rowCount === 0) return res.status(404).send("Url not found");

        await db.query(`UPDATE urls SET visits = visits + 1 WHERE id = $1`, [url.rows[0].id]);

        res.redirect(url.rows[0].url);
    } catch (error) {
        res.status(500).send(error.message);
    }
}