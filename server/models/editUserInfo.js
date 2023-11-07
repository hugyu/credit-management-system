const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

// post请求req.query是拿不到数据的 要在req.body
router.post("/editUserInfo", async (req, res) => {
  try {
    const { username } = req.body;
    //查询表中是否有用户名
    const sqlStr = `select username  from user where username = '${username}'`;
    // result要么是空数组 要么就有值的数组
    const result = await sqlQuery(sqlStr);
    if (result.length) {
      //有对应的用户名 执行update操作
     
    } else {
      //没有用户名 执行insert操作
      const insertUser = `insert into user (username,password) values("${username}","${password}")`;
      await sqlQuery(insertUser);
      res.send({
        code: 1,
        message: "注册成功",
        result: {
            username,
            password,
        },
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
