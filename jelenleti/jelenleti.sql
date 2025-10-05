-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Okt 05. 12:50
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `jelenleti`
--
CREATE DATABASE IF NOT EXISTS `jelenleti` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `jelenleti`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jelenleti_iv`
--

DROP TABLE IF EXISTS `jelenleti_iv`;
CREATE TABLE IF NOT EXISTS `jelenleti_iv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(50) NOT NULL,
  `jelenlet` tinyint(1) NOT NULL,
  `fizetes` float NOT NULL,
  `datum` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `jelenleti_iv`
--

INSERT INTO `jelenleti_iv` (`id`, `nev`, `jelenlet`, `fizetes`, `datum`) VALUES
(1, 'Attila', 1, 4000, '2025-10-02'),
(2, 'Márk', 1, 4000, '2025-10-03'),
(3, 'Vanessza', 1, 4000, '2025-10-03');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
