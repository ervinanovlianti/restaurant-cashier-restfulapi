const express = require('express');
const router = express.Router();
const kasirController = require('../controller/kasirController');

router.post('/kasir', kasirController.calculateAndSaveOrder);

module.exports = router;
