import pool from "/lib/pgdb";

export default async function handler(req, res) {
  try {
    let data = {};
    let result = await pool.query(`SELECT * FROM productcategory`);
    data.category = result.rows;
    result = await pool.query(`SELECT * FROM productgroup`);
    data.group = result.rows;
    result = await pool.query(`SELECT * FROM product`);
    data.product = result.rows;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: "系統錯誤" });
  }
}
