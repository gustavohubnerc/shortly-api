import { db } from "../database/database.connection.js";

export async function usersRanking(req, res) {
    try {
        const userListQuery = `
            SELECT
                usr.id AS "id",
                usr.name,
                COALESCE(SUM(urls.visits), 0) AS "visitCount",
                COALESCE(COUNT(urls.id), 0) AS "linksCount"
            FROM
                users usr
            LEFT JOIN
                sessions s ON usr.id = s."userId"
            LEFT JOIN
                urls ON usr.id = urls."userId"
            GROUP BY
                usr.id, usr.name
            ORDER BY
                "visitCount" DESC
            LIMIT
                10;
        `;
        
        const userList = await db.query(userListQuery);

        const formattedUserList = userList.rows.map(user => ({
            id: user.id,
            name: user.name,
            linksCount: user.linksCount,
            visitCount: user.visitCount
        }));

        res.status(200).json(formattedUserList);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
