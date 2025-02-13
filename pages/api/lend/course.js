import pool from "/lib/pgdb";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      let sql = `SELECT course_name, course_no FROM course WHERE is_course = true AND is_visable = true`;

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
