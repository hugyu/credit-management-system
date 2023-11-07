const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

// post请求req.query是拿不到数据的 要在req.body
router.post("/login", async (req, res) => {
  try {
    const {  username, password } = req.body;
    const createTableSql = `
        create table if not exists user (
            id int auto_increment not null,
            password char(10) not null,
            username char(50) not null,
            primary key (id)
        ) engine=innodb;
        `;
    await sqlQuery(createTableSql);
    // // 查询表中是否有用户名
    const sqlStr = `select username from user where username ='${username}'`;
    // result要么是空数组 要么就有值的数组
    const result = await sqlQuery(sqlStr);
    if (result.length) {
      //有对应的用户名
      const sqlStr2 = `select password from user where username = '${username}'`;
        const userInfoRes = await sqlQuery(sqlStr2);
      if (
        userInfoRes.length &&
        userInfoRes[0].password === password 
      ) {
        res.send({
          code: 1,
          message: "登录成功",
          data:[{username}]
        });
      
      } else {
        //登录失败
        res.send({
          code: 2,
          message: "用户名或密码错误",
        });
      }
    }
  } catch (err) {
    res.send({
      code: -1,
      message: "请求失败",
    });
  }
});
module.exports = router;
