// board.controller.js
const service = require('../services/board.service.js');

// console.log(service);
// service.findAll();
// 컨트롤러 : url 호출하면 view로 결과값을 전달
const ctrl = {
  list: async (req, res) => {
    const rows = await service.findAll(); // 비동기 주의
    res.send(rows);
  },
  
  create: async (req, res) => {
    // const param = req.body;
    // console.log(param);
    const result = await service.create(req.body);
    res.send(result);
  },

  detail: async (req, res) => {
    console.log(req.params.id);
    const result = await service.findById(req.params.id);
    res.send(result);
  },

  update: async(req, res) => {
    // console.log(req.params.id, req.body);
    const id = req.params.id;
    const {title, content} = req.body;
    const result = await service.update({id, title, content});
    // falsy : 0, null, "", undefined
    if(result) {
      res.json({retCode : "OK"});
    } else {
      res.json({retCode : "NG"});
    }
  },

  remove: async(req, res) => {
    // console.log(req.params.id);
    const [rows, result] = await service.remove(req.params.id);
    if(rows) {
      res.send(result);
    } else {
      res.json({retCode : "NG"});
    }
  }
};

module.exports = ctrl;
