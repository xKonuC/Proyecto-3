USE `posgrado_db`;

DROP TABLE IF EXISTS `graduate`;

CREATE TABLE `graduate` (
  `graduateID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `rut` varchar(14) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `secondName` varchar(45) DEFAULT NULL,
  `surname1` varchar(45) NOT NULL,
  `surname2` varchar(45) DEFAULT NULL,
  `email` varchar(60) NOT NULL,
  `workPlace` varchar(60) DEFAULT NULL,
  `job` varchar(60) DEFAULT NULL,
  `entryYear` year NOT NULL,
  `graduationYear` year DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`graduateID`),
  UNIQUE KEY `unique_user_graduate` (`userID`),
  KEY `idx_graduate_rut` (`rut`),
  KEY `idx_graduate_email` (`email`),
  KEY `idx_graduate_entryYear` (`entryYear`),
  KEY `idx_graduate_graduationYear` (`graduationYear`),
  CONSTRAINT `fk_graduate_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Datos de prueba -------------------------------------------------

-- Aseguramos que existan los usuarios
INSERT INTO `user` 
(`userID`, `rut`, `firstName`, `secondName`, `surname1`, `surname2`, `sex`, `civilStatus`, `birthday`, `address`, `email`, `personalEmail`, `phone`, `entry`, `group`, `workPlace`, `phoneWork`, `job`, `articulation`)
VALUES
(100, '15.123.456-K', 'Hernan', 'Antonio', 'Diaz', 'Castro', 'M', 'Soltero', '1995-05-20', 'Calle Hernan 123', 'hernan.diaz@alumnos.uta.cl', 'hernan@gmail.com', '987654321', 2020, 1, 'Tech Solutions', '22222222', 'Desarrollador Senior', 0),
(101, '16.987.654-3', 'Javiera', 'Ignacia', 'Rojas', 'Soto', 'F', 'Casada', '1996-08-15', 'Av. Javiera 456', 'javiera.rojas@alumnos.uta.cl', 'javiera@gmail.com', '912345678', 2021, 1, 'Hospital Regional', '33333333', 'Enfermera Jefe', 0)
ON DUPLICATE KEY UPDATE email = VALUES(email);

-- Asignación de roles
INSERT INTO `userHasRole` (`userID`, `roleID`) VALUES
(100, 5),
(101, 5)
ON DUPLICATE KEY UPDATE roleID = VALUES(roleID);

-- Insert en graduate (SIN sex)
INSERT INTO `graduate`
(`userID`, `rut`, `firstName`, `secondName`, `surname1`, `surname2`, `email`, `workPlace`, `job`, `entryYear`, `graduationYear`)
VALUES
(100, '15.123.456-K', 'Hernan', 'Antonio', 'Diaz', 'Castro', 'hernan.diaz@alumnos.uta.cl', 'Tech Solutions', 'Desarrollador Senior', 2020, 2023),
(101, '16.987.654-3', 'Javiera', 'Ignacia', 'Rojas', 'Soto', 'javiera.rojas@alumnos.uta.cl', 'Hospital Regional', 'Enfermera Jefe', 2021, 2023)
<<<<<<< HEAD
ON DUPLICATE KEY UPDATE graduationYear = VALUES(graduationYear);
=======
ON DUPLICATE KEY UPDATE graduationYear = VALUES(graduationYear);
>>>>>>> c98ce8ccd65bda4ebabc9fcc45e29e80f6436df3
