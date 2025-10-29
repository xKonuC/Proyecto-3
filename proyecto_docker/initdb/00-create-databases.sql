-- Script de inicialización para crear las bases de datos
-- Este archivo se ejecuta primero (00-) antes que los otros scripts

-- Crear base de datos authdb si no existe
CREATE DATABASE IF NOT EXISTS `authdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear base de datos posgrado_db si no existe
CREATE DATABASE IF NOT EXISTS `posgrado_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Mostrar las bases de datos creadas
SHOW DATABASES;






