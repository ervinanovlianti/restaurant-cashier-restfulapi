const express = require('express');
const router = express.Router();
const menuController = require('../controller/menuController');

// Rute untuk menampilkan menu
router.get('/menus', menuController.getMenu);
router.post('/menu', menuController.addMenuItem);

module.exports = router;
