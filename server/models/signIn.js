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
    // const newSql=`INSERT INTO userSignIn (username, credit, date, bgLevel)
    // SELECT 'h', 1, DATE_FORMAT(date, '%Y-%m-%d'), ROUND(RAND()*(5.6-3.9)+3.9, 2)
    // FROM (
    //     SELECT ADDDATE('2023-11-01', t4*1000 + t3*100 + t2*10 + t1) AS date
    //     FROM
    //         (SELECT 0 AS t1 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t1,
    //         (SELECT 0 AS t2 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t2,
    //         (SELECT 0 AS t3 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t3,
    //         (SELECT 0 AS t4 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t4
    //     WHERE ADDDATE('2023-11-01', t4*1000 + t3*100 + t2*10 + t1) <= '2023-11-30'
    // ) AS dates;
    // `
    // await sqlQuery(newSql);

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