import pool from "/lib/pgdb";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const keyword = req.body.keyword;
      let sql = `
            SELECT 
                t1.product_id, t1.name, t1.tutoring_id,
                LEAST(stock,t1.max_quantity - SUM(CASE WHEN ld."return" = false THEN ld.quantity ELSE 0 END)) min
            FROM (
                SELECT 
                    p.id product_id, p.name, l.tutoring_id,
                    SUM(CASE WHEN pd.state = true THEN pd.quantity ELSE -pd.quantity END) stock,
                    l.max_quantity
                FROM tutoring_lend l
                INNER JOIN tutoring_product p ON l.product_id = p.id
                INNER JOIN tutoring_product_detail pd ON pd.tutoring_product_id = l.product_id AND pd.tutoringid = l.tutoring_id
                WHERE l.enable = true
                GROUP BY p.id, p.name, l.tutoring_id, l.max_quantity
            ) t1
            LEFT JOIN tutoring_lend_detail ld ON ld.product_id = t1.product_id AND ld.tutoring_id = t1.tutoring_id
            WHERE name LIKE $1
            GROUP BY t1.product_id, t1.name, t1.tutoring_id, t1.max_quantity, t1.stock
            HAVING LEAST(stock, t1.max_quantity - SUM(CASE WHEN ld."return" = false THEN ld.quantity ELSE 0 END)) > 0
      `;

      try {
        const result = await pool.query(sql, [`%${keyword}%`]);
        res.status(200).json(result.rows);
      } catch (error) {
        res.status(400).json({ msg: "資料撈取失敗" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
