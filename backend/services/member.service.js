const pool = require('../db');

const service = {
  async register(data = {}) {
    const {user_id, pw:user_pw, user_name} = data;
    const query = `INSERT INTO member (user_id, user_pw, user_name) VALUES (?, ?, ?)`
    const [result, schem] = await pool.query(query, [user_id, user_pw, user_name]);
    return result;
  },
  async delete(id) {
    const query = `DELETE FROM member WHERE user_id = ?`;
    const [result, rows] = await pool.query(query, id);
    // console.log('delete result', result);
    return result;
  }
};

module.exports = service;