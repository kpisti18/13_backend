-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Okt 01. 11:36
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
-- Adatbázis: `leggazdagabb_emberek`
--
CREATE DATABASE IF NOT EXISTS `leggazdagabb_emberek` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `leggazdagabb_emberek`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cegek`
--

DROP TABLE IF EXISTS `cegek`;
CREATE TABLE IF NOT EXISTS `cegek` (
  `ceg_id` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(100) NOT NULL,
  `alapitas_ev` int(11) DEFAULT NULL,
  `bevetel` double DEFAULT NULL,
  `aktiv` tinyint(1) DEFAULT 1,
  `letrehozva` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ceg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `cegek`
--

INSERT INTO `cegek` (`ceg_id`, `nev`, `alapitas_ev`, `bevetel`, `aktiv`, `letrehozva`) VALUES
(1, 'Tesla', 2003, 81.5, 1, '2025-10-01 09:30:33'),
(2, 'Amazon', 1994, 514, 1, '2025-10-01 09:30:33'),
(3, 'Berkshire Hathaway', 1839, 302.1, 1, '2025-10-01 09:30:33');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szemelyek`
--

DROP TABLE IF EXISTS `szemelyek`;
CREATE TABLE IF NOT EXISTS `szemelyek` (
  `szemely_id` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(100) NOT NULL,
  `szuletesi_ev` int(11) DEFAULT NULL,
  `aktiv` tinyint(1) DEFAULT 1,
  `letrehozva` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`szemely_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `szemelyek`
--

INSERT INTO `szemelyek` (`szemely_id`, `nev`, `szuletesi_ev`, `aktiv`, `letrehozva`) VALUES
(1, 'Elon Musk', 1971, 1, '2025-10-01 09:30:33'),
(2, 'Jeff Bezos', 1964, 1, '2025-10-01 09:30:33'),
(3, 'Warren Buffett', 1930, 1, '2025-10-01 09:30:33');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szemely_ceg`
--

DROP TABLE IF EXISTS `szemely_ceg`;
CREATE TABLE IF NOT EXISTS `szemely_ceg` (
  `szemely_id` int(11) NOT NULL,
  `ceg_id` int(11) NOT NULL,
  PRIMARY KEY (`szemely_id`,`ceg_id`),
  KEY `ceg_id` (`ceg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `szemely_ceg`
--

INSERT INTO `szemely_ceg` (`szemely_id`, `ceg_id`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vagyon`
--

DROP TABLE IF EXISTS `vagyon`;
CREATE TABLE IF NOT EXISTS `vagyon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `szemely_id` int(11) DEFAULT NULL,
  `osszeg` double NOT NULL,
  `valuta` varchar(10) DEFAULT 'USD',
  `frissitve` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `szemely_id` (`szemely_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `vagyon`
--

INSERT INTO `vagyon` (`id`, `szemely_id`, `osszeg`, `valuta`, `frissitve`) VALUES
(1, 1, 210.5, 'USD', '2025-10-01 09:30:33'),
(2, 2, 180.3, 'USD', '2025-10-01 09:30:33'),
(3, 3, 115.2, 'USD', '2025-10-01 09:30:33');

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `szemely_ceg`
--
ALTER TABLE `szemely_ceg`
  ADD CONSTRAINT `szemely_ceg_ibfk_1` FOREIGN KEY (`szemely_id`) REFERENCES `szemelyek` (`szemely_id`),
  ADD CONSTRAINT `szemely_ceg_ibfk_2` FOREIGN KEY (`ceg_id`) REFERENCES `cegek` (`ceg_id`);

--
-- Megkötések a táblához `vagyon`
--
ALTER TABLE `vagyon`
  ADD CONSTRAINT `vagyon_ibfk_1` FOREIGN KEY (`szemely_id`) REFERENCES `szemelyek` (`szemely_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
