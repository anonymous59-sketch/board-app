// board.controller.js
const service = require('../services/board.service.js');

// console.log(service);
// service.findAll();
// 컨트롤러 : url 호출하면 view로 결과값을 전달
const ctrl = {
  list: async (req, res) => {
    const page = req.params.page;
    const rows = await service.findAll(page); // 비동기 주의
    res.json(rows);
  },

  create: async (req, res) => {
    const param = req.body;
    // console.log(param);
    const result = await service.create(param);
    res.send(result);
  },

  detail: async (req, res) => {
    // console.log(req.params.id);
    const id = req.params.id;
    const result = await service.findById(id);
    res.send(result);
  },

  update: async(req, res) => {
    // console.log(req.params.id, req.body);
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
    const id = req.params.id
    const [rows, result] = await service.remove(id);
    rows ? res.json({retCode: 1}) : res.json({retCond: 0});
  },
    
  totalCount: async (req, res) => {
    const result = await service.totalCount();
    res.json(result);
  }
};

module.exports = ctrl;
