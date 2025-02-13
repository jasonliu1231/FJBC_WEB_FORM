import pool from "../../lib/pgdb";

export async function checkPerm(id, uuid) {
  const sql = `SELECT * FROM user_perm_link upl
            LEFT JOIN perm p ON p.id = upl.perm_id
            LEFT JOIN permdetail pd ON p.id = pd.permid
            WHERE upl.user_id=$1 AND (pd.uuid=$2 OR p.type=0)`;
  try {
    const result = await pool.query(sql, [id, uuid]);
    if (result.rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
