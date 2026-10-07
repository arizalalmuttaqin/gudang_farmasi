const express = require('express');
const router = express.Router();
const { cekLogin } = require('../middlewares/auth');
const keluarController = require('../controllers/keluarController');

router.get('/obat_keluar', cekLogin, keluarController.tampilkanFormTambah);
router.post('/tambah_obat_keluar', cekLogin, keluarController.prosesTambah);
router.get('/edit_keluar/:id', cekLogin, keluarController.tampilkanFormEdit);
router.post('/edit_keluar/:id', cekLogin, keluarController.prosesEdit);
router.get('/hapus_keluar/:id', cekLogin, keluarController.prosesHapus);

module.exports = router;