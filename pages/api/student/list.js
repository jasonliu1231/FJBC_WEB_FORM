import pool from "/lib/pgdb";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const sql = `
            SELECT s.id, ENCODE(u.photo, 'base64') photo, u.first_name, u.nick_name, u.tel, ts.school_name, tg.grade_name FROM student s
            INNER JOIN "user" u ON s.user_id = u.id
            LEFT JOIN twschool ts ON s.school_id = ts.id
            LEFT JOIN twgrade tg ON s.grade_id = tg.id
            WHERE s.student_status_id = 1 ORDER BY tg.id
        `;

      try {
        const result = await pool.query(sql);
        res.status(200).json(result.rows);
      } catch (error) {
        res.status(400).json({ msg: "資料撈取失敗" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
