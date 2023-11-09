const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");
const today = new Date()
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
router.get("/signIn", async (req, res) => {
  const { username, date, bgLevel } = req.query;
  try {
    const createTableSql = `
    CREATE TABLE IF NOT EXISTS userSignIn (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        credit INT NOT NULL DEFAULT 0,
        date DATE  NOT NULL,
        bgLevel DECIMAL(10, 2) NOT NULL DEFAULT 0
      ) ENGINE=InnoDB;      
    `;
      await sqlQuery(createTableSql);
      const dateQuery = `SELECT date FROM userSignIn WHERE date = '${formattedDate}'`
      const dateList = await sqlQuery(dateQuery);
      if (!dateList.length) {

        //说明没有签到过
        const sqlStr = `insert into userSignIn (username,credit,bgLevel,date) values("${username}", 1,${bgLevel},"${date}")  `;
        await sqlQuery(sqlStr);
        res.send({
          code: 1,
          message: "签到成功",
        });
      } else {
        res.send({
            code: 2,
            message: "你今天已经签到过了",
          });
      }
      
    
  } catch (err) {
    res.send({
      code: -1,
      message: "请求失败",
      data: err,
    });
  }
});
module.exports = router;