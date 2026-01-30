const router = require('express').Router();
const ctrl = require('../controllers/member.controller.js')

router.post('/register', ctrl.register);

module.exports = router;