const express = require('express');
const router = express.Router();

const userCtr = require('../controllers/userCtr');

router.post('/login', userCtr.login);

module.exports = router;