require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000; 


//  PENGATURAN VIEW ENGINE & MIDDLEWARE DASAR

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


// KONFIGURASI SESSION & VARIABEL GLOBAL

app.use(session({
    secret: 'kunci_rahasia_farmasi',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    const sekarang = new Date();
    const pilihanFormat = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    
    res.locals.tanggalHariIni = sekarang.toLocaleDateString('en-US', pilihanFormat);
    res.locals.namaUser = req.session.namaUser || "Guest";
    next(); 
});


// IMPORT & GUNAKAN ROUTER

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const masukRoutes = require('./routes/masukRoutes');
const keluarRoutes = require('./routes/keluarRoutes');

app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', masukRoutes);
app.use('/', keluarRoutes);

// JALANKAN SERVER

app.listen(PORT, () => {
    console.log(`Aplikasi berjalan di http://localhost:${PORT}`);
});