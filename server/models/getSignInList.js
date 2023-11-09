const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

router.get("/getSignInList", async (req, res) => {
  const { username } = req.query;
  try {
    //查询表中的积分记录
    const sqlStr = `select *  from userSignIn where username = '${username}'`;
    // result要么是空数组 要么就有值的数组
    const result = await sqlQuery(sqlStr);
   
    if (!result.length) {
      //说明没有签到或者记录过
      res.send({
        code: 2,
        message: "还没有积分记录哦",
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
