import pool from "/lib/pgdb";

export default async function Home(req, res) {
  try {
    const sql = `INSERT INTO attendance_ticket(status, attendance_time, attendance_date, deadline) 
                    VALUES ('離校', now(), now(), now() + INTERVAL '3 minutes') RETURNING id`;
    const result = await pool.query(sql);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ msg: "資料撈取失敗" });
  }
}
