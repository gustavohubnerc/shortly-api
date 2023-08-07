import { db } from "../database/database.connection.js";

export async function getUserInfo(req, res){
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).send("Unauthorized");
    try {
        const token = authorization.replace("Bearer ", "");

        const user = await db.query(`SELECT "userId" FROM sessions WHERE token = $1`, [token]); 
        if (user.rowCount === 0) return res.status(401).send('User not found');

        const userName = await db.query(`SELECT name FROM users WHERE id = $1`, [user.rows[0].userId]);

        const visitors = await db.query(`SELECT SUM(visits) AS totalviews FROM urls WHERE "userId" = $1`, [user.rows[0].userId]);
        const visitCount = visitors.rows[0].totalviews;

        const urls = await db.query(`SELECT id, url, "shortUrl" FROM urls WHERE "userId" = $1`, [user.rows[0].userId]);

        const shortenedUrls = urls.rows.map((url) => ({
            id: url.id,
            shortUrl: url.shortUrl,
            url: url.url,
            visitors: url.visits
        }));

        const userInfo = {
            id: user.rows[0].userId,
            name: userName.rows[0].name,
            visitCount,
            shortenedUrls
        };

        res.status(200).send(userInfo);
    } catch (error) {
        res.status(500).send(error.message);
    }
}