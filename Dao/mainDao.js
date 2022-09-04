const {createConnection} = require('mysql');
const request = require('request');
const { ConnectionError } = require('sequelize/types');

//데이터베이스 연결//
const connectDatabase = async function () {
  const connection = createConnection({
    host: process.env.DB_HOST, // 호스트 주소
    user: process.env.DB_USER, // mysql user
    password: process.env.DB_PASS, // mysql password
    database: process.env.DB_NAME, // mysql 데이터베이스
  });
  connection.connect();
  return connection;
};

const checkUserdata = async function(connection,email,password){
  await connection.query(`SELECT password,Email FROM user_data where email = ${email} and password = SHA2(${password},512)`, async function (err, result) {
      if(err){
        await connection.end();
        return 0;
      }
      await connection.end();
      return result.length;
  });
}
p

const saveUserdata = async function(connection,email,password){
  await connection.query(`INSERT INTO user_data (email,password) VALUES (${email},SHA2(${password},512))`,function (err) {
      if (err) {
        await connection.end();
        return 1;
      }
      await connection.end();
      return 0;
      },
  );
}

const deleteUserdata = async function(connection,email){
  await connection.query(`DELETE FROM user_data where email = ${email}`,async function (err) {
      if (err) {
        await connection.end();
        return 1
      }
      await connection.end();
      return 0;
      },
    );
}

module.exports = {
  connectDatabase,
  saveUserdata,
  deleteUserdata,
  checkUserdata
};

