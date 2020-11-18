const express = require('express');
const router = express.Router();
const emailCtr = require('../controllers/emailCtr');

router.post('/', emailCtr.getEmail);

module.exports = router;