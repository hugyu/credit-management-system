const mysql = require("mysql2");

const options = {
  host: "127.0.0.1", //主机名
  port: "3306",
  user: "root", //数据库用户名,
  password: "",
  database: "software_practice" //数据库名称
};
//创建数据库连接
const connection = mysql.createConnection(options);
//建立连接
connection.connect(err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("连接成功");
});
//执行查询命令
// connection.query("select * from teacher_table", (err, res, fieds) => {
//     console.log(res);
// })
/**
 * mysql公共查询方法
 * promise类型
 * @param {strSql}  sql查询命令
 */
const sqlQuery = strSql => {
  return new Promise((resolve, reject) => {
    connection.query(strSql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

module.exports = sqlQuery;