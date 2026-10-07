const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', authController.tampilkanRegister);
router.post('/register', authController.prosesRegister);
router.get('/login', authController.tampilkanLogin);
router.post('/login', authController.prosesLogin);
router.get('/logout', authController.prosesLogout);

module.exports = router;