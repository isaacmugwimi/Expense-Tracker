import { sql } from "../config/db.js";
export async function getLast5transactions(userId) {
  const result = await sql`
        SELECT * FROM(
            SELECT
                id, 
                'income' AS type,
                source As description,
                amount,
                date
            FROM income WHERE user_id =${userId}

                UNION ALL
            SELECT 
                id,
                'expense' AS type,
                category AS description,
                amount,
                date
            FROM expense WHERE user_id =${userId}
        )
            AS COMBINED
            ORDER BY date DESC
            LIMIT 5

`;

  return result;
}
