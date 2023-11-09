const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");
router.get("/getBuyItem", async (req, res) => {
  const { username } = req.query;
  try {
    //说明没有签到过
    const sqlStr = `select credit  from buyItem where username = '${username}' `;
      const creditList = await sqlQuery(sqlStr);
      if (!creditList.length) {
        res.send({
            code: -1,
            message: "未购买过商品",
          });
      } else {
        res.send({
            code: 1,
            message: "请求成功",
            data:creditList
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
