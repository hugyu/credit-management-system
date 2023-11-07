const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

router.get("/getUserInfo", async (req, res) => {
  const { username } = req.query;
  try {
    const createTableSql = `
    CREATE TABLE IF NOT EXISTS userInfo (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      userPhone VARCHAR(20) NOT NULL,
      address VARCHAR(100) NOT NULL,
      birthDate DATE  NOT NULL,
      gender ENUM('male', 'female', 'other') NOT NULL
  ) ENGINE=InnoDB;
    `;
    await sqlQuery(createTableSql);
    //查询表中是否有用户名
    const sqlStr = `select *  from userInfo where username = '${username}'`;
    // result要么是空数组 要么就有值的数组
    const result = await sqlQuery(sqlStr);
    if (!result.length) {
      //说明没有填写个人信息
      res.send({
        code: 2,
        message: "请填写个人信息",
      });
    } else {
      //填过了
      res.send({
        code: 1,
        message: "请求成功",
        data:result
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
