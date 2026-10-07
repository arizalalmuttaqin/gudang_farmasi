const db = require('../database');

const tampilkanFormTambah = async (req, res) => {
    try {
        const [daftarObat] = await db.query('SELECT * FROM obat_keseluruhan');
        res.render('tambah_obat.ejs', { daftarObat: daftarObat });
    } catch (error) {
        res.status(500).send("Terjadi kesalahan saat memuat form.");
    }
};

const prosesTambah = async (req, res) => {
    try {
        const { id_obat, jumlah_masuk, tanggal_expired } = req.body;
        if (!id_obat || !jumlah_masuk || !tanggal_expired) {
            return res.send('Semua data wajib diisi! <a href="/tambah_obat">Kembali</a>');
        }
        await db.query('INSERT INTO obat_masuk (id_obat, jumlah_masuk, tanggal_expired) VALUES (?, ?, ?)', [id_obat, jumlah_masuk, tanggal_expired]);
        await db.query('UPDATE obat_keseluruhan SET stok_obat = stok_obat + ? WHERE id_obat = ?', [jumlah_masuk, id_obat]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Gagal mencatat obat masuk.");
    }
};

const tampilkanFormEdit = async (req, res) => {
    try {
        const [dataLama] = await db.query('SELECT * FROM obat_masuk WHERE id_masuk = ?', [req.params.id]);
        if (dataLama.length === 0) return res.send('Data tidak ditemukan.');
        res.render('edit_masuk.ejs', { dataObat: dataLama[0] });
    } catch (error) {
        res.status(500).send("Error server.");
    }
};

const prosesEdit = async (req, res) => {
    try {
        const { jumlah_masuk, tanggal_expired } = req.body;
        await db.query('UPDATE obat_masuk SET jumlah_masuk = ?, tanggal_expired = ? WHERE id_masuk = ?', [jumlah_masuk, tanggal_expired, req.params.id]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Gagal mengupdate data.");
    }
};

const prosesHapus = async (req, res) => {
    try {
        const idYangDihapus = req.params.id; 
        const [dataHapus] = await db.query('SELECT id_obat, jumlah_masuk FROM obat_masuk WHERE id_masuk = ?', [idYangDihapus]);
        if (dataHapus.length === 0) return res.status(404).send("Data tidak ditemukan.");

        const { id_obat, jumlah_masuk } = dataHapus[0];
        await db.query('DELETE FROM obat_masuk WHERE id_masuk = ?', [idYangDihapus]);
        await db.query('UPDATE obat_keseluruhan SET stok_obat = stok_obat - ? WHERE id_obat = ?', [jumlah_masuk, id_obat]);
        res.redirect('/'); 
    } catch (error) {
        res.status(500).send("Gagal menghapus data.");
    }
};

module.exports = { tampilkanFormTambah, prosesTambah, tampilkanFormEdit, prosesEdit, prosesHapus };