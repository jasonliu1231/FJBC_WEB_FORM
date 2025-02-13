import pool from "../../lib/pgdb";
import { checkPerm } from "./check";
import axios from "axios";

export default async function home(req, res) {
  const user_id = req.headers.user_id;
  try {
    const { tutoringid, className, deadline, reason, createby, products } = req.body;
    let params = [tutoringid, className, deadline, createby, reason, user_id];
    // 傳送文字
    const d = new Date(deadline);
    const date = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    let message = `\n有一張新的採購單申請\n申請單位：${tutoringid == 1 ? "多易" : tutoringid == 2 ? "艾思" : "華而敦"}\n申請人：${createby}\n需求日期：${date}\n明細：\n`;
    products.forEach((element, index) => {
      if (index < 2) {
        message += `${element.name} x${element.quantity}${element.unit}\n`;
      } else if (index == 2) {
        message += "....";
      }
    });
    await pool.query("BEGIN");
    let result = await pool.query(`INSERT INTO purchase(tutoringid, class, deadline, createby, createdon, reason, create_id) VALUES ($1, $2, $3, $4, now(), $5, $6) RETURNING id;`, params);
    for (let item of products) {
      params = [result.rows[0].id, item.name, item.quantity, item.unit, item.specification, item.price, item.remark];
      await pool.query(`INSERT INTO purchasedetail(purchaseid, name, quantity, remainder, unit, specification, price, remark) VALUES ($1, $2, $3, $3, $4, $5, $6, $7);`, params);
    }
    await pool.query(`INSERT INTO notifications(type, type_detail, content) VALUES ($1, $2, $3);`, [1, "初審", message]);
    await pool.query("COMMIT");
    LineAlert(message);
    sendNotification(message);
    res.status(200).json([]);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "系統錯誤，請重新嘗試，如一直無法送出請聯繫資訊部門！" });
  }
}

async function LineAlert(message) {
  try {
    await axios.post(
      "https://notify-api.line.me/api/notify",
      new URLSearchParams({
        message: message
      }),
      {
        headers: {
          Authorization: `Bearer ${process.env.PURCHASE_TOKEN}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    console.log("Line 通知已發送");
  } catch (error) {
    console.error("發送 Line 通知時出錯:", error);
  }
}

async function sendNotification(message) {
  try {
    await axios.post("https://tutoring.fjbcgroup.com/fjbc_tutoring_api/notification/type", JSON.stringify({ type: [1], title: "採購單初審", message: message }), {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("notification 通知已發送");
  } catch (error) {
    console.error("發送 notification 通知時出錯:", error);
  }
}
