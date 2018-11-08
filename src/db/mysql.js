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
  createTable() {
    const sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, pointname VARCHAR(255), latitude DECIMAL(8,6), longitude DECIMAL(8,6))";
    return new Promise((resolve, rejecrt) => {
      this.con.query(sql, (error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }
  */

  insertToTable(data) {
    const sql = `
      INSERT INTO users (pointname, latitude, longitude)
        VALUES ('${data.pointName}', ${data.latitude}, ${data.longitude})
        ON DUPLICATE KEY UPDATE
          latitude = ${data.latitude},
          longitude = ${data.longitude}
    `;
    return new Promise((resolve, reject) => {
      this.con.query(sql, (error, result, fields) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }

  defineSQLCommand(table, count, count2) {
    let sql = '';
    if (!!count && !!count2) {
      sql = `SELECT * FROM \`${table}\` LIMIT ${count}, ${count2}`;
    } else if (!!count) {
      sql = `SELECT * FROM \`${table}\` LIMIT ${count}`;
    } else {
      sql = `SELECT * FROM \`${table}\``;
    }
    return sql;
  }

  readTable(table, count, count2) {
    const sql = this.defineSQLCommand(table, count, count2);
    return new Promise((resolve, reject) => {
      this.con.query(sql, (error, result, fields) =>{
        if (error) reject(error);
        resolve(result);
      });
    });
  }
}

const mysqlDBInstance = new mysqlDB();

module.exports = mysqlDBInstance;
