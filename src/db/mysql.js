const mysql = require('mysql');
const mysqlConfig = require('../config/config');

class mysqlDB {
  constructor() {
    this.con = mysql.createConnection({
      host: mysqlConfig.HOST,
      port: mysqlConfig.PORT,
      user: mysqlConfig.USER,
      password: mysqlConfig.PASSWORD,
      database: mysqlConfig.DATABASE,
    });
  }
/*
  async createTable() {
    const err = await this.con.connect();
    if (err) throw err;
    console.log('Connected!');
    const sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, pointname VARCHAR(255), latitude DECIMAL(8.6), longitude DECIMAL(8.6))";
    const {error, result} = await this.con.query(sql);
    if (error) throw error;
    console.log("Table created");
  }
  */

  insertToTable(data) {
    const sql = `INSERT INTO users (pointname, latitude, longitude) VALUES ('${data.pointName}', ${data.latitude}, ${data.longitude})`;
    return new Promise((resolve, reject) => {
      this.con.query(sql, (error, result, fields) => {
        if (error) reject(error);
        console.log("Add into Table");
        resolve(result);
      });
    });
  }

  readTable() {
    const sql = 'SELECT * FROM users';
    return new Promise((resolve, reject) => {
      this.con.query(sql, (error, result, fields) =>{
        if (error) reject(error);
        console.log("Read from Table");
        resolve(result);
      });
    });
  }

}

const mysqlDBInstance = new mysqlDB();

module.exports = mysqlDBInstance;
