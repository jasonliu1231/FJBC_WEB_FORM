import pool from "/lib/pgdb";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const user_id = req.headers.user_id;
      const { product_id, quantity, course_no, tutoring_id, remark } = req.body;
      try {
        await pool.query("BEGIN");
        let sql = `
            SELECT 
                LEAST(stock, t1.max_quantity - SUM(CASE WHEN ld."return" = false THEN ld.quantity ELSE 0 END)) min
            FROM (
                SELECT 
                    l.max_quantity,
                    l.product_id,
                    l.tutoring_id,
                    SUM(CASE WHEN pd.state = true THEN pd.quantity ELSE -pd.quantity END) stock
                FROM tutoring_lend l
                INNER JOIN tutoring_product_detail pd ON pd.tutoring_product_id = l.product_id AND pd.tutoringid = l.tutoring_id
                WHERE l.enable = true
                GROUP BY l.max_quantity, l.product_id, l.tutoring_id
            ) t1
            LEFT JOIN tutoring_lend_detail ld ON ld.product_id = t1.product_id AND ld.tutoring_id = t1.tutoring_id
            WHERE t1.product_id = $1
            GROUP BY t1.max_quantity, t1.stock
        `;
        let params = [product_id];
        let result = await pool.query(sql, params);
        if (quantity > result.rows[0].min) {
          res.status(400).json({ msg: "閑置過長，租借數量改變" });
          return;
        }

        sql = `
            INSERT INTO tutoring_lend_detail(product_id, tutoring_id, quantity, create_by, update_by, remark, course_no) 
            VALUES ($1, $2, $3, $4, $4, $5, $6);
        `;
        params = [product_id, tutoring_id, quantity, user_id, remark, course_no];
        result = await pool.query(sql, params);

        sql = `
            INSERT INTO tutoring_product_detail(tutoring_product_id, state, quantity, money, tutoringid, remark, usage, create_by, update_by)
            VALUES ($1, false, $2, 0, $3, $4, 10, $5, $5)
        `;
        params = [product_id, quantity, tutoring_id, remark, user_id];
        result = await pool.query(sql, params);

        await pool.query("COMMIT");
        res.status(200).json({});
      } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "系統錯誤" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
