import pool from "/lib/pgdb";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const data = {};
        const id = req.query.id;
        let sql = `SELECT ARRAY_AGG(selectid) selectid FROM preparationdetail WHERE student_id=$1`;
        let result = await pool.query(sql, [id]);
        data.aptitude = result.rows[0];
        sql = `
         WITH parent_list AS (
            SELECT student_id, user_id parent_user_id, first_name, tel FROM parent_student_link
            INNER JOIN parent ON parent.id = parent_student_link.parent_id
            INNER JOIN "user" ON "user".id = parent.user_id
            WHERE student_id = $1
          )

          SELECT 
            student.id student_id, user_id, "user".first_name, "user".nick_name, "user".birthday::TEXT, "user".address, grade_id, city_id, dist_id, school_id, school_type_id, school_name,
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'parent_user_id', parent_list.parent_user_id,
                    'first_name', parent_list.first_name,
                    'tel', parent_list.tel
                )
            ) parent_list
          FROM student
          INNER JOIN "user" ON "user".id = student.user_id
          LEFT JOIN twschool ON twschool.id = student.school_id
          LEFT JOIN parent_list ON student.id = parent_list.student_id
          WHERE student.id = $1
          GROUP BY student.id, user_id, "user".first_name, "user".nick_name, "user".birthday, "user".address, grade_id, city_id, dist_id, school_id, school_type_id, school_name
          `;
        result = await pool.query(sql, [id]);
        data.student = result.rows[0];
        res.status(200).json(data);
      } catch (error) {
        res.status(400).json({ msg: "系統錯誤" });
      }
      break;

    case "PUT":
      try {
        const { select, userData } = req.body;
        await pool.query("BEGIN");
        // 基本資料
        await pool.query(`UPDATE student SET updated_at=now(), school_id=$1, grade_id=$2 WHERE id=$3`, [userData.school_id, userData.grade_id, userData.student_id]);
        await pool.query(`UPDATE "user" SET updated_at=now(), first_name=$1, nick_name=$2, address=$3, birthday=$4 WHERE id=$5`, [
          userData.first_name,
          userData.nick_name,
          userData.address,
          userData.birthday,
          userData.user_id
        ]);

        // 家長
        for (let parent of userData.parent_list) {
          await pool.query(`UPDATE "user" SET updated_at=now(), first_name=$1, tel=$2 WHERE id=$3`, [parent.first_name, parent.tel, parent.parent_user_id]);
        }

        // 性向
        await pool.query(`DELETE FROM preparationdetail WHERE student_id=$1`, [userData.student_id]);
        for (let item of select) {
          let sql = `INSERT INTO preparationdetail(student_id, selectid)VALUES ($1, $2);`;
          let params = [userData.student_id, item];
          await pool.query(sql, params);
        }
        await pool.query("COMMIT");
        res.status(200).json({ id: userData.student_id });
      } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "系統錯誤" });
      }
      break;

    case "POST":
      try {
        const { id, dataURL } = req.body;
        const sql = `INSERT INTO authorized_sign(student_id, sign) VALUES ($1, $2)`;
        let result = await pool.query(sql, [id, dataURL]);
        res.status(200).json(result.rows);
      } catch (error) {
        res.status(400).json({ msg: "系統錯誤" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
