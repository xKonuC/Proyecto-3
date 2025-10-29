-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: posgrado_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `posgrado_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `posgrado_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `posgrado_db`;

--
-- Temporary view structure for view `academic`
--

DROP TABLE IF EXISTS `academic`;
/*!50001 DROP VIEW IF EXISTS `academic`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `academic` AS SELECT 
 1 AS `userID`,
 1 AS `rut`,
 1 AS `firstName`,
 1 AS `secondName`,
 1 AS `surname1`,
 1 AS `surname2`,
 1 AS `sex`,
 1 AS `civilStatus`,
 1 AS `birthday`,
 1 AS `address`,
 1 AS `email`,
 1 AS `personalEmail`,
 1 AS `phone`,
 1 AS `entry`,
 1 AS `group`,
 1 AS `workPlace`,
 1 AS `phoneWork`,
 1 AS `job`,
 1 AS `articulation`,
 1 AS `titlesID`,
 1 AS `titles`,
 1 AS `academicHasTitlesID`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `academicHasTitle`
--

DROP TABLE IF EXISTS `academicHasTitle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academicHasTitle` (
  `academicHasTitleID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `titleID` int NOT NULL,
  `titleYear` year NOT NULL,
  `archiveURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `formatID` int NOT NULL,
  `studyField` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`academicHasTitleID`),
  KEY `fk_academicHasTitle_title_idx` (`titleID`),
  KEY `fk_academicHasTitle_userID_idx` (`userID`),
  KEY `fk_academicHasTitle_formatID_idx` (`formatID`),
  CONSTRAINT `fk_academicHasTitle_formatID` FOREIGN KEY (`formatID`) REFERENCES `format` (`formatID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_academicHasTitle_titleID` FOREIGN KEY (`titleID`) REFERENCES `title` (`titleID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_academicHasTitle_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academicHasTitle`
--

LOCK TABLES `academicHasTitle` WRITE;
/*!40000 ALTER TABLE `academicHasTitle` DISABLE KEYS */;
/*!40000 ALTER TABLE `academicHasTitle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `academicInfo`
--

DROP TABLE IF EXISTS `academicInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academicInfo` (
  `userID` int NOT NULL,
  `bondType` enum('Claustro','N??cleo','Colaborador/a') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `investigationLines` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bestDegreeID` int NOT NULL,
  `workedHours` enum('Jornada Completa','Media Jornada','Profesor Hora/Part-Time') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hierarchy` enum('Sin jerarqu??a','Titular','Asistente','Asociado','Instructor') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Sin jerarqu??a',
  PRIMARY KEY (`userID`),
  KEY `fk_academicInfo_bestDegreeID_idx` (`bestDegreeID`),
  CONSTRAINT `fk_academicInfo_bestDegreeID` FOREIGN KEY (`bestDegreeID`) REFERENCES `academicHasTitle` (`academicHasTitleID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_academicInfo_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academicInfo`
--

LOCK TABLES `academicInfo` WRITE;
/*!40000 ALTER TABLE `academicInfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `academicInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `administrative`
--

DROP TABLE IF EXISTS `administrative`;
/*!50001 DROP VIEW IF EXISTS `administrative`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `administrative` AS SELECT 
 1 AS `userID`,
 1 AS `rut`,
 1 AS `firstName`,
 1 AS `secondName`,
 1 AS `surname1`,
 1 AS `surname2`,
 1 AS `sex`,
 1 AS `civilStatus`,
 1 AS `birthday`,
 1 AS `address`,
 1 AS `email`,
 1 AS `personalEmail`,
 1 AS `phone`,
 1 AS `entry`,
 1 AS `group`,
 1 AS `workPlace`,
 1 AS `phoneWork`,
 1 AS `job`,
 1 AS `articulation`,
 1 AS `role`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `areaID` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`areaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,'Salud'),(2,'Ingenier??a'),(3,'Ciencias Sociales'),(4,'Ciencias Naturales'),(5,'Educaci??n'),(6,'Comunicaci??n y Medios'),(7,'Negocios y Econom??a');
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignedSpecialization`
--

DROP TABLE IF EXISTS `assignedSpecialization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignedSpecialization` (
  `assignedSpecializationID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `specializationID` int NOT NULL,
  `semesterID` int NOT NULL,
  PRIMARY KEY (`assignedSpecializationID`),
  KEY `fk_assignedSpecialization_userID1_idx` (`userID`),
  KEY `fk_assignedSpecialization_specializationID_idx` (`specializationID`),
  KEY `fk_assignedSpecialization_semesterID1_idx` (`semesterID`),
  CONSTRAINT `fk_assignedSpecialization_semesterID` FOREIGN KEY (`semesterID`) REFERENCES `semester` (`semesterID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_assignedSpecialization_specializationID` FOREIGN KEY (`specializationID`) REFERENCES `specialization` (`specializationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_assignedSpecialization_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignedSpecialization`
--

LOCK TABLES `assignedSpecialization` WRITE;
/*!40000 ALTER TABLE `assignedSpecialization` DISABLE KEYS */;
/*!40000 ALTER TABLE `assignedSpecialization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookChapter`
--

DROP TABLE IF EXISTS `bookChapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookChapter` (
  `bookChapterID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `authors` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `leadAuthor` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` year NOT NULL,
  `bookName` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `chapterName` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `place` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `editorial` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`bookChapterID`),
  KEY `fk_bookChapter_userID_idx` (`userID`),
  CONSTRAINT `fk_bookChapter_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookChapter`
--

LOCK TABLES `bookChapter` WRITE;
/*!40000 ALTER TABLE `bookChapter` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookChapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `building`
--

DROP TABLE IF EXISTS `building`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `building` (
  `buildingID` int NOT NULL AUTO_INCREMENT,
  `campusID` int NOT NULL,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`buildingID`),
  KEY `fk_building_campus1_idx` (`campusID`),
  CONSTRAINT `fk_building_campusID` FOREIGN KEY (`campusID`) REFERENCES `campus` (`campusID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `building`
--

LOCK TABLES `building` WRITE;
/*!40000 ALTER TABLE `building` DISABLE KEYS */;
INSERT INTO `building` VALUES (1,1,'Edificio de computaci??n');
/*!40000 ALTER TABLE `building` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus`
--

DROP TABLE IF EXISTS `campus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campus` (
  `campusID` int NOT NULL AUTO_INCREMENT,
  `universityID` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ubication` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`campusID`),
  KEY `fk_campus_university1_idx` (`universityID`),
  CONSTRAINT `fk_campus_universityID` FOREIGN KEY (`universityID`) REFERENCES `university` (`universityID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus`
--

LOCK TABLES `campus` WRITE;
/*!40000 ALTER TABLE `campus` DISABLE KEYS */;
INSERT INTO `campus` VALUES (1,1,'saucache','1010069 Arica, Arica y Parinacota');
/*!40000 ALTER TABLE `campus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classification`
--

DROP TABLE IF EXISTS `classification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classification` (
  `classificationID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `criteria` json DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`classificationID`),
  KEY `idx_classification_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classification`
--

LOCK TABLES `classification` WRITE;
/*!40000 ALTER TABLE `classification` DISABLE KEYS */;
INSERT INTO `classification` VALUES (2,'Especializaci????n en Investigaci????n','Egresados que se dedicaron a la investigaci??n','{\"publications\": true, \"researchFocus\": true}','2025-10-13 22:47:28','2025-10-13 23:27:49'),(3,'Liderazgo Empresarial','Egresados que ocupan cargos directivos','{\"leadership\": true, \"management\": true}','2025-10-13 22:47:28','2025-10-13 22:47:28'),(4,'Egresados ','alumnos egresados con nota 6,0','{\"jobs\": [], \"groups\": [\"1\"], \"entryYears\": [\"2021\"], \"workPlaces\": [], \"articulations\": [\"0\"], \"specializations\": [\"Did??ctica y Evaluaci??n\"]}','2025-10-14 01:40:13','2025-10-14 03:36:11');
/*!40000 ALTER TABLE `classification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultancy`
--

DROP TABLE IF EXISTS `consultancy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultancy` (
  `consultancyID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `title` varchar(350) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contractingInstitution` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `grantYear` year NOT NULL,
  `executionPeriod` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `objective` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `accessURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`consultancyID`),
  KEY `fk_consultancy_userID_idx` (`userID`),
  CONSTRAINT `fk_consultancy_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultancy`
--

LOCK TABLES `consultancy` WRITE;
/*!40000 ALTER TABLE `consultancy` DISABLE KEYS */;
/*!40000 ALTER TABLE `consultancy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `degree`
--

DROP TABLE IF EXISTS `degree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `degree` (
  `degreeID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`degreeID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `degree`
--

LOCK TABLES `degree` WRITE;
/*!40000 ALTER TABLE `degree` DISABLE KEYS */;
INSERT INTO `degree` VALUES (1,'Mag??ster','Postgrado'),(2,'Licenciatura','Grado');
/*!40000 ALTER TABLE `degree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document` (
  `documentID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `category` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `archiveURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `formatID` int NOT NULL,
  PRIMARY KEY (`documentID`),
  KEY `fk_document_format1_idx` (`formatID`),
  KEY `fk_document_user1_idx` (`userID`),
  CONSTRAINT `fk_document_formatID` FOREIGN KEY (`formatID`) REFERENCES `format` (`formatID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_document_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` VALUES (1,1,'Certificado de Nacimiento','link1',1),(2,2,'Curr??culum','link2',2);
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `elective`
--

DROP TABLE IF EXISTS `elective`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elective` (
  `electiveID` int NOT NULL AUTO_INCREMENT,
  `specializationID` int NOT NULL,
  `number` tinyint(1) NOT NULL,
  `name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`electiveID`),
  KEY `fk_elective_specializationID_idx` (`specializationID`),
  CONSTRAINT `fk_elective_specializationID` FOREIGN KEY (`specializationID`) REFERENCES `specialization` (`specializationID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `elective`
--

LOCK TABLES `elective` WRITE;
/*!40000 ALTER TABLE `elective` DISABLE KEYS */;
INSERT INTO `elective` VALUES (1,2,1,'Gesti??n e Innovaci??n Educativa.'),(2,2,1,'Evaluaci??n de Sistemas e Instituciones Educativas.'),(3,3,1,'Curr??culo.'),(4,3,1,'Did??ctica de los aprendizajes.'),(5,4,1,'El enfoque Intercultural en Educaci??n.'),(6,4,1,'Ciudadan??a Democr??tica y Educaci??n.'),(7,2,2,'Direcci??n de Organizaciones Educativas.'),(8,2,2,'Gesti??n Financiera Educacional.'),(9,3,2,'Gesti??n e Innovaci??n Curricular.'),(10,3,2,'Evaluaci??n de los Aprendizajes.'),(11,4,2,'Migraci??n y Desigualdad en Educaci??n.'),(12,4,2,'Diversidad e Identidad ??tnica.');
/*!40000 ALTER TABLE `elective` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation`
--

DROP TABLE IF EXISTS `evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation` (
  `evaluationID` int NOT NULL AUTO_INCREMENT,
  `studentHasSemesterID` int NOT NULL,
  `evaluationStatusID` int NOT NULL DEFAULT '1',
  `projectURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `formatID` int DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT NULL,
  `updateDate` timestamp NULL DEFAULT NULL,
  `lateMinutes` int DEFAULT '0',
  `rubricID` int DEFAULT NULL,
  `thesisGradesID` int DEFAULT NULL,
  PRIMARY KEY (`evaluationID`),
  KEY `fk_evaluate_format1_idx` (`formatID`),
  KEY `fk_specializationHasSemesterID_idx` (`studentHasSemesterID`),
  KEY `fk_evaluate_evaluationStatusID1_idx` (`evaluationStatusID`),
  KEY `fk_evaluation_thesisID_idx` (`thesisGradesID`),
  KEY `fk_evaluation_rubricID_idx` (`rubricID`),
  CONSTRAINT `fk_evaluation_evaluationStatusID` FOREIGN KEY (`evaluationStatusID`) REFERENCES `evaluationStatus` (`evaluationStatusID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_evaluation_formatID` FOREIGN KEY (`formatID`) REFERENCES `format` (`formatID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_evaluation_rubricID` FOREIGN KEY (`rubricID`) REFERENCES `rubric` (`rubricID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_evaluation_studentHasSemesterID` FOREIGN KEY (`studentHasSemesterID`) REFERENCES `studentHasSemester` (`studentHasSemesterID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_evaluation_thesisID` FOREIGN KEY (`thesisGradesID`) REFERENCES `thesisGrades` (`thesisGradesID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation`
--

LOCK TABLES `evaluation` WRITE;
/*!40000 ALTER TABLE `evaluation` DISABLE KEYS */;
INSERT INTO `evaluation` VALUES (1,1,1,'',2,'2023-12-16 03:00:00',NULL,0,NULL,NULL),(2,1,1,'',2,'2023-12-16 03:00:00',NULL,0,NULL,NULL),(3,2,2,'',2,'2023-12-17 03:00:00',NULL,0,NULL,NULL),(4,3,2,'',2,'2023-12-19 03:00:00',NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluationStatus`
--

DROP TABLE IF EXISTS `evaluationStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluationStatus` (
  `evaluationStatusID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`evaluationStatusID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluationStatus`
--

LOCK TABLES `evaluationStatus` WRITE;
/*!40000 ALTER TABLE `evaluationStatus` DISABLE KEYS */;
INSERT INTO `evaluationStatus` VALUES (1,'Sin asignaci??n','Proceso de revisi??n creado, pero sin acad??micos asignados.'),(2,'Sin revisi??n','Los acad??micos asignados a??n no terminan de evaluar.'),(3,'Aprobado','Evaluaci??n aprobada.'),(4,'Rechazado','Evaluaci??n rechazada.'),(5,'Aprobado con observaciones','Se deben corregir las observaciones indicadas.'),(6,'Rechazado en primer intento','Evaluaci??n rechazada en el primer intento, tiene otra oportunidad para entregarlo.'),(7,'Corregido','El anteproyecto fue corregido por el evaluador correspondiente');
/*!40000 ALTER TABLE `evaluationStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluationType`
--

DROP TABLE IF EXISTS `evaluationType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluationType` (
  `evaluationTypeID` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`evaluationTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluationType`
--

LOCK TABLES `evaluationType` WRITE;
/*!40000 ALTER TABLE `evaluationType` DISABLE KEYS */;
INSERT INTO `evaluationType` VALUES (1,'Anteproyecto'),(2,'Tesis');
/*!40000 ALTER TABLE `evaluationType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluatorAnswer`
--

DROP TABLE IF EXISTS `evaluatorAnswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluatorAnswer` (
  `evaluatorAnswerID` int NOT NULL AUTO_INCREMENT,
  `preprojectEvaluatorID` int NOT NULL,
  `rubricHasQuestionID` int NOT NULL,
  `answer` enum('Excelente','Bien','Aceptable','Insuficiente') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`evaluatorAnswerID`),
  KEY `fk_evaluatorAnswer_preprojectEvaluatorID_idx` (`preprojectEvaluatorID`),
  KEY `fk_evaluatorAnswer_rubricHasQuestionID_idx` (`rubricHasQuestionID`),
  CONSTRAINT `fk_evaluatorAnswer_preprojectEvaluatorID` FOREIGN KEY (`preprojectEvaluatorID`) REFERENCES `preprojectEvaluator` (`preprojectEvaluatorID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_evaluatorAnswer_rubricHasQuestionID` FOREIGN KEY (`rubricHasQuestionID`) REFERENCES `rubricHasQuestion` (`rubricHasQuestionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluatorAnswer`
--

LOCK TABLES `evaluatorAnswer` WRITE;
/*!40000 ALTER TABLE `evaluatorAnswer` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluatorAnswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluatorCategory`
--

DROP TABLE IF EXISTS `evaluatorCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluatorCategory` (
  `evaluatorCategoryID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`evaluatorCategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluatorCategory`
--

LOCK TABLES `evaluatorCategory` WRITE;
/*!40000 ALTER TABLE `evaluatorCategory` DISABLE KEYS */;
INSERT INTO `evaluatorCategory` VALUES (1,'Gu??a'),(2,'A'),(3,'B'),(4,'Director'),(5,'Codirector'),(6,'Director del programa');
/*!40000 ALTER TABLE `evaluatorCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `format`
--

DROP TABLE IF EXISTS `format`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `format` (
  `formatID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`formatID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `format`
--

LOCK TABLES `format` WRITE;
/*!40000 ALTER TABLE `format` DISABLE KEYS */;
INSERT INTO `format` VALUES (1,'pdf'),(2,'png'),(3,'jpg'),(4,'doc'),(5,'xlsx');
/*!40000 ALTER TABLE `format` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guidedThesis`
--

DROP TABLE IF EXISTS `guidedThesis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guidedThesis` (
  `guidedThesisID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `author` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('Mag??ster','Doctorado') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('Gu??a','Co-Gu??a') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` year NOT NULL,
  `title` varchar(350) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `program` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `institution` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sameProgram` tinyint(1) DEFAULT NULL,
  `accessURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`guidedThesisID`),
  KEY `fk_guidedThesis_userID_idx` (`userID`),
  CONSTRAINT `fk_guidedThesis_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guidedThesis`
--

LOCK TABLES `guidedThesis` WRITE;
/*!40000 ALTER TABLE `guidedThesis` DISABLE KEYS */;
/*!40000 ALTER TABLE `guidedThesis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `id_mapping`
--

DROP TABLE IF EXISTS `id_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `id_mapping` (
  `authdb_id` int NOT NULL,
  `posgrado_userID` int DEFAULT NULL,
  PRIMARY KEY (`authdb_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `id_mapping`
--

LOCK TABLES `id_mapping` WRITE;
/*!40000 ALTER TABLE `id_mapping` DISABLE KEYS */;
INSERT INTO `id_mapping` VALUES (21,19);
/*!40000 ALTER TABLE `id_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `object`
--

DROP TABLE IF EXISTS `object`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `object` (
  `objectID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `photoURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `formatID` int DEFAULT NULL,
  PRIMARY KEY (`objectID`),
  KEY `fk_format_formatID_idx` (`formatID`),
  CONSTRAINT `fk_object_formatID` FOREIGN KEY (`formatID`) REFERENCES `format` (`formatID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `object`
--

LOCK TABLES `object` WRITE;
/*!40000 ALTER TABLE `object` DISABLE KEYS */;
INSERT INTO `object` VALUES (1,'mesa',NULL,NULL,NULL),(2,'silla',NULL,NULL,NULL),(3,'computador',NULL,NULL,NULL);
/*!40000 ALTER TABLE `object` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otpToken`
--

DROP TABLE IF EXISTS `otpToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otpToken` (
  `otpID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`otpID`),
  UNIQUE KEY `otpID_UNIQUE` (`otpID`),
  KEY `fk_user_email_idx` (`email`),
  CONSTRAINT `fk_otpToken_email` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otpToken`
--

LOCK TABLES `otpToken` WRITE;
/*!40000 ALTER TABLE `otpToken` DISABLE KEYS */;
/*!40000 ALTER TABLE `otpToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patent`
--

DROP TABLE IF EXISTS `patent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patent` (
  `patentID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `inventors` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `patentName` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicationDate` date NOT NULL,
  `publicationDate` date DEFAULT NULL,
  `registrationNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`patentID`),
  KEY `fk_patent_userID_idx` (`userID`),
  CONSTRAINT `fk_patent_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patent`
--

LOCK TABLES `patent` WRITE;
/*!40000 ALTER TABLE `patent` DISABLE KEYS */;
/*!40000 ALTER TABLE `patent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `permissionID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`permissionID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'Permiso para Escoger L??nea de Formaci??n'),(2,'Permiso para Escoger 1?? Electivo'),(3,'Permiso para Escoger 2?? Electivo'),(4,'Permiso para Subir Anteproyecto'),(5,'Permiso para Subir Tesis');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `preprojectEvaluation`
--

DROP TABLE IF EXISTS `preprojectEvaluation`;
/*!50001 DROP VIEW IF EXISTS `preprojectEvaluation`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `preprojectEvaluation` AS SELECT 
 1 AS `evaluationID`,
 1 AS `studentHasSemesterID`,
 1 AS `projectURL`,
 1 AS `formatID`,
 1 AS `creationDate`,
 1 AS `updateDate`,
 1 AS `lateMinutes`,
 1 AS `preproject_statusID`,
 1 AS `preproject_status`,
 1 AS `preproject_statusDescription`,
 1 AS `academicA_statusID`,
 1 AS `academicA_comment1`,
 1 AS `academicA_comment2`,
 1 AS `academicA_comment3`,
 1 AS `academicA_comment4`,
 1 AS `academicA_comment5`,
 1 AS `academicA_comment6`,
 1 AS `academicA_comment7`,
 1 AS `academicB_statusID`,
 1 AS `academicB_comment1`,
 1 AS `academicB_comment2`,
 1 AS `academicB_comment3`,
 1 AS `academicB_comment4`,
 1 AS `academicB_comment5`,
 1 AS `academicB_comment6`,
 1 AS `academicB_comment7`,
 1 AS `rubric_rubricID`,
 1 AS `rubric_name`,
 1 AS `rubric_description`,
 1 AS `rubric_templateID`,
 1 AS `semesterID`,
 1 AS `year`,
 1 AS `semesterNumber`,
 1 AS `startDate`,
 1 AS `finishDate`,
 1 AS `userID`,
 1 AS `rut`,
 1 AS `fullName`,
 1 AS `email`,
 1 AS `specializationID`,
 1 AS `specializationName`,
 1 AS `academicA_status`,
 1 AS `academicA_statusDescription`,
 1 AS `academicB_status`,
 1 AS `academicB_statusDescription`,
 1 AS `academicA_preprojectEvaluatorID`,
 1 AS `academicA_userID`,
 1 AS `academicA_fullName`,
 1 AS `academicA_rut`,
 1 AS `academicA_email`,
 1 AS `academicB_preprojectEvaluatorID`,
 1 AS `academicB_userID`,
 1 AS `academicB_fullName`,
 1 AS `academicB_rut`,
 1 AS `academicB_email`,
 1 AS `guideAcademic_userID`,
 1 AS `guideAcademic_fullName`,
 1 AS `guideAcademic_rut`,
 1 AS `guideAcademic_email`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `preprojectEvaluator`
--

DROP TABLE IF EXISTS `preprojectEvaluator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preprojectEvaluator` (
  `preprojectEvaluatorID` int NOT NULL AUTO_INCREMENT,
  `evaluationID` int NOT NULL,
  `userID` int NOT NULL,
  `evaluatorCategoryID` int NOT NULL,
  `evaluationStatusID` int NOT NULL DEFAULT '2',
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `comment1` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `comment2` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `comment3` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `comment4` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `comment5` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `comment6` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `comment7` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`preprojectEvaluatorID`),
  KEY `fk_preprojectEvaluator_preprojectID_idx` (`evaluationID`),
  KEY `fk_preprojectEvaluator_userID_idx` (`userID`),
  KEY `fk_preprojectEvaluator_evaluatorCategoryID_idx` (`evaluatorCategoryID`),
  KEY `fk_preprojectEvaluator_evaluationStatusID_idx` (`evaluationStatusID`),
  CONSTRAINT `fk_preprojectEvaluator_evaluationStatusID` FOREIGN KEY (`evaluationStatusID`) REFERENCES `evaluationStatus` (`evaluationStatusID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_preprojectEvaluator_evaluatorCategoryID` FOREIGN KEY (`evaluatorCategoryID`) REFERENCES `evaluatorCategory` (`evaluatorCategoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_preprojectEvaluator_preprojectID` FOREIGN KEY (`evaluationID`) REFERENCES `evaluation` (`evaluationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_preprojectEvaluator_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preprojectEvaluator`
--

LOCK TABLES `preprojectEvaluator` WRITE;
/*!40000 ALTER TABLE `preprojectEvaluator` DISABLE KEYS */;
/*!40000 ALTER TABLE `preprojectEvaluator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `projectID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `title` varchar(350) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fundingSource` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `grantYear` year NOT NULL,
  `executionPeriod` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`projectID`),
  KEY `fk_project_userID_idx` (`userID`),
  CONSTRAINT `fk_project_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publication`
--

DROP TABLE IF EXISTS `publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publication` (
  `publicationID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `authors` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `leadAuthor` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isIndexed` tinyint(1) NOT NULL,
  `type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` year NOT NULL,
  `title` varchar(350) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `journal` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ISSN` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`publicationID`),
  KEY `fk_publication_userID_idx` (`userID`),
  CONSTRAINT `fk_publication_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publication`
--

LOCK TABLES `publication` WRITE;
/*!40000 ALTER TABLE `publication` DISABLE KEYS */;
/*!40000 ALTER TABLE `publication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `questionID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `question` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`questionID`),
  KEY `fk_question_user1_idx` (`userID`),
  CONSTRAINT `fk_question_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,NULL,'Presenta un desarrollo sistem??tico, interesante y actual, relacionado con el ??mbito educativo.',1),(2,NULL,'Presenta argumentos te??ricos suficientes y relevantes en relaci??n a la tem??tica tratada.',1),(3,NULL,'Las ideas expuestas son claras y existe cohesi??n entre las partes del Anteproyecto (T??tulo, Problema, Objetivo, Metodolog??a, Marco te??rico)',1),(4,NULL,'La redacci??n es adecuada y sustenta la idea central del Anteproyecto.',1),(5,NULL,'La propuesta metodol??gica es pertinente y conecta con el tipo y dise??o de investigaci??n.',1),(6,NULL,'Utiliza fuentes te??ricas suficientes que soporten los argumentos del autor, autora o autores.',1),(7,NULL,'Interpreta las citaciones de sus fuentes te??ricas y sustentan la idea central del art??culo.',1),(8,NULL,'Todas las citas est??n en el listado de Referencias y todas las referencias son utilizadas en el art??culo.',1);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'SuperAdmin'),(2,'Administrador'),(3,'Acad??mico'),(4,'Estudiante'),(5,'Egresado');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `roomID` int NOT NULL AUTO_INCREMENT,
  `buildingID` int NOT NULL,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `floor` int NOT NULL,
  `capacity` int DEFAULT NULL,
  `width` int NOT NULL,
  `length` int NOT NULL,
  `height` int NOT NULL,
  `photoURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `formatID` int DEFAULT NULL,
  PRIMARY KEY (`roomID`),
  KEY `fk_building_buildingID_idx` (`buildingID`),
  KEY `fk_format_formatID_idx` (`formatID`),
  CONSTRAINT `fk_room_buildingID` FOREIGN KEY (`buildingID`) REFERENCES `building` (`buildingID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_room_formatID` FOREIGN KEY (`formatID`) REFERENCES `format` (`formatID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomHasObject`
--

DROP TABLE IF EXISTS `roomHasObject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomHasObject` (
  `roomHasObjectID` int NOT NULL AUTO_INCREMENT,
  `roomID` int NOT NULL,
  `objectID` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`roomHasObjectID`),
  KEY `fk_inventoryHasRoom_room1_idx` (`roomID`),
  KEY `fk_inventoryHasRoom_object1_idx` (`objectID`),
  CONSTRAINT `fk_roomHasObject_objectID` FOREIGN KEY (`objectID`) REFERENCES `object` (`objectID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_roomHasObject_roomID` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomHasObject`
--

LOCK TABLES `roomHasObject` WRITE;
/*!40000 ALTER TABLE `roomHasObject` DISABLE KEYS */;
/*!40000 ALTER TABLE `roomHasObject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubric`
--

DROP TABLE IF EXISTS `rubric`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubric` (
  `rubricID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `templateID` int DEFAULT NULL,
  PRIMARY KEY (`rubricID`),
  KEY `fk_rubric_templateID1_idx` (`templateID`),
  CONSTRAINT `fk_rubric_templateID` FOREIGN KEY (`templateID`) REFERENCES `template` (`templateID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubric`
--

LOCK TABLES `rubric` WRITE;
/*!40000 ALTER TABLE `rubric` DISABLE KEYS */;
INSERT INTO `rubric` VALUES (1,'Rubrica 1','Esta es la descripci??n de la Rubrica 3',NULL),(2,'Rubrica 2','Rubrica para el Anteproyecto',NULL),(3,'Rubrica 3','Rubrica para la evaluaci??n de la Tesis',NULL);
/*!40000 ALTER TABLE `rubric` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubricHasQuestion`
--

DROP TABLE IF EXISTS `rubricHasQuestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubricHasQuestion` (
  `rubricHasQuestionID` int NOT NULL AUTO_INCREMENT,
  `rubricHasSectionID` int NOT NULL,
  `questionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL,
  PRIMARY KEY (`rubricHasQuestionID`),
  KEY `fk_table1_question1_idx` (`questionID`),
  KEY `fk_sectionHasQuestion_rubric1_idx` (`rubricHasSectionID`),
  CONSTRAINT `fk_rubricHasQuestion_questionID` FOREIGN KEY (`questionID`) REFERENCES `question` (`questionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rubricHasQuestion_rubricID` FOREIGN KEY (`rubricHasSectionID`) REFERENCES `rubricHasSection` (`rubricHasSectionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubricHasQuestion`
--

LOCK TABLES `rubricHasQuestion` WRITE;
/*!40000 ALTER TABLE `rubricHasQuestion` DISABLE KEYS */;
/*!40000 ALTER TABLE `rubricHasQuestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubricHasSection`
--

DROP TABLE IF EXISTS `rubricHasSection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubricHasSection` (
  `rubricHasSectionID` int NOT NULL AUTO_INCREMENT,
  `rubricID` int NOT NULL,
  `sectionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL,
  PRIMARY KEY (`rubricHasSectionID`),
  KEY `fk_rubricHasSection_rubricID1_idx` (`rubricID`),
  KEY `fk_rubricHasSection_sectionID1_idx` (`sectionID`),
  CONSTRAINT `fk_rubricHasSection_rubricID1` FOREIGN KEY (`rubricID`) REFERENCES `rubric` (`rubricID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rubricHasSection_sectionID1` FOREIGN KEY (`sectionID`) REFERENCES `section` (`sectionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubricHasSection`
--

LOCK TABLES `rubricHasSection` WRITE;
/*!40000 ALTER TABLE `rubricHasSection` DISABLE KEYS */;
/*!40000 ALTER TABLE `rubricHasSection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `sectionID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`sectionID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,'Preguntas',1),(2,'Pertenencia y relevancia te??rica',1),(3,'Coherencia argumentativa',1),(4,'Referencia bibliogr??ficas',1);
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semester`
--

DROP TABLE IF EXISTS `semester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semester` (
  `semesterID` int NOT NULL AUTO_INCREMENT,
  `year` year NOT NULL,
  `semesterNumber` tinyint NOT NULL,
  `startDate` date NOT NULL,
  `finishDate` date NOT NULL,
  PRIMARY KEY (`semesterID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semester`
--

LOCK TABLES `semester` WRITE;
/*!40000 ALTER TABLE `semester` DISABLE KEYS */;
INSERT INTO `semester` VALUES (1,2023,1,'2023-11-20','2023-12-28'),(2,2023,2,'2023-11-25','2023-11-23'),(3,2024,1,'2024-01-25','2023-11-23'),(4,2024,2,'2024-01-25','2023-11-23'),(5,2025,1,'2024-01-25','2023-11-23'),(6,2025,2,'2024-01-25','2023-11-23');
/*!40000 ALTER TABLE `semester` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semesterStatus`
--

DROP TABLE IF EXISTS `semesterStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semesterStatus` (
  `semesterStatusID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`semesterStatusID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semesterStatus`
--

LOCK TABLES `semesterStatus` WRITE;
/*!40000 ALTER TABLE `semesterStatus` DISABLE KEYS */;
INSERT INTO `semesterStatus` VALUES (1,'En proceso','Est?? en desarrollo.'),(2,'Aprobado','El estudiante ha sido aprobado.'),(3,'Rechazado','El estudiante ha sido rechazado.'),(4,'Cancelado','El estudiante ha cancelado su matr??cula.'),(5,'En evaluaci??n','El estudiante est?? realizando alguna de las evaluaciones o esperando su revisi??n.');
/*!40000 ALTER TABLE `semesterStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialization`
--

DROP TABLE IF EXISTS `specialization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialization` (
  `specializationID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`specializationID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialization`
--

LOCK TABLES `specialization` WRITE;
/*!40000 ALTER TABLE `specialization` DISABLE KEYS */;
INSERT INTO `specialization` VALUES (1,'Sin especializaci??n'),(2,'Gesti??n e Innovaci??n'),(3,'Did??ctica y Evaluaci??n'),(4,'Diversidad e Interculturalidad en Educaci??n');
/*!40000 ALTER TABLE `specialization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stageAnswer`
--

DROP TABLE IF EXISTS `stageAnswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stageAnswer` (
  `stageAnswerID` int NOT NULL AUTO_INCREMENT,
  `thesisEvaluatorID` int NOT NULL,
  `rubricHasQuestionID` int NOT NULL,
  `answer` enum('Muy Deficiente','Deficiente','Insuficiente','Aceptable','Buena','Muy Buena','Excelente') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`stageAnswerID`),
  KEY `fk_stageAnswer_questionID_idx` (`rubricHasQuestionID`),
  KEY `fk_stageAnswer_thesisEvaluatorID_idx` (`thesisEvaluatorID`),
  CONSTRAINT `fk_stageAnswer_rubricHasQuestionID` FOREIGN KEY (`rubricHasQuestionID`) REFERENCES `rubricHasQuestion` (`rubricHasQuestionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_stageAnswer_thesisEvaluatorID` FOREIGN KEY (`thesisEvaluatorID`) REFERENCES `thesisEvaluator` (`thesisEvaluatorID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stageAnswer`
--

LOCK TABLES `stageAnswer` WRITE;
/*!40000 ALTER TABLE `stageAnswer` DISABLE KEYS */;
/*!40000 ALTER TABLE `stageAnswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `student`
--

DROP TABLE IF EXISTS `student`;
/*!50001 DROP VIEW IF EXISTS `student`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `student` AS SELECT 
 1 AS `userID`,
 1 AS `rut`,
 1 AS `firstName`,
 1 AS `secondName`,
 1 AS `surname1`,
 1 AS `surname2`,
 1 AS `sex`,
 1 AS `civilStatus`,
 1 AS `birthday`,
 1 AS `address`,
 1 AS `email`,
 1 AS `personalEmail`,
 1 AS `phone`,
 1 AS `entry`,
 1 AS `group`,
 1 AS `workPlace`,
 1 AS `phoneWork`,
 1 AS `job`,
 1 AS `articulation`,
 1 AS `titlesID`,
 1 AS `titles`,
 1 AS `studentHasTitlesID`,
 1 AS `studentHasSpecializationID`,
 1 AS `specializationID`,
 1 AS `specializationName`,
 1 AS `studentHasElectiveID1`,
 1 AS `electiveID1`,
 1 AS `electiveName1`,
 1 AS `studentHasElectiveID2`,
 1 AS `electiveID2`,
 1 AS `electiveName2`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `studentHasElective`
--

DROP TABLE IF EXISTS `studentHasElective`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentHasElective` (
  `studentHasElectiveID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `electiveID` int NOT NULL,
  `semesterID` int NOT NULL,
  PRIMARY KEY (`studentHasElectiveID`),
  UNIQUE KEY `semesterID_UNIQUE` (`userID`,`semesterID`),
  KEY `fk_studentHasElective_userID_idx` (`userID`),
  KEY `fk_studentHasElective_electiveID_idx` (`electiveID`),
  KEY `fk_studentHasElective_semesterID_idx` (`semesterID`),
  CONSTRAINT `fk_studentHasElective_electiveID` FOREIGN KEY (`electiveID`) REFERENCES `elective` (`electiveID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_studentHasElective_semesterID` FOREIGN KEY (`semesterID`) REFERENCES `semester` (`semesterID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_studentHasElective_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentHasElective`
--

LOCK TABLES `studentHasElective` WRITE;
/*!40000 ALTER TABLE `studentHasElective` DISABLE KEYS */;
INSERT INTO `studentHasElective` VALUES (1,1,1,1),(2,1,7,2),(3,5,3,1),(4,5,9,2),(5,5,1,3),(6,5,7,4);
/*!40000 ALTER TABLE `studentHasElective` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentHasSemester`
--

DROP TABLE IF EXISTS `studentHasSemester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentHasSemester` (
  `studentHasSemesterID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `semesterID` int NOT NULL,
  `specializationID` int NOT NULL DEFAULT '1',
  `evaluationStatusID` int DEFAULT NULL,
  `evaluationTypeID` int DEFAULT NULL,
  PRIMARY KEY (`studentHasSemesterID`),
  UNIQUE KEY `unique_user_semester` (`userID`,`semesterID`),
  KEY `fk_Name_semester1_idx` (`semesterID`),
  KEY `fk_studentHasSemester_specializationID1_idx` (`specializationID`),
  KEY `fk_studentHasSemester_evaluationStatusID_idx` (`evaluationStatusID`),
  KEY `fk_studentHasSemester_evaluationTypeID_idx` (`evaluationTypeID`),
  CONSTRAINT `fk_studentHasSemester_evaluationStatusID` FOREIGN KEY (`evaluationStatusID`) REFERENCES `evaluationStatus` (`evaluationStatusID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_studentHasSemester_evaluationTypeID` FOREIGN KEY (`evaluationTypeID`) REFERENCES `evaluationType` (`evaluationTypeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_studentHasSemester_semesterID` FOREIGN KEY (`semesterID`) REFERENCES `semester` (`semesterID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_studentHasSemester_specializationID` FOREIGN KEY (`specializationID`) REFERENCES `specialization` (`specializationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_studentHasSemester_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentHasSemester`
--

LOCK TABLES `studentHasSemester` WRITE;
/*!40000 ALTER TABLE `studentHasSemester` DISABLE KEYS */;
INSERT INTO `studentHasSemester` VALUES (1,1,1,2,NULL,NULL),(2,2,2,3,NULL,NULL),(3,3,3,4,NULL,NULL);
/*!40000 ALTER TABLE `studentHasSemester` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentHasSpecialization`
--

DROP TABLE IF EXISTS `studentHasSpecialization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentHasSpecialization` (
  `studentHasSpecializationID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `specializationID` int NOT NULL,
  `entrySemesterID` int NOT NULL,
  `completionSemesterID` int DEFAULT NULL,
  `semesterStatusID` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`studentHasSpecializationID`),
  UNIQUE KEY `unique_user_specialization` (`userID`,`specializationID`) /*!80000 INVISIBLE */,
  KEY `fk_studentHasSpecialization_specialization1_idx` (`specializationID`) /*!80000 INVISIBLE */,
  KEY `fk_studentHasSpecialization_user1_idx` (`userID`),
  KEY `fk_completionSemester_idx` (`entrySemesterID`),
  KEY `fk_completionSemester_idx1` (`completionSemesterID`) /*!80000 INVISIBLE */,
  KEY `fk_studentHasSpecialization_statusID1_idx` (`semesterStatusID`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_studentHasSpecialization_completionSemesterID` FOREIGN KEY (`completionSemesterID`) REFERENCES `semester` (`semesterID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_studentHasSpecialization_entrySemesterID` FOREIGN KEY (`entrySemesterID`) REFERENCES `semester` (`semesterID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_studentHasSpecialization_semesterStatusID` FOREIGN KEY (`semesterStatusID`) REFERENCES `semesterStatus` (`semesterStatusID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_studentHasSpecialization_specializationID` FOREIGN KEY (`specializationID`) REFERENCES `specialization` (`specializationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_studentHasSpecialization_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentHasSpecialization`
--

LOCK TABLES `studentHasSpecialization` WRITE;
/*!40000 ALTER TABLE `studentHasSpecialization` DISABLE KEYS */;
INSERT INTO `studentHasSpecialization` VALUES (1,2,2,1,2,1),(2,5,3,1,NULL,1),(3,5,2,1,NULL,1);
/*!40000 ALTER TABLE `studentHasSpecialization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentHasTitle`
--

DROP TABLE IF EXISTS `studentHasTitle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentHasTitle` (
  `studentHasTitleID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `titleID` int NOT NULL,
  `titleYear` year NOT NULL,
  `archiveURL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `formatID` int NOT NULL,
  PRIMARY KEY (`studentHasTitleID`),
  KEY `fk_rolHasTitle_title1_idx` (`titleID`),
  KEY `fk_rolHasTitle_format1_idx` (`formatID`),
  KEY `fk_rolHasTitle_user1_idx` (`userID`),
  CONSTRAINT `fk_studentHasTitle_formatID` FOREIGN KEY (`formatID`) REFERENCES `format` (`formatID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_studentHasTitle_titleID` FOREIGN KEY (`titleID`) REFERENCES `title` (`titleID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_studentHasTitle_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentHasTitle`
--

LOCK TABLES `studentHasTitle` WRITE;
/*!40000 ALTER TABLE `studentHasTitle` DISABLE KEYS */;
INSERT INTO `studentHasTitle` VALUES (1,1,1,2023,'',1);
/*!40000 ALTER TABLE `studentHasTitle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_evaluator`
--

DROP TABLE IF EXISTS `student_evaluator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_evaluator` (
  `userID` int NOT NULL,
  `teacher_rubricID` int NOT NULL,
  PRIMARY KEY (`teacher_rubricID`,`userID`),
  KEY `fk_student_evaluator_userID_idx` (`userID`),
  KEY `fk_student_evaluator_teacher_rubricID_idx` (`teacher_rubricID`),
  CONSTRAINT `fk_student_evaluator_teacher_rubricID` FOREIGN KEY (`teacher_rubricID`) REFERENCES `teacher_rubric` (`teacher_rubricID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_student_evaluator_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_evaluator`
--

LOCK TABLES `student_evaluator` WRITE;
/*!40000 ALTER TABLE `student_evaluator` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_evaluator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_question`
--

DROP TABLE IF EXISTS `teacher_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_question` (
  `teacher_questionID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `question` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`teacher_questionID`),
  KEY `fk_question_user1_idx` (`userID`),
  CONSTRAINT `fk_teacher_question_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_question`
--

LOCK TABLES `teacher_question` WRITE;
/*!40000 ALTER TABLE `teacher_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_rubric`
--

DROP TABLE IF EXISTS `teacher_rubric`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_rubric` (
  `teacher_rubricID` int NOT NULL AUTO_INCREMENT,
  `assignedSpecializationID` int NOT NULL,
  `teacher_templateID` int DEFAULT NULL,
  PRIMARY KEY (`teacher_rubricID`),
  KEY `fk_assignedSpecializationID1_idx` (`assignedSpecializationID`),
  KEY `fk_teacher_templateID_idx` (`teacher_templateID`),
  CONSTRAINT `fk_teacher_rubric_assignedSpecializationID` FOREIGN KEY (`assignedSpecializationID`) REFERENCES `assignedSpecialization` (`assignedSpecializationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_teacher_rubric_teacher_templateID` FOREIGN KEY (`teacher_templateID`) REFERENCES `teacher_template` (`teacher_templateID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_rubric`
--

LOCK TABLES `teacher_rubric` WRITE;
/*!40000 ALTER TABLE `teacher_rubric` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_rubric` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_rubricHasQuestion`
--

DROP TABLE IF EXISTS `teacher_rubricHasQuestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_rubricHasQuestion` (
  `teacher_rubricHasQuestionID` int NOT NULL AUTO_INCREMENT,
  `teacher_rubricHasSectionID` int NOT NULL,
  `teacher_questionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL,
  `excellent` smallint DEFAULT NULL,
  `good` smallint DEFAULT NULL,
  `medium` smallint DEFAULT NULL,
  `bad` smallint DEFAULT NULL,
  PRIMARY KEY (`teacher_rubricHasQuestionID`),
  KEY `fk_teacher_rubricHasQuestion_techer_questionID1_idx` (`teacher_questionID`),
  KEY `fk_teacher_rubricHasQuestion_teacher_rubricID1_idx` (`teacher_rubricHasSectionID`),
  CONSTRAINT `fk_teacher_rubricHasQuestion_teacher_questionID` FOREIGN KEY (`teacher_questionID`) REFERENCES `teacher_question` (`teacher_questionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_teacher_rubricHasQuestion_teacher_rubricID` FOREIGN KEY (`teacher_rubricHasSectionID`) REFERENCES `teacher_rubricHasSection` (`teacher_rubricHasSectionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_rubricHasQuestion`
--

LOCK TABLES `teacher_rubricHasQuestion` WRITE;
/*!40000 ALTER TABLE `teacher_rubricHasQuestion` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_rubricHasQuestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_rubricHasSection`
--

DROP TABLE IF EXISTS `teacher_rubricHasSection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_rubricHasSection` (
  `teacher_rubricHasSectionID` int NOT NULL AUTO_INCREMENT,
  `teacher_rubricID` int NOT NULL,
  `teacher_sectionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL,
  PRIMARY KEY (`teacher_rubricHasSectionID`),
  KEY `fk_teacher_rubricHasSection_teacher_rubricID1_idx` (`teacher_rubricID`),
  KEY `fk_teacher_rubricHasSection_teacher_sectionID1_idx` (`teacher_sectionID`),
  CONSTRAINT `fk_teacher_rubricHasSection_teacher_rubricID` FOREIGN KEY (`teacher_rubricID`) REFERENCES `teacher_rubric` (`teacher_rubricID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_teacher_rubricHasSection_teacher_sectionID` FOREIGN KEY (`teacher_sectionID`) REFERENCES `teacher_section` (`teacher_sectionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_rubricHasSection`
--

LOCK TABLES `teacher_rubricHasSection` WRITE;
/*!40000 ALTER TABLE `teacher_rubricHasSection` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_rubricHasSection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_section`
--

DROP TABLE IF EXISTS `teacher_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_section` (
  `teacher_sectionID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`teacher_sectionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_section`
--

LOCK TABLES `teacher_section` WRITE;
/*!40000 ALTER TABLE `teacher_section` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_template`
--

DROP TABLE IF EXISTS `teacher_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_template` (
  `teacher_templateID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`teacher_templateID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_template`
--

LOCK TABLES `teacher_template` WRITE;
/*!40000 ALTER TABLE `teacher_template` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_templateHasQuestion`
--

DROP TABLE IF EXISTS `teacher_templateHasQuestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_templateHasQuestion` (
  `teacher_templateHasQuestionID` int NOT NULL AUTO_INCREMENT,
  `teacher_templateHasSectionID` int NOT NULL,
  `teacher_questionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL,
  PRIMARY KEY (`teacher_templateHasQuestionID`),
  KEY `fk_templateHasQuestion_questionID10_idx` (`teacher_questionID`),
  KEY `fk_templateHasQuestion_templateHasSectionID1_idx` (`teacher_templateHasSectionID`),
  CONSTRAINT `fk_teacher_templateHasQuestion_questionID` FOREIGN KEY (`teacher_questionID`) REFERENCES `teacher_question` (`teacher_questionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_teacher_templateHasQuestion_templateHasSectionID` FOREIGN KEY (`teacher_templateHasSectionID`) REFERENCES `teacher_templateHasSection` (`teacher_templateHasSectionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_templateHasQuestion`
--

LOCK TABLES `teacher_templateHasQuestion` WRITE;
/*!40000 ALTER TABLE `teacher_templateHasQuestion` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_templateHasQuestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_templateHasSection`
--

DROP TABLE IF EXISTS `teacher_templateHasSection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_templateHasSection` (
  `teacher_templateHasSectionID` int NOT NULL AUTO_INCREMENT,
  `teacher_templateID` int NOT NULL,
  `teacher_sectionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL,
  PRIMARY KEY (`teacher_templateHasSectionID`),
  KEY `fk_teacher_templateHasSection_teacher_sectionID1_idx` (`teacher_sectionID`),
  KEY `fk_teacher_templateHasSection_teacher_templateID1_idx` (`teacher_templateID`),
  CONSTRAINT `fk_teacher_templateHasSection_teacher_sectionID` FOREIGN KEY (`teacher_sectionID`) REFERENCES `teacher_section` (`teacher_sectionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_teacher_templateHasSection_teacher_templateID` FOREIGN KEY (`teacher_templateID`) REFERENCES `teacher_template` (`teacher_templateID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_templateHasSection`
--

LOCK TABLES `teacher_templateHasSection` WRITE;
/*!40000 ALTER TABLE `teacher_templateHasSection` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_templateHasSection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template`
--

DROP TABLE IF EXISTS `template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `template` (
  `templateID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`templateID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template`
--

LOCK TABLES `template` WRITE;
/*!40000 ALTER TABLE `template` DISABLE KEYS */;
INSERT INTO `template` VALUES (1,'Plantilla por defecto','Plantilla utilizada por defecto para las r??bricas de anteproyecto.',1);
/*!40000 ALTER TABLE `template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templateHasQuestion`
--

DROP TABLE IF EXISTS `templateHasQuestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `templateHasQuestion` (
  `templateHasQuestionID` int NOT NULL AUTO_INCREMENT,
  `templateHasSectionID` int NOT NULL,
  `questionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL,
  PRIMARY KEY (`templateHasQuestionID`),
  KEY `fk_templateHasQuestion_questionID1_idx` (`questionID`),
  KEY `fk_templateHasQuestion_templateID1_idx` (`templateHasSectionID`),
  CONSTRAINT `fk_templateHasQuestion_questionID` FOREIGN KEY (`questionID`) REFERENCES `question` (`questionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_templateHasQuestion_templateHasSectionID` FOREIGN KEY (`templateHasSectionID`) REFERENCES `templateHasSection` (`templateHasSectionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templateHasQuestion`
--

LOCK TABLES `templateHasQuestion` WRITE;
/*!40000 ALTER TABLE `templateHasQuestion` DISABLE KEYS */;
INSERT INTO `templateHasQuestion` VALUES (1,1,1,1),(2,1,2,2),(3,2,3,1),(4,2,4,2),(5,2,5,3),(6,3,6,1),(7,3,7,2),(8,3,8,3);
/*!40000 ALTER TABLE `templateHasQuestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templateHasSection`
--

DROP TABLE IF EXISTS `templateHasSection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `templateHasSection` (
  `templateHasSectionID` int NOT NULL AUTO_INCREMENT,
  `templateID` int NOT NULL,
  `sectionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL,
  PRIMARY KEY (`templateHasSectionID`),
  KEY `fk_templateHasSection_templateID_idx` (`templateID`),
  KEY `fk_templateHasSection_sectionID1_idx` (`sectionID`),
  CONSTRAINT `fk_templateHasSection_sectionID` FOREIGN KEY (`sectionID`) REFERENCES `section` (`sectionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_templateHasSection_templateID` FOREIGN KEY (`templateID`) REFERENCES `template` (`templateID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templateHasSection`
--

LOCK TABLES `templateHasSection` WRITE;
/*!40000 ALTER TABLE `templateHasSection` DISABLE KEYS */;
INSERT INTO `templateHasSection` VALUES (1,1,2,1),(2,1,3,2),(3,1,4,3);
/*!40000 ALTER TABLE `templateHasSection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `thesisEvaluation`
--

DROP TABLE IF EXISTS `thesisEvaluation`;
/*!50001 DROP VIEW IF EXISTS `thesisEvaluation`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `thesisEvaluation` AS SELECT 
 1 AS `evaluationID`,
 1 AS `studentHasSemesterID`,
 1 AS `projectURL`,
 1 AS `formatID`,
 1 AS `creationDate`,
 1 AS `updateDate`,
 1 AS `lateMinutes`,
 1 AS `thesisGradesID`,
 1 AS `semesterID`,
 1 AS `year`,
 1 AS `semesterNumber`,
 1 AS `startDate`,
 1 AS `finishDate`,
 1 AS `userID`,
 1 AS `rut`,
 1 AS `fullName`,
 1 AS `email`,
 1 AS `specializationID`,
 1 AS `specializationName`,
 1 AS `thesis_statusID`,
 1 AS `thesis_status`,
 1 AS `thesis_statusDescription`,
 1 AS `finalGrade`,
 1 AS `stage1_grade`,
 1 AS `stage2_grade`,
 1 AS `stage3_grade`,
 1 AS `director_grade1`,
 1 AS `director_grade2`,
 1 AS `codirector_grade1`,
 1 AS `codirector_grade2`,
 1 AS `programDirector_grade1`,
 1 AS `programDirector_grade2`,
 1 AS `academicA_grade1`,
 1 AS `academicA_grade2`,
 1 AS `academicB_grade1`,
 1 AS `academicB_grade2`,
 1 AS `rubric_rubricID`,
 1 AS `rubric_name`,
 1 AS `rubric_description`,
 1 AS `rubric_templateID`,
 1 AS `director_thesisEvaluatorID`,
 1 AS `director_userID`,
 1 AS `director_fullName`,
 1 AS `director_rut`,
 1 AS `director_email`,
 1 AS `codirector_thesisEvaluatorID`,
 1 AS `codirector_userID`,
 1 AS `codirector_fullName`,
 1 AS `codirector_rut`,
 1 AS `codirector_email`,
 1 AS `programDirector_thesisEvaluatorID`,
 1 AS `programDirector_userID`,
 1 AS `programDirector_fullName`,
 1 AS `programDirector_rut`,
 1 AS `programDirector_email`,
 1 AS `academicA_thesisEvaluatorID`,
 1 AS `academicA_userID`,
 1 AS `academicA_fullName`,
 1 AS `academicA_rut`,
 1 AS `academicA_email`,
 1 AS `academicB_thesisEvaluatorID`,
 1 AS `academicB_userID`,
 1 AS `academicB_fullName`,
 1 AS `academicB_rut`,
 1 AS `academicB_email`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `thesisEvaluator`
--

DROP TABLE IF EXISTS `thesisEvaluator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thesisEvaluator` (
  `thesisEvaluatorID` int NOT NULL AUTO_INCREMENT,
  `evaluationID` int NOT NULL,
  `userID` int NOT NULL,
  `evaluatorCategoryID` int NOT NULL,
  `grade1` float DEFAULT NULL,
  `grade2` float DEFAULT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`thesisEvaluatorID`),
  KEY `fk_thesisEvaluator_userID_idx` (`userID`),
  KEY `fk_thesisEvaluator_evaluatorCategoryID_idx` (`evaluatorCategoryID`),
  KEY `fk_thesisEvaluator_evaluationID_idx` (`evaluationID`),
  CONSTRAINT `fk_thesisEvaluator_evaluationID` FOREIGN KEY (`evaluationID`) REFERENCES `evaluation` (`evaluationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_thesisEvaluator_evaluatorCategoryID` FOREIGN KEY (`evaluatorCategoryID`) REFERENCES `evaluatorCategory` (`evaluatorCategoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_thesisEvaluator_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thesisEvaluator`
--

LOCK TABLES `thesisEvaluator` WRITE;
/*!40000 ALTER TABLE `thesisEvaluator` DISABLE KEYS */;
/*!40000 ALTER TABLE `thesisEvaluator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thesisGrades`
--

DROP TABLE IF EXISTS `thesisGrades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thesisGrades` (
  `thesisGradesID` int NOT NULL AUTO_INCREMENT,
  `finalGrade` float DEFAULT NULL,
  `grade1` float DEFAULT NULL,
  `grade2` float DEFAULT NULL,
  `grade3` float DEFAULT NULL,
  PRIMARY KEY (`thesisGradesID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thesisGrades`
--

LOCK TABLES `thesisGrades` WRITE;
/*!40000 ALTER TABLE `thesisGrades` DISABLE KEYS */;
/*!40000 ALTER TABLE `thesisGrades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thesisRegistration`
--

DROP TABLE IF EXISTS `thesisRegistration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thesisRegistration` (
  `thesisRegistrationID` int NOT NULL AUTO_INCREMENT,
  `studentID` int NOT NULL,
  `directorID` int NOT NULL,
  `codirectorID` int DEFAULT NULL,
  `title` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`thesisRegistrationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thesisRegistration`
--

LOCK TABLES `thesisRegistration` WRITE;
/*!40000 ALTER TABLE `thesisRegistration` DISABLE KEYS */;
/*!40000 ALTER TABLE `thesisRegistration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `title`
--

DROP TABLE IF EXISTS `title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `title` (
  `titleID` int NOT NULL AUTO_INCREMENT,
  `universityID` int NOT NULL,
  `degreeID` int NOT NULL,
  `name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `areaID` int DEFAULT NULL,
  PRIMARY KEY (`titleID`),
  KEY `fk_titles_type1_idx` (`degreeID`),
  KEY `fk_title_university1_idx` (`universityID`),
  KEY `fk_title_areaID_idx` (`areaID`),
  CONSTRAINT `fk_title_areaID` FOREIGN KEY (`areaID`) REFERENCES `area` (`areaID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_title_universityID` FOREIGN KEY (`universityID`) REFERENCES `university` (`universityID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_titles_degreeID` FOREIGN KEY (`degreeID`) REFERENCES `degree` (`degreeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `title`
--

LOCK TABLES `title` WRITE;
/*!40000 ALTER TABLE `title` DISABLE KEYS */;
INSERT INTO `title` VALUES (1,1,1,'Mag??ster en Historia',NULL),(2,1,1,'Mag??ster en Ciencias con Menci??n en Matem??tica',NULL);
/*!40000 ALTER TABLE `title` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `titleHasUniversity`
--

DROP TABLE IF EXISTS `titleHasUniversity`;
/*!50001 DROP VIEW IF EXISTS `titleHasUniversity`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `titleHasUniversity` AS SELECT 
 1 AS `titleID`,
 1 AS `universityID`,
 1 AS `degreeID`,
 1 AS `name`,
 1 AS `areaID`,
 1 AS `universityName`,
 1 AS `country`,
 1 AS `city`,
 1 AS `degree`,
 1 AS `type`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `university`
--

DROP TABLE IF EXISTS `university`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `university` (
  `universityID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`universityID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university`
--

LOCK TABLES `university` WRITE;
/*!40000 ALTER TABLE `university` DISABLE KEYS */;
INSERT INTO `university` VALUES (1,'Universidad de Tarapac??','Arica','Chile');
/*!40000 ALTER TABLE `university` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `rut` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `secondName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `surname1` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname2` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `civilStatus` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` date NOT NULL,
  `address` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `personalEmail` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(14) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `entry` year DEFAULT NULL,
  `group` int DEFAULT NULL,
  `workPlace` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneWork` varchar(14) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `job` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `articulation` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'20.123.233-1','Leonardo','Leonardo','Rodr??guez','Fernandez','M','Soltero/a','2023-01-31','Psje. Paine 2827','Leonardo.Rodr??guez@alumnos.uta.cl',NULL,'121345567',2023,1,NULL,NULL,NULL,0),(2,'20.123.455-7','Sebastian','Sebastian','torres','Torres','M','Soltero/a','2023-08-01','Linderos 3731','Sebastian.Torres@alumnos.uta.cl',NULL,'123456781',2023,1,NULL,NULL,NULL,0),(3,'20.123.233-3','Leonardo1','Leonardo1','Rodr??guez1','Rodr??guez1','M','Soltero/a','2023-01-01','Orozimbo Barbosa 3720','Leonardo.Rodr??guez1@alumnos.uta.cl',NULL,'912134556',2023,1,'Universidad de Tarapac??','964873634','Docente de Historia',1),(4,'20.123.233-4','Leonardo2','Leonardo2','Rodr??guez2','Rodr??guez2','M','Soltero/a','2023-01-31','Orozimbo','Leonardo.Rodr??guez2@alumnos.uta.cl',NULL,'123456789',2023,1,NULL,NULL,NULL,NULL),(5,'20.547.055-7','Leonardo3','Leonardo3','Rodr??guez3','Rodr??guez3','M','Soltero/a','2000-09-12','s','Leonardo.Rodr??guez3@alumnos.uta.cl',NULL,'966234532',2023,1,NULL,NULL,NULL,NULL),(12,'12.000.000-1','Admin',NULL,'Principal',NULL,'M',NULL,'1990-01-01',NULL,'admin@ejemplo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'14.000.000-2','Admin3',NULL,'User',NULL,'M',NULL,'1990-01-01',NULL,'admin3@ejemplo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'15.000.000-3','Admin5',NULL,'User',NULL,'M',NULL,'1990-01-01',NULL,'admin5@ejemplo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'16.000.000-4','Admin6',NULL,'User',NULL,'M',NULL,'1990-01-01',NULL,'admin6@ejemplo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'17.000.000-5','Admin7',NULL,'User',NULL,'M',NULL,'1990-01-01',NULL,'admin7@ejemplo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'18.000.000-6','Test',NULL,'User',NULL,'M',NULL,'1990-01-01',NULL,'test@ejemplo.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'12.345.678-9','Carlos','Alberto','Mart??nez','L??pez','M','Casado','1985-12-03','Calle Secundaria 456','carlos.martinez@alumnos.uta.cl','carlos@personal.com','987654322',2021,1,'Corporaci??n XYZ','','Analista',1),(20,'18.765.432-1','Mar??a','Elena','Gonz??lez','P??rez','F','Soltera','1988-05-15','Av. Principal 123','maria.gonzalez@alumnos.uta.cl','maria@personal.com','987654321',2022,2,'Empresa ABC','123456789','Ingeniera',1),(21,'19.876.543-2','Carlos','Alberto','Mart??nez','L??pez','M','Casado','1985-12-03','Calle Secundaria 456','carlos.martinez@alumnos.uta.cl','carlos@personal.com','987654322',2021,1,'Corporaci??n XYZ','123456790','Analista',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userHasClassification`
--

DROP TABLE IF EXISTS `userHasClassification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userHasClassification` (
  `userID` int NOT NULL,
  `classificationID` int NOT NULL,
  `classifiedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `classifiedBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`userID`,`classificationID`),
  KEY `idx_user_classification` (`userID`),
  KEY `idx_classification_user` (`classificationID`),
  CONSTRAINT `userHasClassification_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE,
  CONSTRAINT `userHasClassification_ibfk_2` FOREIGN KEY (`classificationID`) REFERENCES `classification` (`classificationID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userHasClassification`
--

LOCK TABLES `userHasClassification` WRITE;
/*!40000 ALTER TABLE `userHasClassification` DISABLE KEYS */;
INSERT INTO `userHasClassification` VALUES (3,4,'2025-10-14 03:36:12','system'),(5,4,'2025-10-14 03:36:12','system'),(21,4,'2025-10-14 03:36:12','system');
/*!40000 ALTER TABLE `userHasClassification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userHasPermission`
--

DROP TABLE IF EXISTS `userHasPermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userHasPermission` (
  `userHasPermissionID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `permissionID` int NOT NULL,
  `dueDate` timestamp NOT NULL,
  PRIMARY KEY (`userHasPermissionID`),
  KEY `fk_userHasPermission_userID_idx` (`userID`),
  KEY `fk_userHasPermission_permissionID_idx` (`permissionID`),
  CONSTRAINT `fk_userHasPermission_permissionID` FOREIGN KEY (`permissionID`) REFERENCES `permission` (`permissionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userHasPermission_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userHasPermission`
--

LOCK TABLES `userHasPermission` WRITE;
/*!40000 ALTER TABLE `userHasPermission` DISABLE KEYS */;
/*!40000 ALTER TABLE `userHasPermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userHasRole`
--

DROP TABLE IF EXISTS `userHasRole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userHasRole` (
  `userID` int NOT NULL,
  `roleID` int NOT NULL,
  PRIMARY KEY (`userID`,`roleID`),
  KEY `fk_rolUser_user1_idx` (`userID`),
  KEY `fk_rolUser_rol1_idx` (`roleID`),
  CONSTRAINT `fk_userHasRole_roleID` FOREIGN KEY (`roleID`) REFERENCES `role` (`roleID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userHasRole_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userHasRole`
--

LOCK TABLES `userHasRole` WRITE;
/*!40000 ALTER TABLE `userHasRole` DISABLE KEYS */;
INSERT INTO `userHasRole` VALUES (1,1),(1,2),(2,1),(2,2),(2,3),(2,4),(3,2),(3,4),(4,2),(4,3),(5,3),(5,4),(12,1),(12,2),(14,2),(15,2),(16,2),(17,2),(18,2),(19,1),(19,4),(20,5),(21,1),(21,2),(21,5);
/*!40000 ALTER TABLE `userHasRole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `userHasRoles`
--

DROP TABLE IF EXISTS `userHasRoles`;
/*!50001 DROP VIEW IF EXISTS `userHasRoles`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `userHasRoles` AS SELECT 
 1 AS `userID`,
 1 AS `rut`,
 1 AS `firstName`,
 1 AS `secondName`,
 1 AS `surname1`,
 1 AS `surname2`,
 1 AS `sex`,
 1 AS `civilStatus`,
 1 AS `birthday`,
 1 AS `address`,
 1 AS `email`,
 1 AS `personalEmail`,
 1 AS `phone`,
 1 AS `entry`,
 1 AS `group`,
 1 AS `workPlace`,
 1 AS `phoneWork`,
 1 AS `job`,
 1 AS `articulation`,
 1 AS `rolesID`,
 1 AS `roles`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `user_short`
--

DROP TABLE IF EXISTS `user_short`;
/*!50001 DROP VIEW IF EXISTS `user_short`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_short` AS SELECT 
 1 AS `userID`,
 1 AS `rut`,
 1 AS `fullName`,
 1 AS `email`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `usersWithRoles`
--

DROP TABLE IF EXISTS `usersWithRoles`;
/*!50001 DROP VIEW IF EXISTS `usersWithRoles`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `usersWithRoles` AS SELECT 
 1 AS `userID`,
 1 AS `role`,
 1 AS `roleID`*/;
SET character_set_client = @saved_cs_client;

--
-- Current Database: `posgrado_db`
--

USE `posgrado_db`;

--
-- Final view structure for view `academic`
--

/*!50001 DROP VIEW IF EXISTS `academic`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `academic` AS select `a`.`userID` AS `userID`,`a`.`rut` AS `rut`,`a`.`firstName` AS `firstName`,`a`.`secondName` AS `secondName`,`a`.`surname1` AS `surname1`,`a`.`surname2` AS `surname2`,`a`.`sex` AS `sex`,`a`.`civilStatus` AS `civilStatus`,`a`.`birthday` AS `birthday`,`a`.`address` AS `address`,`a`.`email` AS `email`,`a`.`personalEmail` AS `personalEmail`,`a`.`phone` AS `phone`,`a`.`entry` AS `entry`,`a`.`group` AS `group`,`a`.`workPlace` AS `workPlace`,`a`.`phoneWork` AS `phoneWork`,`a`.`job` AS `job`,`a`.`articulation` AS `articulation`,`tt`.`titlesID` AS `titlesID`,`tt`.`titles` AS `titles`,`tt`.`academicHasTitlesID` AS `academicHasTitlesID` from ((select `u`.`userID` AS `userID`,`u`.`rut` AS `rut`,`u`.`firstName` AS `firstName`,`u`.`secondName` AS `secondName`,`u`.`surname1` AS `surname1`,`u`.`surname2` AS `surname2`,`u`.`sex` AS `sex`,`u`.`civilStatus` AS `civilStatus`,`u`.`birthday` AS `birthday`,`u`.`address` AS `address`,`u`.`email` AS `email`,`u`.`personalEmail` AS `personalEmail`,`u`.`phone` AS `phone`,`u`.`entry` AS `entry`,`u`.`group` AS `group`,`u`.`workPlace` AS `workPlace`,`u`.`phoneWork` AS `phoneWork`,`u`.`job` AS `job`,`u`.`articulation` AS `articulation` from (`usersWithRoles` `uwr` join `user` `u` on((`u`.`userID` = `uwr`.`userID`))) where (`uwr`.`role` = 'Acad??mico')) `a` left join (select `aht`.`userID` AS `userID`,group_concat(`t`.`titleID` order by `t`.`titleID` ASC separator ';') AS `titlesID`,group_concat(`t`.`name` order by `t`.`titleID` ASC separator ';') AS `titles`,group_concat(`aht`.`academicHasTitleID` order by `t`.`titleID` ASC separator ';') AS `academicHasTitlesID` from (`academicHasTitle` `aht` join `title` `t` on((`t`.`titleID` = `aht`.`titleID`))) group by `aht`.`userID`) `tt` on((`a`.`userID` = `tt`.`userID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `administrative`
--

/*!50001 DROP VIEW IF EXISTS `administrative`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `administrative` AS select `u`.`userID` AS `userID`,`u`.`rut` AS `rut`,`u`.`firstName` AS `firstName`,`u`.`secondName` AS `secondName`,`u`.`surname1` AS `surname1`,`u`.`surname2` AS `surname2`,`u`.`sex` AS `sex`,`u`.`civilStatus` AS `civilStatus`,`u`.`birthday` AS `birthday`,`u`.`address` AS `address`,`u`.`email` AS `email`,`u`.`personalEmail` AS `personalEmail`,`u`.`phone` AS `phone`,`u`.`entry` AS `entry`,`u`.`group` AS `group`,`u`.`workPlace` AS `workPlace`,`u`.`phoneWork` AS `phoneWork`,`u`.`job` AS `job`,`u`.`articulation` AS `articulation`,`uwr`.`role` AS `role` from (`user` `u` join `usersWithRoles` `uwr` on((`u`.`userID` = `uwr`.`userID`))) where (`uwr`.`role` <> 'Estudiante') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `preprojectEvaluation`
--

/*!50001 DROP VIEW IF EXISTS `preprojectEvaluation`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `preprojectEvaluation` AS select `p`.`evaluationID` AS `evaluationID`,`p`.`studentHasSemesterID` AS `studentHasSemesterID`,`p`.`projectURL` AS `projectURL`,`p`.`formatID` AS `formatID`,`p`.`creationDate` AS `creationDate`,`p`.`updateDate` AS `updateDate`,`p`.`lateMinutes` AS `lateMinutes`,`es`.`evaluationStatusID` AS `preproject_statusID`,`es`.`name` AS `preproject_status`,`es`.`description` AS `preproject_statusDescription`,`pe1`.`evaluationStatusID` AS `academicA_statusID`,`pe1`.`comment1` AS `academicA_comment1`,`pe1`.`comment2` AS `academicA_comment2`,`pe1`.`comment3` AS `academicA_comment3`,`pe1`.`comment4` AS `academicA_comment4`,`pe1`.`comment5` AS `academicA_comment5`,`pe1`.`comment6` AS `academicA_comment6`,`pe1`.`comment7` AS `academicA_comment7`,`pe2`.`evaluationStatusID` AS `academicB_statusID`,`pe2`.`comment1` AS `academicB_comment1`,`pe2`.`comment2` AS `academicB_comment2`,`pe2`.`comment3` AS `academicB_comment3`,`pe2`.`comment4` AS `academicB_comment4`,`pe2`.`comment5` AS `academicB_comment5`,`pe2`.`comment6` AS `academicB_comment6`,`pe2`.`comment7` AS `academicB_comment7`,`r`.`rubricID` AS `rubric_rubricID`,`r`.`name` AS `rubric_name`,`r`.`description` AS `rubric_description`,`r`.`templateID` AS `rubric_templateID`,`s`.`semesterID` AS `semesterID`,`s`.`year` AS `year`,`s`.`semesterNumber` AS `semesterNumber`,`s`.`startDate` AS `startDate`,`s`.`finishDate` AS `finishDate`,`u`.`userID` AS `userID`,`u`.`rut` AS `rut`,`u`.`fullName` AS `fullName`,`u`.`email` AS `email`,`sp`.`specializationID` AS `specializationID`,`sp`.`name` AS `specializationName`,`es1`.`name` AS `academicA_status`,`es1`.`description` AS `academicA_statusDescription`,`es2`.`name` AS `academicB_status`,`es2`.`description` AS `academicB_statusDescription`,`pe1`.`preprojectEvaluatorID` AS `academicA_preprojectEvaluatorID`,`e1`.`userID` AS `academicA_userID`,`e1`.`fullName` AS `academicA_fullName`,`e1`.`rut` AS `academicA_rut`,`e1`.`email` AS `academicA_email`,`pe2`.`preprojectEvaluatorID` AS `academicB_preprojectEvaluatorID`,`e2`.`userID` AS `academicB_userID`,`e2`.`fullName` AS `academicB_fullName`,`e2`.`rut` AS `academicB_rut`,`e2`.`email` AS `academicB_email`,`e3`.`userID` AS `guideAcademic_userID`,`e3`.`fullName` AS `guideAcademic_fullName`,`e3`.`rut` AS `guideAcademic_rut`,`e3`.`email` AS `guideAcademic_email` from ((((((((((((((`evaluation` `p` join `evaluationStatus` `es` on((`p`.`evaluationStatusID` = `es`.`evaluationStatusID`))) left join `rubric` `r` on((`p`.`rubricID` = `r`.`rubricID`))) join `studentHasSemester` `sse` on((`p`.`studentHasSemesterID` = `sse`.`studentHasSemesterID`))) join `semester` `s` on((`sse`.`semesterID` = `s`.`semesterID`))) join `specialization` `sp` on((`sse`.`specializationID` = `sp`.`specializationID`))) join `user_short` `u` on((`sse`.`userID` = `u`.`userID`))) left join `preprojectEvaluator` `pe1` on(((`p`.`evaluationID` = `pe1`.`evaluationID`) and (`pe1`.`evaluatorCategoryID` = 2)))) left join `evaluationStatus` `es1` on((`pe1`.`evaluationStatusID` = `es1`.`evaluationStatusID`))) left join `user_short` `e1` on((`pe1`.`userID` = `e1`.`userID`))) left join `preprojectEvaluator` `pe2` on(((`p`.`evaluationID` = `pe2`.`evaluationID`) and (`pe2`.`evaluatorCategoryID` = 3)))) left join `evaluationStatus` `es2` on((`pe2`.`evaluationStatusID` = `es2`.`evaluationStatusID`))) left join `user_short` `e2` on((`pe2`.`userID` = `e2`.`userID`))) left join `preprojectEvaluator` `pe3` on(((`p`.`evaluationID` = `pe3`.`evaluationID`) and (`pe3`.`evaluatorCategoryID` = 1)))) left join `user_short` `e3` on((`pe3`.`userID` = `e3`.`userID`))) where (`p`.`thesisGradesID` is null) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `student`
--

/*!50001 DROP VIEW IF EXISTS `student`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `student` AS select `s`.`userID` AS `userID`,`s`.`rut` AS `rut`,`s`.`firstName` AS `firstName`,`s`.`secondName` AS `secondName`,`s`.`surname1` AS `surname1`,`s`.`surname2` AS `surname2`,`s`.`sex` AS `sex`,`s`.`civilStatus` AS `civilStatus`,`s`.`birthday` AS `birthday`,`s`.`address` AS `address`,`s`.`email` AS `email`,`s`.`personalEmail` AS `personalEmail`,`s`.`phone` AS `phone`,`s`.`entry` AS `entry`,`s`.`group` AS `group`,`s`.`workPlace` AS `workPlace`,`s`.`phoneWork` AS `phoneWork`,`s`.`job` AS `job`,`s`.`articulation` AS `articulation`,`tt`.`titlesID` AS `titlesID`,`tt`.`titles` AS `titles`,`tt`.`studentHasTitlesID` AS `studentHasTitlesID`,`shs`.`studentHasSpecializationID` AS `studentHasSpecializationID`,`sp`.`specializationID` AS `specializationID`,`sp`.`name` AS `specializationName`,`se1`.`studentHasElectiveID` AS `studentHasElectiveID1`,`se1`.`electiveID` AS `electiveID1`,`se1`.`name` AS `electiveName1`,`se2`.`studentHasElectiveID` AS `studentHasElectiveID2`,`se2`.`electiveID` AS `electiveID2`,`se2`.`name` AS `electiveName2` from (((((((select `u`.`userID` AS `userID`,`u`.`rut` AS `rut`,`u`.`firstName` AS `firstName`,`u`.`secondName` AS `secondName`,`u`.`surname1` AS `surname1`,`u`.`surname2` AS `surname2`,`u`.`sex` AS `sex`,`u`.`civilStatus` AS `civilStatus`,`u`.`birthday` AS `birthday`,`u`.`address` AS `address`,`u`.`email` AS `email`,`u`.`personalEmail` AS `personalEmail`,`u`.`phone` AS `phone`,`u`.`entry` AS `entry`,`u`.`group` AS `group`,`u`.`workPlace` AS `workPlace`,`u`.`phoneWork` AS `phoneWork`,`u`.`job` AS `job`,`u`.`articulation` AS `articulation` from (`usersWithRoles` `uwr` join `user` `u` on((`u`.`userID` = `uwr`.`userID`))) where (`uwr`.`role` = 'Estudiante')) `s` left join (select `sht`.`userID` AS `userID`,group_concat(`t`.`titleID` order by `t`.`titleID` ASC separator ';') AS `titlesID`,group_concat(`t`.`name` order by `t`.`titleID` ASC separator ';') AS `titles`,group_concat(`sht`.`studentHasTitleID` order by `t`.`titleID` ASC separator ';') AS `studentHasTitlesID` from (`studentHasTitle` `sht` join `title` `t` on((`t`.`titleID` = `sht`.`titleID`))) group by `sht`.`userID`) `tt` on((`s`.`userID` = `tt`.`userID`))) left join (select `shs`.`userID` AS `userID`,max(`shs`.`studentHasSpecializationID`) AS `studentHasSpecializationID` from `studentHasSpecialization` `shs` group by `shs`.`userID`) `ss` on((`s`.`userID` = `ss`.`userID`))) left join `studentHasSpecialization` `shs` on((`shs`.`studentHasSpecializationID` = `ss`.`studentHasSpecializationID`))) left join `specialization` `sp` on((`sp`.`specializationID` = `shs`.`specializationID`))) left join (select `she`.`userID` AS `userID`,max(`she`.`studentHasElectiveID`) AS `studentHasElectiveID`,`e`.`electiveID` AS `electiveID`,`e`.`name` AS `name`,`e`.`specializationID` AS `specializationID` from (`studentHasElective` `she` join `elective` `e` on((`e`.`electiveID` = `she`.`electiveID`))) where (`e`.`number` = 1) group by `she`.`userID`,`e`.`electiveID`,`e`.`name`,`e`.`specializationID`) `se1` on(((`s`.`userID` = `se1`.`userID`) and (`shs`.`specializationID` = `se1`.`specializationID`)))) left join (select `she`.`userID` AS `userID`,max(`she`.`studentHasElectiveID`) AS `studentHasElectiveID`,`e`.`electiveID` AS `electiveID`,`e`.`name` AS `name`,`e`.`specializationID` AS `specializationID` from (`studentHasElective` `she` join `elective` `e` on((`e`.`electiveID` = `she`.`electiveID`))) where (`e`.`number` = 2) group by `she`.`userID`,`e`.`electiveID`,`e`.`name`,`e`.`specializationID`) `se2` on(((`s`.`userID` = `se2`.`userID`) and (`shs`.`specializationID` = `se2`.`specializationID`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `thesisEvaluation`
--

/*!50001 DROP VIEW IF EXISTS `thesisEvaluation`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `thesisEvaluation` AS select `t`.`evaluationID` AS `evaluationID`,`t`.`studentHasSemesterID` AS `studentHasSemesterID`,`t`.`projectURL` AS `projectURL`,`t`.`formatID` AS `formatID`,`t`.`creationDate` AS `creationDate`,`t`.`updateDate` AS `updateDate`,`t`.`lateMinutes` AS `lateMinutes`,`t`.`thesisGradesID` AS `thesisGradesID`,`s`.`semesterID` AS `semesterID`,`s`.`year` AS `year`,`s`.`semesterNumber` AS `semesterNumber`,`s`.`startDate` AS `startDate`,`s`.`finishDate` AS `finishDate`,`u`.`userID` AS `userID`,`u`.`rut` AS `rut`,`u`.`fullName` AS `fullName`,`u`.`email` AS `email`,`sp`.`specializationID` AS `specializationID`,`sp`.`name` AS `specializationName`,`es`.`evaluationStatusID` AS `thesis_statusID`,`es`.`name` AS `thesis_status`,`es`.`description` AS `thesis_statusDescription`,round(`tg`.`finalGrade`,2) AS `finalGrade`,round(`tg`.`grade1`,2) AS `stage1_grade`,round(`tg`.`grade2`,2) AS `stage2_grade`,round(`tg`.`grade3`,2) AS `stage3_grade`,round(`te1`.`grade1`,2) AS `director_grade1`,round(`te1`.`grade2`,2) AS `director_grade2`,round(`te2`.`grade1`,2) AS `codirector_grade1`,round(`te2`.`grade2`,2) AS `codirector_grade2`,round(`te3`.`grade1`,2) AS `programDirector_grade1`,round(`te3`.`grade2`,2) AS `programDirector_grade2`,round(`te4`.`grade1`,2) AS `academicA_grade1`,round(`te4`.`grade2`,2) AS `academicA_grade2`,round(`te5`.`grade1`,2) AS `academicB_grade1`,round(`te5`.`grade2`,2) AS `academicB_grade2`,`r`.`rubricID` AS `rubric_rubricID`,`r`.`name` AS `rubric_name`,`r`.`description` AS `rubric_description`,`r`.`templateID` AS `rubric_templateID`,`te1`.`thesisEvaluatorID` AS `director_thesisEvaluatorID`,`e1`.`userID` AS `director_userID`,`e1`.`fullName` AS `director_fullName`,`e1`.`rut` AS `director_rut`,`e1`.`email` AS `director_email`,`te2`.`thesisEvaluatorID` AS `codirector_thesisEvaluatorID`,`e2`.`userID` AS `codirector_userID`,`e2`.`fullName` AS `codirector_fullName`,`e2`.`rut` AS `codirector_rut`,`e2`.`email` AS `codirector_email`,`te3`.`thesisEvaluatorID` AS `programDirector_thesisEvaluatorID`,`e3`.`userID` AS `programDirector_userID`,`e3`.`fullName` AS `programDirector_fullName`,`e3`.`rut` AS `programDirector_rut`,`e3`.`email` AS `programDirector_email`,`te4`.`thesisEvaluatorID` AS `academicA_thesisEvaluatorID`,`e4`.`userID` AS `academicA_userID`,`e4`.`fullName` AS `academicA_fullName`,`e4`.`rut` AS `academicA_rut`,`e4`.`email` AS `academicA_email`,`te5`.`thesisEvaluatorID` AS `academicB_thesisEvaluatorID`,`e5`.`userID` AS `academicB_userID`,`e5`.`fullName` AS `academicB_fullName`,`e5`.`rut` AS `academicB_rut`,`e5`.`email` AS `academicB_email` from (((((((((((((((((`evaluation` `t` join `evaluationStatus` `es` on((`t`.`evaluationStatusID` = `es`.`evaluationStatusID`))) join `thesisGrades` `tg` on((`t`.`thesisGradesID` = `tg`.`thesisGradesID`))) left join `rubric` `r` on((`t`.`rubricID` = `r`.`rubricID`))) join `studentHasSemester` `sse` on((`t`.`studentHasSemesterID` = `sse`.`studentHasSemesterID`))) join `semester` `s` on((`sse`.`semesterID` = `s`.`semesterID`))) join `specialization` `sp` on((`sse`.`specializationID` = `sp`.`specializationID`))) join `user_short` `u` on((`sse`.`userID` = `u`.`userID`))) left join `thesisEvaluator` `te1` on(((`t`.`evaluationID` = `te1`.`evaluationID`) and (`te1`.`evaluatorCategoryID` = 4)))) left join `user_short` `e1` on((`te1`.`userID` = `e1`.`userID`))) left join `thesisEvaluator` `te2` on(((`t`.`evaluationID` = `te2`.`evaluationID`) and (`te2`.`evaluatorCategoryID` = 5)))) left join `user_short` `e2` on((`te2`.`userID` = `e2`.`userID`))) left join `thesisEvaluator` `te3` on(((`t`.`evaluationID` = `te3`.`evaluationID`) and (`te3`.`evaluatorCategoryID` = 6)))) left join `user_short` `e3` on((`te3`.`userID` = `e3`.`userID`))) left join `thesisEvaluator` `te4` on(((`t`.`evaluationID` = `te4`.`evaluationID`) and (`te4`.`evaluatorCategoryID` = 2)))) left join `user_short` `e4` on((`te4`.`userID` = `e4`.`userID`))) left join `thesisEvaluator` `te5` on(((`t`.`evaluationID` = `te5`.`evaluationID`) and (`te5`.`evaluatorCategoryID` = 3)))) left join `user_short` `e5` on((`te5`.`userID` = `e5`.`userID`))) where (`t`.`thesisGradesID` is not null) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `titleHasUniversity`
--

/*!50001 DROP VIEW IF EXISTS `titleHasUniversity`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `titleHasUniversity` AS select `t`.`titleID` AS `titleID`,`t`.`universityID` AS `universityID`,`t`.`degreeID` AS `degreeID`,`t`.`name` AS `name`,`t`.`areaID` AS `areaID`,`u`.`name` AS `universityName`,`u`.`country` AS `country`,`u`.`city` AS `city`,`d`.`name` AS `degree`,`d`.`type` AS `type` from ((`title` `t` join `degree` `d` on((`t`.`degreeID` = `d`.`degreeID`))) join `university` `u` on((`t`.`universityID` = `u`.`universityID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `userHasRoles`
--

/*!50001 DROP VIEW IF EXISTS `userHasRoles`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `userHasRoles` AS select `u`.`userID` AS `userID`,`u`.`rut` AS `rut`,`u`.`firstName` AS `firstName`,`u`.`secondName` AS `secondName`,`u`.`surname1` AS `surname1`,`u`.`surname2` AS `surname2`,`u`.`sex` AS `sex`,`u`.`civilStatus` AS `civilStatus`,`u`.`birthday` AS `birthday`,`u`.`address` AS `address`,`u`.`email` AS `email`,`u`.`personalEmail` AS `personalEmail`,`u`.`phone` AS `phone`,`u`.`entry` AS `entry`,`u`.`group` AS `group`,`u`.`workPlace` AS `workPlace`,`u`.`phoneWork` AS `phoneWork`,`u`.`job` AS `job`,`u`.`articulation` AS `articulation`,`roles_agg`.`rolesID` AS `rolesID`,`roles_agg`.`roles` AS `roles` from (`user` `u` join (select `ru`.`userID` AS `userID`,group_concat(`ru`.`roleID` order by `ru`.`roleID` ASC separator ';') AS `rolesID`,group_concat(`r`.`name` order by `ru`.`roleID` ASC separator ';') AS `roles` from (`userHasRole` `ru` join `role` `r` on((`r`.`roleID` = `ru`.`roleID`))) group by `ru`.`userID`) `roles_agg` on((`u`.`userID` = `roles_agg`.`userID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_short`
--

/*!50001 DROP VIEW IF EXISTS `user_short`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user_short` AS select `u`.`userID` AS `userID`,`u`.`rut` AS `rut`,concat(`u`.`firstName`,' ',`u`.`secondName`,' ',`u`.`surname1`,' ',`u`.`surname2`) AS `fullName`,`u`.`email` AS `email` from `user` `u` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `usersWithRoles`
--

/*!50001 DROP VIEW IF EXISTS `usersWithRoles`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `usersWithRoles` AS select `uhr`.`userID` AS `userID`,`r`.`name` AS `role`,`r`.`roleID` AS `roleID` from (`userHasRole` `uhr` join `role` `r` on((`uhr`.`roleID` = `r`.`roleID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-29 18:19:36
