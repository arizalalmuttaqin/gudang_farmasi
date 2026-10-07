const express = require('express');
const router = express.Router();
const { cekLogin } = require('../middlewares/auth');
const masukController = require('../controllers/masukController');

router.get('/tambah_obat', cekLogin, masukController.tampilkanFormTambah);
router.post('/tambah_obat_masuk', cekLogin, masukController.prosesTambah);
router.get('/edit_masuk/:id', cekLogin, masukController.tampilkanFormEdit);
router.post('/edit_masuk/:id', cekLogin, masukController.prosesEdit);
router.get('/hapus_masuk/:id', cekLogin, masukController.prosesHapus);

module.exports = router;