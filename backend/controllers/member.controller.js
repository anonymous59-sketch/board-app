const service = require('../services/member.service.js');
const crypto = require('crypto');

const ctrl = {
  async register(req, res) {
    const {user_id, user_pw, user_name} = req.body;
    const pw = crypto.createHash('sha512').update(user_pw).digest('base64');
    try {
      const result = await service.register({user_id, pw, user_name});
      res.json({retCode : 'OK'});
    } catch(err) {
      console.error(err);
      res.json({retCode : 'NG'});
    }
    // console.log(result);
    // console.log(req.body);
    // const data = req.body;
    // service.register(data);
  }
}

module.exports = ctrl;