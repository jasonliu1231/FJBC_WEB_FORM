import pool from "/lib/pgdb";

export default async function handler(req, res) {
  const id = req.query.id;
  const { preparation, preparationdetail, signature } = req.body;
  switch (req.method) {
    case "GET":
      try {
        let sql = `SELECT * FROM preparation`;
        let params = [];
        if (id) {
          let data = {};
          await pool.query("BEGIN");
          sql += ` WHERE id=$1`;
          params.push(id);
          let result = await pool.query(sql, params);
          data.entity = result.rows[0];
          sql = `SELECT selectid FROM preparationdetail WHERE preparationid=$1`;
          result = await pool.query(sql, params);
          data.detail = result.rows;
          await pool.query("COMMIT");
          res.status(200).json(data);
        } else {
          sql += ` WHERE isclose=false ORDER BY CASE WHEN updatedon IS NULL THEN 1 ELSE 0 END, updatedon DESC`;
          let result = await pool.query(sql);
          res.status(200).json(result.rows);
          return;
        }
      } catch (error) {
        res.status(400).json({ msg: "系統錯誤" });
      }
      break;
    case "PUT":
      try {
        let sql = `UPDATE preparation
                SET chinese_name=$1, english_name=$2, school_id=$3, grade_id=$4, gender=$5, birthday=$6, address=$7, mother_name=$8, 
                mother_phone=$9, father_name=$10, father_phone=$11, emergency_contact_name=$12, emergency_contact=$13, signature=$14, remark=$15, 
                meeting=$16, exam=$17, admission=$18, trialclass=$20, updatedon=now() 
                WHERE id=$19;`;
        let params = [
          preparation.chinese_name,
          preparation.english_name,
          preparation.school_id,
          preparation.grade_id,
          preparation.gender,
          preparation.birthday,
          preparation.address,
          preparation.mother_name,
          preparation.mother_phone,
          preparation.father_name,
          preparation.father_phone,
          preparation.emergency_contact_name,
          preparation.emergency_contact,
          signature,
          preparation.remark,
          preparation.meeting,
          preparation.exam,
          preparation.admission,
          preparation.id,
          preparation.trialclass,
        ];
        await pool.query("BEGIN");
        await pool.query(sql, params);
        await pool.query(`DELETE FROM preparationdetail WHERE preparationid=$1`, [preparation.id]);
        for (let item of preparationdetail) {
          sql = `INSERT INTO preparationdetail(preparationid, selectid)VALUES ($1, $2);`;
          params = [preparation.id, item];
          await pool.query(sql, params);
        }
        await pool.query("COMMIT");
        res.status(200).json({});
      } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "系統錯誤" });
      }
      break;
    case "POST":
      try {
        let sql = "";
        let params = [];
        await pool.query("BEGIN");
        sql = `INSERT INTO preparation(chinese_name, english_name, school_id, grade_id, gender, birthday, address, mother_name, mother_phone, 
                father_name, father_phone, emergency_contact_name, emergency_contact, signature, meeting, exam, tutoring_id, admission, remark, trialclass, updatedon) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16 ,$17 ,$18, $19, $20, now()) RETURNING id;`;
        params = [
          preparation.chinese_name,
          preparation.english_name,
          preparation.school_id,
          preparation.grade_id,
          preparation.gender,
          preparation.birthday,
          preparation.address,
          preparation.mother_name,
          preparation.mother_phone,
          preparation.father_name,
          preparation.father_phone,
          preparation.emergency_contact_name,
          preparation.emergency_contact,
          signature,
          preparation.meeting,
          preparation.exam,
          preparation.tutoring_id,
          preparation.admission,
          preparation.remark,
          preparation.trialclass,
        ];
        let result = await pool.query(sql, params);
        for (let item of preparationdetail) {
          sql = `INSERT INTO preparationdetail(preparationid, selectid)VALUES ($1, $2);`;
          params = [result.rows[0].id, item];
          await pool.query(sql, params);
        }

        await pool.query("COMMIT");
        res.status(200).json({ id: result.rows[0].id });
      } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "系統錯誤" });
      }
      break;
  }
}
