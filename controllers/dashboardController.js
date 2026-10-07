const db = require('../database');

const tampilkanDashboard = async (req, res) => {
    try {
        const queryMasuk = `
            SELECT obat_masuk.*, obat_keseluruhan.nama_obat 
            FROM obat_masuk
            JOIN obat_keseluruhan ON obat_masuk.id_obat = obat_keseluruhan.id_obat
            ORDER BY obat_masuk.tanggal_masuk DESC LIMIT 5
        `;
        const [hasilRiwayatMasuk] = await db.query(queryMasuk);

        const queryKeluar = `
            SELECT obat_keluar.*, obat_keseluruhan.nama_obat 
            FROM obat_keluar
            JOIN obat_keseluruhan ON obat_keluar.id_obat = obat_keseluruhan.id_obat
            ORDER BY obat_keluar.tanggal_keluar DESC LIMIT 5
        `;
        const [hasilRiwayatKeluar] = await db.query(queryKeluar);

        res.render('dashboard.ejs', { 
            dataMasuk: hasilRiwayatMasuk,
            dataObatKeluar: hasilRiwayatKeluar
        });
        
    } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        res.status(500).send("Terjadi kesalahan saat memuat dashboard.");
    }
};

module.exports = { tampilkanDashboard };