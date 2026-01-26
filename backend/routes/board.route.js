// board.route.js
const router = require('express').Router();
const ctrl = require('../controllers/board.controller.js');

// 라우팅 
router.get('/pg/:page', ctrl.list); // http://localhost:3000/boards/ 에 호출한다는 뜻
// router.get('/:id', ctrl.list()); // http://localhost:3000/boards/:id 에 호출한다는 뜻

router.get('/totalCount', ctrl.totalCount);

router.post('/', ctrl.create);

router.get('/detail/:id', ctrl.detail);

router.put('/:id', ctrl.update);

router.delete('/:id', ctrl.remove); // REST API에서 url은 최대한 통일하고 방식을 다르게 해서 url을 단순화하는게 RESTful방식의 권장되는 사항

module.exports = router;