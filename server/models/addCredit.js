const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");
router.get("/addCredit", async (req, res) => {
  const { username, date, credit } = req.query;
  try {
    const createTableSql = `
    CREATE TABLE IF NOT EXISTS addCredit (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        credit INT NOT NULL DEFAULT 0,
        date DATE  NOT NULL
      ) ENGINE=InnoDB;      
    `;
    await sqlQuery(createTableSql);
    //说明没有签到过
    const sqlStr = `insert into addCredit (username,credit,date) values("${username}", ${credit},"${date}")`;
    await sqlQuery(sqlStr);
    res.send({
      code: 1,
      message: "积分添加成功",
    });
  } catch (err) {
    res.send({
      code: -1,
      message: "请求失败",
      data: err,
    });
  }
});
module.exports = router;
