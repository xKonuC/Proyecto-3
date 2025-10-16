-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql
-- Tiempo de generación: 16-10-2025 a las 01:50:41
-- Versión del servidor: 8.0.43
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `authdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userAccount`
--

CREATE TABLE `userAccount` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `createdat` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `lastsignin` timestamp NULL DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `userAccount`
--

INSERT INTO `userAccount` (`id`, `name`, `email`, `provider`, `createdat`, `lastsignin`, `password`) VALUES
(1, 'Leonardo Rodríguez', 'Leonardo.Rodríguez@alumnos.uta.cl', 'Email', '2024-01-16 03:40:50', NULL, ''),
(2, 'Sebastian Torres', 'Sebastian.Torres@alumnos.uta.cl', 'Email', '2024-01-16 15:49:25', NULL, ''),
(12, 'admin@ejemplo.com', 'admin@ejemplo.com', 'Email', '2025-10-09 01:37:37', NULL, '$2b$10$fy0pawhkIzSxGCn8tXzl2e40aK/f85YkMeQMktqXr3HecAQI4KjB6'),
(14, 'Juan Carlos Pérez González', 'admin3@ejemplo.com', 'Email', '2025-10-09 02:46:17', NULL, NULL),
(15, 'Juan Carlos Pérez González', 'admin5@ejemplo.com', 'Email', '2025-10-09 03:02:59', NULL, '.KHAT9QHyiCsu6/oDfDaLkZFRBEdy'),
(16, 'Admin Test User Demo', 'admin6@ejemplo.com', 'Email', '2025-10-09 03:08:51', NULL, '/YAZ6FjhVZSm'),
(17, 'Admin New User Test', 'admin7@ejemplo.com', 'Email', '2025-10-09 03:11:17', NULL, NULL),
(18, 'Test Debug User Password', 'test@ejemplo.com', 'Email', '2025-10-09 03:16:16', NULL, '$2b$10$lVwFv3K.9Aj4ANa5OBq9qOBs5a4TDhPhZ5mYarXd8YLk0DFxc.vY.'),
(21, 'Super Admin Administrador Sistema', 'superadmin@magister.cl', 'Email', '2025-10-13 18:17:16', NULL, '$2b$10$3JWt0vOU3F5xlpXWTkiOEunzdoNJi9YixW5ykbfxynTZnPwBbVRqe');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `userAccount`
--
ALTER TABLE `userAccount`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `userAccount`
--
ALTER TABLE `userAccount`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
