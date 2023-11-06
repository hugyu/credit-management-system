const express = require("express");
const cors = require('cors');
const app = express(); //实例化一个对象

const models = require("./models");
app.use(cors({
    origin: 'http://localhost:3000' // 允许访问的域名
  }));

// app.use(function (req, res, next) {
//   req.header("Access-Control-Allow-Origin", "*");
    
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// 当请求体content-type 是application/json时 将数据解析到req.body
app.use(express.json());
// 当请求体content-type 是application/x-www-form-urlencoded时 调用这个中间件
app.use(express.urlencoded({
  extended:true,
}))
models(app);
const port = 3005;
app.listen(port, () => {
  console.log(`listning on port ${port}`);
});