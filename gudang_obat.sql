-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Okt 2026 pada 17.19
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gudang_obat`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `obat_keluar`
--

CREATE TABLE `obat_keluar` (
  `id_keluar` int(11) NOT NULL,
  `id_obat` int(11) DEFAULT NULL,
  `tanggal_keluar` timestamp NOT NULL DEFAULT current_timestamp(),
  `jumlah_keluar` int(11) DEFAULT NULL,
  `keterangan` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `obat_keluar`
--

INSERT INTO `obat_keluar` (`id_keluar`, `id_obat`, `tanggal_keluar`, `jumlah_keluar`, `keterangan`) VALUES
(1, 2, '2026-10-05 17:00:00', 12, 'rusak');

-- --------------------------------------------------------

--
-- Struktur dari tabel `obat_keseluruhan`
--

CREATE TABLE `obat_keseluruhan` (
  `id_obat` int(11) NOT NULL,
  `nama_obat` varchar(100) NOT NULL,
  `satuan` varchar(20) DEFAULT NULL,
  `stok_obat` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `obat_keseluruhan`
--

INSERT INTO `obat_keseluruhan` (`id_obat`, `nama_obat`, `satuan`, `stok_obat`) VALUES
(1, 'Paracetamol 500mg', 'Strip', 0),
(2, 'Amoxicillin 500mg', 'Strip', 102),
(3, 'Ibuprofen 400mg', 'Strip', 0),
(4, 'Cetirizine 10mg', 'Strip', 0),
(5, 'Omeprazole 20mg', 'Kapsul', 0),
(6, 'Vitamin C 500mg', 'Botol', 0),
(7, 'Antasida Doen', 'Sirup', 0),
(8, 'Salep Hydrocortisone', 'Tube', 0),
(9, 'Betadine 15ml', 'Botol', 0),
(10, 'Sanmol Drop', 'Botol', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `obat_masuk`
--

CREATE TABLE `obat_masuk` (
  `id_masuk` int(11) NOT NULL,
  `id_obat` int(11) DEFAULT NULL,
  `jumlah_masuk` int(11) DEFAULT NULL,
  `tanggal_masuk` timestamp NOT NULL DEFAULT current_timestamp(),
  `tanggal_expired` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `obat_masuk`
--

INSERT INTO `obat_masuk` (`id_masuk`, `id_obat`, `jumlah_masuk`, `tanggal_masuk`, `tanggal_expired`) VALUES
(1, 1, 50, '2026-10-06 06:09:06', '2027-05-04'),
(2, 2, 10, '2026-10-06 06:17:50', '2045-03-12'),
(3, 2, 100, '2026-10-06 09:00:51', '2028-08-05');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES
(1, 'arizal', '$2b$10$1hiVTl9GfBdjQGC.fEoLvOr0CCiSuF6v9Q38q2qqzwLcPy7MQxNo6', 'arizalalmuttaqin34@gmail.com'),
(2, 'admin', '$2b$10$NIIhqlUeuhpHDq2qjVZka.f.ylh.FVelboD3yvyM4JfiVvi1B/s.a', 'iniemail@gmail.com'),
(3, 'rizal', '$2b$10$XDgeL/xaPDVOl6WQKJvmTu1o9or4umAiwULxNqzyzslt6sigo/Azu', 'inimail@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `obat_keluar`
--
ALTER TABLE `obat_keluar`
  ADD PRIMARY KEY (`id_keluar`),
  ADD KEY `id_obat` (`id_obat`);

--
-- Indeks untuk tabel `obat_keseluruhan`
--
ALTER TABLE `obat_keseluruhan`
  ADD PRIMARY KEY (`id_obat`);

--
-- Indeks untuk tabel `obat_masuk`
--
ALTER TABLE `obat_masuk`
  ADD PRIMARY KEY (`id_masuk`),
  ADD KEY `id_obat` (`id_obat`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `obat_keluar`
--
ALTER TABLE `obat_keluar`
  MODIFY `id_keluar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `obat_keseluruhan`
--
ALTER TABLE `obat_keseluruhan`
  MODIFY `id_obat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `obat_masuk`
--
ALTER TABLE `obat_masuk`
  MODIFY `id_masuk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `obat_keluar`
--
ALTER TABLE `obat_keluar`
  ADD CONSTRAINT `obat_keluar_ibfk_1` FOREIGN KEY (`id_obat`) REFERENCES `obat_keseluruhan` (`id_obat`);

--
-- Ketidakleluasaan untuk tabel `obat_masuk`
--
ALTER TABLE `obat_masuk`
  ADD CONSTRAINT `obat_masuk_ibfk_1` FOREIGN KEY (`id_obat`) REFERENCES `obat_keseluruhan` (`id_obat`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
