const bcrypt = require('bcrypt');
const db = require('../database');

const tampilkanRegister = (req, res) => {
    res.render('register.ejs');
};

const prosesRegister = async (req, res) => {
    try {
        const usernameBaru = req.body.username;
        const passwordAsli = req.body.password;
        const emailBaru = req.body.email;

        const [cekUser] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [usernameBaru, emailBaru]);
        if (cekUser.length > 0) {
            return res.send('Username atau email sudah terdaftar! Silakan gunakan yang lain. <a href="/register">Kembali</a>');
        }

        const hashedPassword = await bcrypt.hash(passwordAsli, 10);
        await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [usernameBaru, hashedPassword, emailBaru]);

        res.redirect('/login');
    } catch (error) {
        console.error("Error Register:", error);
        res.status(500).send('Terjadi kesalahan saat pendaftaran');
    }
};

const tampilkanLogin = (req, res) => {
    if (req.session.isLoggedIn) return res.redirect('/');
    res.render('login', { pesanError: undefined });
};

const prosesLogin = async (req, res) => {
    try {
        const inputUser = req.body.username;
        const inputPass = req.body.password;

        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [inputUser]);

        if (users.length === 0) {
            return res.render('login', { pesanError: 'Username tidak ditemukan!' });
        }

        const dataUser = users[0];
        const passwordCocok = await bcrypt.compare(inputPass, dataUser.password);

        if (passwordCocok) {
            req.session.isLoggedIn = true;
            req.session.namaUser = dataUser.username;
            res.redirect('/');
        } else {
            res.render('login', { pesanError: 'Password yang Anda masukkan salah!' });
        }
    } catch (error) {
        console.error("Error Login:", error);
        res.render('login', { pesanError: 'Terjadi kesalahan pada server.' });
    }
};

const prosesLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

module.exports = { tampilkanRegister, prosesRegister, tampilkanLogin, prosesLogin, prosesLogout };