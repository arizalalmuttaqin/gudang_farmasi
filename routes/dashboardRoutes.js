const express = require('express');
const router = express.Router();
const { cekLogin } = require('../middlewares/auth');
const dashboardController = require('../controllers/dashboardController');

router.get('/', cekLogin, dashboardController.tampilkanDashboard);

module.exports = router;