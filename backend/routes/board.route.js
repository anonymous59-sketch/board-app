// board.route.js
const router = require('express').Router();
const ctrl = require('../controllers/board.controller.js');

// 라우팅 
router.get('/', ctrl.list); // http://localhost:3000/boards/ 에 호출한다는 뜻
// router.get('/:id', ctrl.list()); // http://localhost:3000/boards/:id 에 호출한다는 뜻

router.post('/', ctrl.create);

router.get('/:id', ctrl.detail);

router.put('/:id', ctrl.update);

router.delete('/:id', ctrl.remove);

module.exports = router;