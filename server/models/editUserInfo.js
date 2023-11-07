const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

// post请求req.query是拿不到数据的 要在req.body
router.post("/editUserInfo", async (req, res) => {
  try {
    const { username,userPhone,birthDate,gender,address } = req.body;
    //查询表中是否有用户名
    const sqlStr = `select username  from userInfo where username = '${username}'`;
    // result要么是空数组 要么就有值的数组
    const result = await sqlQuery(sqlStr);
    if (result.length) {
      //有对应的用户名 执行update操作
      const updateuserInfo = `update userInfo set userPhone="${userPhone}",birthDate="${birthDate}",gender="${gender}",address="${address}" where username = '${username}'`
      await sqlQuery(updateuserInfo);
      res.send({
        code: 1,
        message: "修改成功",
      });
    } else {
      //没有用户名 执行insert操作
      const insertUserInfo = `insert into userInfo (userPhone,birthDate,gender,address) values("${userPhone}","${birthDate}","${gender}","${address}") where username = '${username}'`;
      await sqlQuery(insertUserInfo);
      res.send({
        code: 1,
        message: "编辑成功",
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
