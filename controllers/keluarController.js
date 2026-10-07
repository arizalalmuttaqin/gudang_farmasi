const db = require('../database');

const tampilkanFormTambah = async (req, res) => {
    try {
        const [daftarObat] = await db.query('SELECT * FROM obat_keseluruhan');
        res.render('obat_keluar.ejs', { daftarObat: daftarObat });
    } catch (error) {
        res.status(500).send("Terjadi kesalahan saat memuat form.");
    }
};

const prosesTambah = async (req, res) => {
    try {
        const { id_obat, jumlah_keluar, tanggal_keluar, keterangan } = req.body;
        const [cekStok] = await db.query('SELECT stok_obat FROM obat_keseluruhan WHERE id_obat = ?', [id_obat]);
        
        if (cekStok.length > 0 && cekStok[0].stok_obat < jumlah_keluar) {
            return res.send(`Stok tidak cukup! Sisa stok: ${cekStok[0].stok_obat}. <a href="/obat_keluar">Kembali</a>`);
        }

        await db.query('INSERT INTO obat_keluar (id_obat, tanggal_keluar, jumlah_keluar, keterangan) VALUES (?, ?, ?, ?)', [id_obat, tanggal_keluar, jumlah_keluar, keterangan]);
        await db.query('UPDATE obat_keseluruhan SET stok_obat = stok_obat - ? WHERE id_obat = ?', [jumlah_keluar, id_obat]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Gagal menyimpan data.");
    }
};

const tampilkanFormEdit = async (req, res) => {
    try {
        const [dataLama] = await db.query('SELECT * FROM obat_keluar WHERE id_keluar = ?', [req.params.id]);
        if (dataLama.length === 0) return res.send('Data tidak ditemukan.');
        res.render('edit_keluar.ejs', { dataObat: dataLama[0] });
    } catch (error) {
        res.status(500).send("Error server.");
    }
};

const prosesEdit = async (req, res) => {
    try {
        const idEdit = req.params.id;
        const { jumlah_keluar_baru, tanggal_keluar, keterangan } = req.body;
        const [dataLama] = await db.query('SELECT id_obat, jumlah_keluar FROM obat_keluar WHERE id_keluar = ?', [idEdit]);
        
        const selisih = dataLama[0].jumlah_keluar - jumlah_keluar_baru;

        await db.query('UPDATE obat_keluar SET jumlah_keluar = ?, tanggal_keluar = ?, keterangan = ? WHERE id_keluar = ?', [jumlah_keluar_baru, tanggal_keluar, keterangan, idEdit]);
        await db.query('UPDATE obat_keseluruhan SET stok_obat = stok_obat + ? WHERE id_obat = ?', [selisih, dataLama[0].id_obat]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Gagal mengupdate data.");
    }
};

const prosesHapus = async (req, res) => {
    try {
        const idYangDihapus = req.params.id;
        const [dataHapus] = await db.query('SELECT id_obat, jumlah_keluar FROM obat_keluar WHERE id_keluar = ?', [idYangDihapus]);
        
        if (dataHapus.length === 0) return res.status(404).send("Data tidak ditemukan.");

        await db.query('DELETE FROM obat_keluar WHERE id_keluar = ?', [idYangDihapus]);
        await db.query('UPDATE obat_keseluruhan SET stok_obat = stok_obat + ? WHERE id_obat = ?', [dataHapus[0].jumlah_keluar, dataHapus[0].id_obat]);
        res.redirect('/'); 
    } catch (error) {
        res.status(500).send("Gagal menghapus data.");
    }
};

module.exports = { tampilkanFormTambah, prosesTambah, tampilkanFormEdit, prosesEdit, prosesHapus };