// board.service.js

const pool = require('../db.js');

const service = {
  async findAll(pg) {
    // pool이라는게 db.js를 확인해보면 promise로 받아오기때문에 비동기 처리방식이라는 것을 기억
    const offset = (pg - 1) * 7;
    let [rows, result] = await pool.query('SELECT * FROM board ORDER BY 1 LIMIT 7 OFFSET ?', [offset]); // 실행할 쿼리 입력 메서드
    // console.log(rows);
    return rows;
  },
  async create(data = {}) {
    const {title, content, writer} = data;
    let result = await pool.query('INSERT INTO board (title, content, writer) VALUES (?, ?, ?)', [title, content, writer]); // 매개변수를 이용해서 값을 넣는 방법
    // console.log(result);
    return result[0].insertId;
  },
  async findById(id) {
    let [rows, result] = await pool.query(`SELECT * FROM board WHERE id = ${id}`);
    return rows;
  },
  async update(data = {}) {
    const {id, title, content} = data;
    let result = await pool.query('UPDATE board SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    // console.log(result[0].affectedRows);
    return result[0].affectedRows;
  },
  async remove(id) {
    let rows = await pool.query(`DELETE FROM board WHERE id = ${id}`);
    let [result, info] = await pool.query(`SELECT * FROM board`);
    // console.log(rows[0].affectedRows, result);
    return [rows[0].affectedRows, result];
  },
  async totalCount() {
    let [rows, result] = await pool.query(`SELECT count(*) "cnt" FROM board`);
    const dataLength = rows[0]['cnt'];
    // console.log(dataLength);
    return dataLength;
  }
}
module.exports = service;

