const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");
router.get("/buyItem", async (req, res) => {
  const { username, date, credit, itemName } = req.query;
  try {
    const createTableSql = `
    CREATE TABLE IF NOT EXISTS buyItem (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        credit INT NOT NULL DEFAULT 0,
        date DATE  NOT NULL,
        itemName VARCHAR(50) NOT NULL
      ) ENGINE=InnoDB;      
    `;
    await sqlQuery(createTableSql);
    const sqlStr = `insert into buyItem (username,credit,date,itemName) values("${username}", ${credit},"${date}","${itemName}")`;

    await sqlQuery(sqlStr);
    res.send({
      code: 1,
      message: "购买成功",
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
