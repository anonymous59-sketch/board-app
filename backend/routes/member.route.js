const router = require('express').Router();
const ctrl = require('../controllers/member.controller.js')

router.post('/register', ctrl.register);
router.delete('/:id', ctrl.delete);
module.exports = router;