-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql
-- Tiempo de generación: 16-10-2025 a las 01:50:52
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
-- Base de datos: `posgrado_db`
--

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `academic`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `academic` (
`academicHasTitlesID` text
,`address` varchar(60)
,`articulation` tinyint(1)
,`birthday` date
,`civilStatus` varchar(14)
,`email` varchar(60)
,`entry` year
,`firstName` varchar(45)
,`group` int
,`job` varchar(60)
,`personalEmail` varchar(60)
,`phone` varchar(14)
,`phoneWork` varchar(14)
,`rut` varchar(14)
,`secondName` varchar(45)
,`sex` char(1)
,`surname1` varchar(45)
,`surname2` varchar(45)
,`titles` text
,`titlesID` text
,`userID` int
,`workPlace` varchar(60)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `academicHasTitle`
--

CREATE TABLE `academicHasTitle` (
  `academicHasTitleID` int NOT NULL,
  `userID` int NOT NULL,
  `titleID` int NOT NULL,
  `titleYear` year NOT NULL,
  `archiveURL` varchar(2083) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formatID` int NOT NULL,
  `studyField` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `academicInfo`
--

CREATE TABLE `academicInfo` (
  `userID` int NOT NULL,
  `bondType` enum('Claustro','N??cleo','Colaborador/a') COLLATE utf8mb4_unicode_ci NOT NULL,
  `investigationLines` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bestDegreeID` int NOT NULL,
  `workedHours` enum('Jornada Completa','Media Jornada','Profesor Hora/Part-Time') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hierarchy` enum('Sin jerarqu??a','Titular','Asistente','Asociado','Instructor') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Sin jerarqu??a'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `administrative`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `administrative` (
`address` varchar(60)
,`articulation` tinyint(1)
,`birthday` date
,`civilStatus` varchar(14)
,`email` varchar(60)
,`entry` year
,`firstName` varchar(45)
,`group` int
,`job` varchar(60)
,`personalEmail` varchar(60)
,`phone` varchar(14)
,`phoneWork` varchar(14)
,`role` varchar(45)
,`rut` varchar(14)
,`secondName` varchar(45)
,`sex` char(1)
,`surname1` varchar(45)
,`surname2` varchar(45)
,`userID` int
,`workPlace` varchar(60)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `areaID` int NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`areaID`, `name`) VALUES
(1, 'Salud'),
(2, 'Ingenier??a'),
(3, 'Ciencias Sociales'),
(4, 'Ciencias Naturales'),
(5, 'Educaci??n'),
(6, 'Comunicaci??n y Medios'),
(7, 'Negocios y Econom??a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `assignedSpecialization`
--

CREATE TABLE `assignedSpecialization` (
  `assignedSpecializationID` int NOT NULL,
  `userID` int NOT NULL,
  `specializationID` int NOT NULL,
  `semesterID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bookChapter`
--

CREATE TABLE `bookChapter` (
  `bookChapterID` int NOT NULL,
  `userID` int NOT NULL,
  `authors` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `leadAuthor` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` year NOT NULL,
  `bookName` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chapterName` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `place` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `editorial` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessURL` varchar(2083) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `building`
--

CREATE TABLE `building` (
  `buildingID` int NOT NULL,
  `campusID` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `building`
--

INSERT INTO `building` (`buildingID`, `campusID`, `name`) VALUES
(1, 1, 'Edificio de computaci??n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campus`
--

CREATE TABLE `campus` (
  `campusID` int NOT NULL,
  `universityID` int NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ubication` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `campus`
--

INSERT INTO `campus` (`campusID`, `universityID`, `name`, `ubication`) VALUES
(1, 1, 'saucache', '1010069 Arica, Arica y Parinacota');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `classification`
--

CREATE TABLE `classification` (
  `classificationID` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `criteria` json DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `classification`
--

INSERT INTO `classification` (`classificationID`, `name`, `description`, `criteria`, `createdAt`, `updatedAt`) VALUES
(2, 'EspecializaciÃƒÂ³n en InvestigaciÃƒÂ³n', 'Egresados que se dedicaron a la investigaci??n', '{\"publications\": true, \"researchFocus\": true}', '2025-10-13 22:47:28', '2025-10-13 23:27:49'),
(3, 'Liderazgo Empresarial', 'Egresados que ocupan cargos directivos', '{\"leadership\": true, \"management\": true}', '2025-10-13 22:47:28', '2025-10-13 22:47:28'),
(4, 'Egresados ', 'alumnos egresados con nota 6,0', '{\"jobs\": [], \"groups\": [\"1\"], \"entryYears\": [\"2021\"], \"workPlaces\": [], \"articulations\": [\"0\"], \"specializations\": [\"Did??ctica y Evaluaci??n\"]}', '2025-10-14 01:40:13', '2025-10-14 03:36:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultancy`
--

CREATE TABLE `consultancy` (
  `consultancyID` int NOT NULL,
  `userID` int NOT NULL,
  `title` varchar(350) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contractingInstitution` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `grantYear` year NOT NULL,
  `executionPeriod` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `objective` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accessURL` varchar(2083) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `degree`
--

CREATE TABLE `degree` (
  `degreeID` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `degree`
--

INSERT INTO `degree` (`degreeID`, `name`, `type`) VALUES
(1, 'Mag??ster', 'Postgrado'),
(2, 'Licenciatura', 'Grado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `document`
--

CREATE TABLE `document` (
  `documentID` int NOT NULL,
  `userID` int NOT NULL,
  `category` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `archiveURL` varchar(2083) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formatID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `document`
--

INSERT INTO `document` (`documentID`, `userID`, `category`, `archiveURL`, `formatID`) VALUES
(1, 1, 'Certificado de Nacimiento', 'link1', 1),
(2, 2, 'Curr??culum', 'link2', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elective`
--

CREATE TABLE `elective` (
  `electiveID` int NOT NULL,
  `specializationID` int NOT NULL,
  `number` tinyint(1) NOT NULL,
  `name` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `elective`
--

INSERT INTO `elective` (`electiveID`, `specializationID`, `number`, `name`) VALUES
(1, 2, 1, 'Gesti??n e Innovaci??n Educativa.'),
(2, 2, 1, 'Evaluaci??n de Sistemas e Instituciones Educativas.'),
(3, 3, 1, 'Curr??culo.'),
(4, 3, 1, 'Did??ctica de los aprendizajes.'),
(5, 4, 1, 'El enfoque Intercultural en Educaci??n.'),
(6, 4, 1, 'Ciudadan??a Democr??tica y Educaci??n.'),
(7, 2, 2, 'Direcci??n de Organizaciones Educativas.'),
(8, 2, 2, 'Gesti??n Financiera Educacional.'),
(9, 3, 2, 'Gesti??n e Innovaci??n Curricular.'),
(10, 3, 2, 'Evaluaci??n de los Aprendizajes.'),
(11, 4, 2, 'Migraci??n y Desigualdad en Educaci??n.'),
(12, 4, 2, 'Diversidad e Identidad ??tnica.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluation`
--

CREATE TABLE `evaluation` (
  `evaluationID` int NOT NULL,
  `studentHasSemesterID` int NOT NULL,
  `evaluationStatusID` int NOT NULL DEFAULT '1',
  `projectURL` varchar(2083) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `formatID` int DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT NULL,
  `updateDate` timestamp NULL DEFAULT NULL,
  `lateMinutes` int DEFAULT '0',
  `rubricID` int DEFAULT NULL,
  `thesisGradesID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `evaluation`
--

INSERT INTO `evaluation` (`evaluationID`, `studentHasSemesterID`, `evaluationStatusID`, `projectURL`, `formatID`, `creationDate`, `updateDate`, `lateMinutes`, `rubricID`, `thesisGradesID`) VALUES
(1, 1, 1, '', 2, '2023-12-16 03:00:00', NULL, 0, NULL, NULL),
(2, 1, 1, '', 2, '2023-12-16 03:00:00', NULL, 0, NULL, NULL),
(3, 2, 2, '', 2, '2023-12-17 03:00:00', NULL, 0, NULL, NULL),
(4, 3, 2, '', 2, '2023-12-19 03:00:00', NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluationStatus`
--

CREATE TABLE `evaluationStatus` (
  `evaluationStatusID` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `evaluationStatus`
--

INSERT INTO `evaluationStatus` (`evaluationStatusID`, `name`, `description`) VALUES
(1, 'Sin asignaci??n', 'Proceso de revisi??n creado, pero sin acad??micos asignados.'),
(2, 'Sin revisi??n', 'Los acad??micos asignados a??n no terminan de evaluar.'),
(3, 'Aprobado', 'Evaluaci??n aprobada.'),
(4, 'Rechazado', 'Evaluaci??n rechazada.'),
(5, 'Aprobado con observaciones', 'Se deben corregir las observaciones indicadas.'),
(6, 'Rechazado en primer intento', 'Evaluaci??n rechazada en el primer intento, tiene otra oportunidad para entregarlo.'),
(7, 'Corregido', 'El anteproyecto fue corregido por el evaluador correspondiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluationType`
--

CREATE TABLE `evaluationType` (
  `evaluationTypeID` int NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `evaluationType`
--

INSERT INTO `evaluationType` (`evaluationTypeID`, `name`) VALUES
(1, 'Anteproyecto'),
(2, 'Tesis');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluatorAnswer`
--

CREATE TABLE `evaluatorAnswer` (
  `evaluatorAnswerID` int NOT NULL,
  `preprojectEvaluatorID` int NOT NULL,
  `rubricHasQuestionID` int NOT NULL,
  `answer` enum('Excelente','Bien','Aceptable','Insuficiente') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluatorCategory`
--

CREATE TABLE `evaluatorCategory` (
  `evaluatorCategoryID` int NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `evaluatorCategory`
--

INSERT INTO `evaluatorCategory` (`evaluatorCategoryID`, `name`) VALUES
(1, 'Gu??a'),
(2, 'A'),
(3, 'B'),
(4, 'Director'),
(5, 'Codirector'),
(6, 'Director del programa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `format`
--

CREATE TABLE `format` (
  `formatID` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `format`
--

INSERT INTO `format` (`formatID`, `name`) VALUES
(1, 'pdf'),
(2, 'png'),
(3, 'jpg'),
(4, 'doc'),
(5, 'xlsx');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guidedThesis`
--

CREATE TABLE `guidedThesis` (
  `guidedThesisID` int NOT NULL,
  `userID` int NOT NULL,
  `author` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('Mag??ster','Doctorado') COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('Gu??a','Co-Gu??a') COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` year NOT NULL,
  `title` varchar(350) COLLATE utf8mb4_unicode_ci NOT NULL,
  `program` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `institution` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sameProgram` tinyint(1) DEFAULT NULL,
  `accessURL` varchar(2083) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `id_mapping`
--

CREATE TABLE `id_mapping` (
  `authdb_id` int NOT NULL,
  `posgrado_userID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `id_mapping`
--

INSERT INTO `id_mapping` (`authdb_id`, `posgrado_userID`) VALUES
(21, 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `object`
--

CREATE TABLE `object` (
  `objectID` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `photoURL` varchar(2083) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `formatID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `object`
--

INSERT INTO `object` (`objectID`, `name`, `description`, `photoURL`, `formatID`) VALUES
(1, 'mesa', NULL, NULL, NULL),
(2, 'silla', NULL, NULL, NULL),
(3, 'computador', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `otpToken`
--

CREATE TABLE `otpToken` (
  `otpID` int NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patent`
--

CREATE TABLE `patent` (
  `patentID` int NOT NULL,
  `userID` int NOT NULL,
  `inventors` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `patentName` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicationDate` date NOT NULL,
  `publicationDate` date DEFAULT NULL,
  `registrationNumber` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessURL` varchar(2083) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permission`
--

CREATE TABLE `permission` (
  `permissionID` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `permission`
--

INSERT INTO `permission` (`permissionID`, `name`) VALUES
(1, 'Permiso para Escoger L??nea de Formaci??n'),
(2, 'Permiso para Escoger 1?? Electivo'),
(3, 'Permiso para Escoger 2?? Electivo'),
(4, 'Permiso para Subir Anteproyecto'),
(5, 'Permiso para Subir Tesis');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `preprojectEvaluation`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `preprojectEvaluation` (
`academicA_comment1` varchar(1000)
,`academicA_comment2` varchar(1000)
,`academicA_comment3` varchar(1000)
,`academicA_comment4` varchar(1000)
,`academicA_comment5` varchar(1000)
,`academicA_comment6` varchar(1000)
,`academicA_comment7` varchar(1000)
,`academicA_email` varchar(60)
,`academicA_fullName` varchar(183)
,`academicA_preprojectEvaluatorID` int
,`academicA_rut` varchar(14)
,`academicA_status` varchar(60)
,`academicA_statusDescription` varchar(255)
,`academicA_statusID` int
,`academicA_userID` int
,`academicB_comment1` varchar(1000)
,`academicB_comment2` varchar(1000)
,`academicB_comment3` varchar(1000)
,`academicB_comment4` varchar(1000)
,`academicB_comment5` varchar(1000)
,`academicB_comment6` varchar(1000)
,`academicB_comment7` varchar(1000)
,`academicB_email` varchar(60)
,`academicB_fullName` varchar(183)
,`academicB_preprojectEvaluatorID` int
,`academicB_rut` varchar(14)
,`academicB_status` varchar(60)
,`academicB_statusDescription` varchar(255)
,`academicB_statusID` int
,`academicB_userID` int
,`creationDate` timestamp
,`email` varchar(60)
,`evaluationID` int
,`finishDate` date
,`formatID` int
,`fullName` varchar(183)
,`guideAcademic_email` varchar(60)
,`guideAcademic_fullName` varchar(183)
,`guideAcademic_rut` varchar(14)
,`guideAcademic_userID` int
,`lateMinutes` int
,`preproject_status` varchar(60)
,`preproject_statusDescription` varchar(255)
,`preproject_statusID` int
,`projectURL` varchar(2083)
,`rubric_description` varchar(255)
,`rubric_name` varchar(60)
,`rubric_rubricID` int
,`rubric_templateID` int
,`rut` varchar(14)
,`semesterID` int
,`semesterNumber` tinyint
,`specializationID` int
,`specializationName` varchar(80)
,`startDate` date
,`studentHasSemesterID` int
,`updateDate` timestamp
,`userID` int
,`year` year
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preprojectEvaluator`
--

CREATE TABLE `preprojectEvaluator` (
  `preprojectEvaluatorID` int NOT NULL,
  `evaluationID` int NOT NULL,
  `userID` int NOT NULL,
  `evaluatorCategoryID` int NOT NULL,
  `evaluationStatusID` int NOT NULL DEFAULT '2',
  `comment` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment1` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment2` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment3` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment4` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment5` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment6` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment7` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `project`
--

CREATE TABLE `project` (
  `projectID` int NOT NULL,
  `userID` int NOT NULL,
  `title` varchar(350) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fundingSource` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `grantYear` year NOT NULL,
  `executionPeriod` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessURL` varchar(2083) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publication`
--

CREATE TABLE `publication` (
  `publicationID` int NOT NULL,
  `userID` int NOT NULL,
  `authors` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `leadAuthor` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isIndexed` tinyint(1) NOT NULL,
  `type` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` year NOT NULL,
  `title` varchar(350) COLLATE utf8mb4_unicode_ci NOT NULL,
  `journal` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ISSN` char(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessURL` varchar(2083) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `question`
--

CREATE TABLE `question` (
  `questionID` int NOT NULL,
  `userID` int DEFAULT NULL,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `question`
--

INSERT INTO `question` (`questionID`, `userID`, `question`, `isActive`) VALUES
(1, NULL, 'Presenta un desarrollo sistem??tico, interesante y actual, relacionado con el ??mbito educativo.', 1),
(2, NULL, 'Presenta argumentos te??ricos suficientes y relevantes en relaci??n a la tem??tica tratada.', 1),
(3, NULL, 'Las ideas expuestas son claras y existe cohesi??n entre las partes del Anteproyecto (T??tulo, Problema, Objetivo, Metodolog??a, Marco te??rico)', 1),
(4, NULL, 'La redacci??n es adecuada y sustenta la idea central del Anteproyecto.', 1),
(5, NULL, 'La propuesta metodol??gica es pertinente y conecta con el tipo y dise??o de investigaci??n.', 1),
(6, NULL, 'Utiliza fuentes te??ricas suficientes que soporten los argumentos del autor, autora o autores.', 1),
(7, NULL, 'Interpreta las citaciones de sus fuentes te??ricas y sustentan la idea central del art??culo.', 1),
(8, NULL, 'Todas las citas est??n en el listado de Referencias y todas las referencias son utilizadas en el art??culo.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `roleID` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`roleID`, `name`) VALUES
(1, 'SuperAdmin'),
(2, 'Administrador'),
(3, 'AcadÃ©mico'),
(4, 'Estudiante'),
(5, 'Egresado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `room`
--

CREATE TABLE `room` (
  `roomID` int NOT NULL,
  `buildingID` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `floor` int NOT NULL,
  `capacity` int DEFAULT NULL,
  `width` int NOT NULL,
  `length` int NOT NULL,
  `height` int NOT NULL,
  `photoURL` text COLLATE utf8mb4_unicode_ci,
  `formatID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roomHasObject`
--

CREATE TABLE `roomHasObject` (
  `roomHasObjectID` int NOT NULL,
  `roomID` int NOT NULL,
  `objectID` int NOT NULL,
  `quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rubric`
--

CREATE TABLE `rubric` (
  `rubricID` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `templateID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rubric`
--

INSERT INTO `rubric` (`rubricID`, `name`, `description`, `templateID`) VALUES
(1, 'Rubrica 1', 'Esta es la descripci??n de la Rubrica 3', NULL),
(2, 'Rubrica 2', 'Rubrica para el Anteproyecto', NULL),
(3, 'Rubrica 3', 'Rubrica para la evaluaci??n de la Tesis', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rubricHasQuestion`
--

CREATE TABLE `rubricHasQuestion` (
  `rubricHasQuestionID` int NOT NULL,
  `rubricHasSectionID` int NOT NULL,
  `questionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rubricHasSection`
--

CREATE TABLE `rubricHasSection` (
  `rubricHasSectionID` int NOT NULL,
  `rubricID` int NOT NULL,
  `sectionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `section`
--

CREATE TABLE `section` (
  `sectionID` int NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `section`
--

INSERT INTO `section` (`sectionID`, `name`, `isActive`) VALUES
(1, 'Preguntas', 1),
(2, 'Pertenencia y relevancia te??rica', 1),
(3, 'Coherencia argumentativa', 1),
(4, 'Referencia bibliogr??ficas', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `semester`
--

CREATE TABLE `semester` (
  `semesterID` int NOT NULL,
  `year` year NOT NULL,
  `semesterNumber` tinyint NOT NULL,
  `startDate` date NOT NULL,
  `finishDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `semester`
--

INSERT INTO `semester` (`semesterID`, `year`, `semesterNumber`, `startDate`, `finishDate`) VALUES
(1, '2023', 1, '2023-11-20', '2023-12-28'),
(2, '2023', 2, '2023-11-25', '2023-11-23'),
(3, '2024', 1, '2024-01-25', '2023-11-23'),
(4, '2024', 2, '2024-01-25', '2023-11-23'),
(5, '2025', 1, '2024-01-25', '2023-11-23'),
(6, '2025', 2, '2024-01-25', '2023-11-23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `semesterStatus`
--

CREATE TABLE `semesterStatus` (
  `semesterStatusID` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `semesterStatus`
--

INSERT INTO `semesterStatus` (`semesterStatusID`, `name`, `description`) VALUES
(1, 'En proceso', 'Est?? en desarrollo.'),
(2, 'Aprobado', 'El estudiante ha sido aprobado.'),
(3, 'Rechazado', 'El estudiante ha sido rechazado.'),
(4, 'Cancelado', 'El estudiante ha cancelado su matr??cula.'),
(5, 'En evaluaci??n', 'El estudiante est?? realizando alguna de las evaluaciones o esperando su revisi??n.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `specialization`
--

CREATE TABLE `specialization` (
  `specializationID` int NOT NULL,
  `name` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `specialization`
--

INSERT INTO `specialization` (`specializationID`, `name`) VALUES
(1, 'Sin especializaci??n'),
(2, 'Gesti??n e Innovaci??n'),
(3, 'Did??ctica y Evaluaci??n'),
(4, 'Diversidad e Interculturalidad en Educaci??n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stageAnswer`
--

CREATE TABLE `stageAnswer` (
  `stageAnswerID` int NOT NULL,
  `thesisEvaluatorID` int NOT NULL,
  `rubricHasQuestionID` int NOT NULL,
  `answer` enum('Muy Deficiente','Deficiente','Insuficiente','Aceptable','Buena','Muy Buena','Excelente') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `student`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `student` (
`address` varchar(60)
,`articulation` tinyint(1)
,`birthday` date
,`civilStatus` varchar(14)
,`electiveID1` int
,`electiveID2` int
,`electiveName1` varchar(80)
,`electiveName2` varchar(80)
,`email` varchar(60)
,`entry` year
,`firstName` varchar(45)
,`group` int
,`job` varchar(60)
,`personalEmail` varchar(60)
,`phone` varchar(14)
,`phoneWork` varchar(14)
,`rut` varchar(14)
,`secondName` varchar(45)
,`sex` char(1)
,`specializationID` int
,`specializationName` varchar(80)
,`studentHasElectiveID1` int
,`studentHasElectiveID2` int
,`studentHasSpecializationID` int
,`studentHasTitlesID` text
,`surname1` varchar(45)
,`surname2` varchar(45)
,`titles` text
,`titlesID` text
,`userID` int
,`workPlace` varchar(60)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `studentHasElective`
--

CREATE TABLE `studentHasElective` (
  `studentHasElectiveID` int NOT NULL,
  `userID` int NOT NULL,
  `electiveID` int NOT NULL,
  `semesterID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `studentHasElective`
--

INSERT INTO `studentHasElective` (`studentHasElectiveID`, `userID`, `electiveID`, `semesterID`) VALUES
(1, 1, 1, 1),
(2, 1, 7, 2),
(3, 5, 3, 1),
(4, 5, 9, 2),
(5, 5, 1, 3),
(6, 5, 7, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `studentHasSemester`
--

CREATE TABLE `studentHasSemester` (
  `studentHasSemesterID` int NOT NULL,
  `userID` int NOT NULL,
  `semesterID` int NOT NULL,
  `specializationID` int NOT NULL DEFAULT '1',
  `evaluationStatusID` int DEFAULT NULL,
  `evaluationTypeID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `studentHasSemester`
--

INSERT INTO `studentHasSemester` (`studentHasSemesterID`, `userID`, `semesterID`, `specializationID`, `evaluationStatusID`, `evaluationTypeID`) VALUES
(1, 1, 1, 2, NULL, NULL),
(2, 2, 2, 3, NULL, NULL),
(3, 3, 3, 4, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `studentHasSpecialization`
--

CREATE TABLE `studentHasSpecialization` (
  `studentHasSpecializationID` int NOT NULL,
  `userID` int NOT NULL,
  `specializationID` int NOT NULL,
  `entrySemesterID` int NOT NULL,
  `completionSemesterID` int DEFAULT NULL,
  `semesterStatusID` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `studentHasSpecialization`
--

INSERT INTO `studentHasSpecialization` (`studentHasSpecializationID`, `userID`, `specializationID`, `entrySemesterID`, `completionSemesterID`, `semesterStatusID`) VALUES
(1, 2, 2, 1, 2, 1),
(2, 5, 3, 1, NULL, 1),
(3, 5, 2, 1, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `studentHasTitle`
--

CREATE TABLE `studentHasTitle` (
  `studentHasTitleID` int NOT NULL,
  `userID` int NOT NULL,
  `titleID` int NOT NULL,
  `titleYear` year NOT NULL,
  `archiveURL` varchar(2083) COLLATE utf8mb4_unicode_ci NOT NULL,
  `formatID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `studentHasTitle`
--

INSERT INTO `studentHasTitle` (`studentHasTitleID`, `userID`, `titleID`, `titleYear`, `archiveURL`, `formatID`) VALUES
(1, 1, 1, '2023', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student_evaluator`
--

CREATE TABLE `student_evaluator` (
  `userID` int NOT NULL,
  `teacher_rubricID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teacher_question`
--

CREATE TABLE `teacher_question` (
  `teacher_questionID` int NOT NULL,
  `userID` int DEFAULT NULL,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teacher_rubric`
--

CREATE TABLE `teacher_rubric` (
  `teacher_rubricID` int NOT NULL,
  `assignedSpecializationID` int NOT NULL,
  `teacher_templateID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teacher_rubricHasQuestion`
--

CREATE TABLE `teacher_rubricHasQuestion` (
  `teacher_rubricHasQuestionID` int NOT NULL,
  `teacher_rubricHasSectionID` int NOT NULL,
  `teacher_questionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL,
  `excellent` smallint DEFAULT NULL,
  `good` smallint DEFAULT NULL,
  `medium` smallint DEFAULT NULL,
  `bad` smallint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teacher_rubricHasSection`
--

CREATE TABLE `teacher_rubricHasSection` (
  `teacher_rubricHasSectionID` int NOT NULL,
  `teacher_rubricID` int NOT NULL,
  `teacher_sectionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teacher_section`
--

CREATE TABLE `teacher_section` (
  `teacher_sectionID` int NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teacher_template`
--

CREATE TABLE `teacher_template` (
  `teacher_templateID` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teacher_templateHasQuestion`
--

CREATE TABLE `teacher_templateHasQuestion` (
  `teacher_templateHasQuestionID` int NOT NULL,
  `teacher_templateHasSectionID` int NOT NULL,
  `teacher_questionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teacher_templateHasSection`
--

CREATE TABLE `teacher_templateHasSection` (
  `teacher_templateHasSectionID` int NOT NULL,
  `teacher_templateID` int NOT NULL,
  `teacher_sectionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `template`
--

CREATE TABLE `template` (
  `templateID` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `template`
--

INSERT INTO `template` (`templateID`, `name`, `description`, `isActive`) VALUES
(1, 'Plantilla por defecto', 'Plantilla utilizada por defecto para las r??bricas de anteproyecto.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `templateHasQuestion`
--

CREATE TABLE `templateHasQuestion` (
  `templateHasQuestionID` int NOT NULL,
  `templateHasSectionID` int NOT NULL,
  `questionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `templateHasQuestion`
--

INSERT INTO `templateHasQuestion` (`templateHasQuestionID`, `templateHasSectionID`, `questionID`, `positionNumber`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 2, 3, 1),
(4, 2, 4, 2),
(5, 2, 5, 3),
(6, 3, 6, 1),
(7, 3, 7, 2),
(8, 3, 8, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `templateHasSection`
--

CREATE TABLE `templateHasSection` (
  `templateHasSectionID` int NOT NULL,
  `templateID` int NOT NULL,
  `sectionID` int NOT NULL,
  `positionNumber` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `templateHasSection`
--

INSERT INTO `templateHasSection` (`templateHasSectionID`, `templateID`, `sectionID`, `positionNumber`) VALUES
(1, 1, 2, 1),
(2, 1, 3, 2),
(3, 1, 4, 3);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `thesisEvaluation`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `thesisEvaluation` (
`academicA_email` varchar(60)
,`academicA_fullName` varchar(183)
,`academicA_grade1` double
,`academicA_grade2` double
,`academicA_rut` varchar(14)
,`academicA_thesisEvaluatorID` int
,`academicA_userID` int
,`academicB_email` varchar(60)
,`academicB_fullName` varchar(183)
,`academicB_grade1` double
,`academicB_grade2` double
,`academicB_rut` varchar(14)
,`academicB_thesisEvaluatorID` int
,`academicB_userID` int
,`codirector_email` varchar(60)
,`codirector_fullName` varchar(183)
,`codirector_grade1` double
,`codirector_grade2` double
,`codirector_rut` varchar(14)
,`codirector_thesisEvaluatorID` int
,`codirector_userID` int
,`creationDate` timestamp
,`director_email` varchar(60)
,`director_fullName` varchar(183)
,`director_grade1` double
,`director_grade2` double
,`director_rut` varchar(14)
,`director_thesisEvaluatorID` int
,`director_userID` int
,`email` varchar(60)
,`evaluationID` int
,`finalGrade` double
,`finishDate` date
,`formatID` int
,`fullName` varchar(183)
,`lateMinutes` int
,`programDirector_email` varchar(60)
,`programDirector_fullName` varchar(183)
,`programDirector_grade1` double
,`programDirector_grade2` double
,`programDirector_rut` varchar(14)
,`programDirector_thesisEvaluatorID` int
,`programDirector_userID` int
,`projectURL` varchar(2083)
,`rubric_description` varchar(255)
,`rubric_name` varchar(60)
,`rubric_rubricID` int
,`rubric_templateID` int
,`rut` varchar(14)
,`semesterID` int
,`semesterNumber` tinyint
,`specializationID` int
,`specializationName` varchar(80)
,`stage1_grade` double
,`stage2_grade` double
,`stage3_grade` double
,`startDate` date
,`studentHasSemesterID` int
,`thesis_status` varchar(60)
,`thesis_statusDescription` varchar(255)
,`thesis_statusID` int
,`thesisGradesID` int
,`updateDate` timestamp
,`userID` int
,`year` year
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `thesisEvaluator`
--

CREATE TABLE `thesisEvaluator` (
  `thesisEvaluatorID` int NOT NULL,
  `evaluationID` int NOT NULL,
  `userID` int NOT NULL,
  `evaluatorCategoryID` int NOT NULL,
  `grade1` float DEFAULT NULL,
  `grade2` float DEFAULT NULL,
  `comment` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `thesisGrades`
--

CREATE TABLE `thesisGrades` (
  `thesisGradesID` int NOT NULL,
  `finalGrade` float DEFAULT NULL,
  `grade1` float DEFAULT NULL,
  `grade2` float DEFAULT NULL,
  `grade3` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `thesisRegistration`
--

CREATE TABLE `thesisRegistration` (
  `thesisRegistrationID` int NOT NULL,
  `studentID` int NOT NULL,
  `directorID` int NOT NULL,
  `codirectorID` int DEFAULT NULL,
  `title` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `title`
--

CREATE TABLE `title` (
  `titleID` int NOT NULL,
  `universityID` int NOT NULL,
  `degreeID` int NOT NULL,
  `name` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `areaID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `title`
--

INSERT INTO `title` (`titleID`, `universityID`, `degreeID`, `name`, `areaID`) VALUES
(1, 1, 1, 'Mag??ster en Historia', NULL),
(2, 1, 1, 'Mag??ster en Ciencias con Menci??n en Matem??tica', NULL);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `titleHasUniversity`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `titleHasUniversity` (
`areaID` int
,`city` varchar(60)
,`country` varchar(60)
,`degree` varchar(60)
,`degreeID` int
,`name` varchar(80)
,`titleID` int
,`type` varchar(60)
,`universityID` int
,`universityName` varchar(60)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `university`
--

CREATE TABLE `university` (
  `universityID` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `university`
--

INSERT INTO `university` (`universityID`, `name`, `city`, `country`) VALUES
(1, 'Universidad de Tarapac??', 'Arica', 'Chile');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `userID` int NOT NULL,
  `rut` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secondName` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `surname1` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname2` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` char(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `civilStatus` varchar(14) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` date NOT NULL,
  `address` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `personalEmail` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(14) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `entry` year DEFAULT NULL,
  `group` int DEFAULT NULL,
  `workPlace` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneWork` varchar(14) CHARACTER SET ascii COLLATE ascii_general_ci DEFAULT NULL,
  `job` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `articulation` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`userID`, `rut`, `firstName`, `secondName`, `surname1`, `surname2`, `sex`, `civilStatus`, `birthday`, `address`, `email`, `personalEmail`, `phone`, `entry`, `group`, `workPlace`, `phoneWork`, `job`, `articulation`) VALUES
(1, '20.123.233-1', 'Leonardo', 'Leonardo', 'Rodr??guez', 'Fernandez', 'M', 'Soltero/a', '2023-01-31', 'Psje. Paine 2827', 'Leonardo.Rodr??guez@alumnos.uta.cl', NULL, '121345567', '2023', 1, NULL, NULL, NULL, 0),
(2, '20.123.455-7', 'Sebastian', 'Sebastian', 'torres', 'Torres', 'M', 'Soltero/a', '2023-08-01', 'Linderos 3731', 'Sebastian.Torres@alumnos.uta.cl', NULL, '123456781', '2023', 1, NULL, NULL, NULL, 0),
(3, '20.123.233-3', 'Leonardo1', 'Leonardo1', 'RodrÃ­guez1', 'RodrÃ­guez1', 'M', 'Soltero/a', '2023-01-01', 'Orozimbo Barbosa 3720', 'Leonardo.RodrÃ­guez1@alumnos.uta.cl', NULL, '912134556', '2023', 1, 'Universidad de Tarapac??', '964873634', 'Docente de Historia', 1),
(4, '20.123.233-4', 'Leonardo2', 'Leonardo2', 'Rodr??guez2', 'Rodr??guez2', 'M', 'Soltero/a', '2023-01-31', 'Orozimbo', 'Leonardo.Rodr??guez2@alumnos.uta.cl', NULL, '123456789', '2023', 1, NULL, NULL, NULL, NULL),
(5, '20.547.055-7', 'Leonardo3', 'Leonardo3', 'RodrÃ­guez3', 'RodrÃ­guez3', 'M', 'Soltero/a', '2000-09-12', 's', 'Leonardo.RodrÃ­guez3@alumnos.uta.cl', NULL, '966234532', '2023', 1, NULL, NULL, NULL, NULL),
(19, '12.345.678-9', 'SuperRR', 'Admin', 'Administrador', 'Sistema', 'M', 'Soltero', '1990-01-01', 'Direcci??n Admin', 'superadmin@magister.cl', 'admin@personal.com', '123456789', '2023', 1, 'Lugar de trabajo Admin', '987654321', 'Trabajo Admin', 1),
(20, '18.765.432-1', 'Mar??a', 'Elena', 'Gonz??lez', 'P??rez', 'F', 'Soltera', '1988-05-15', 'Av. Principal 123', 'maria.gonzalez@alumnos.uta.cl', 'maria@personal.com', '987654321', '2022', 2, 'Empresa ABC', '123456789', 'Ingeniera', 1),
(21, '19.876.543-2', 'Carlos', 'Alberto', 'Mart??nez', 'L??pez', 'M', 'Casado', '1985-12-03', 'Calle Secundaria 456', 'carlos.martinez@alumnos.uta.cl', 'carlos@personal.com', '987654322', '2021', 1, 'Corporaci??n XYZ', '123456790', 'Analista', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userHasClassification`
--

CREATE TABLE `userHasClassification` (
  `userID` int NOT NULL,
  `classificationID` int NOT NULL,
  `classifiedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `classifiedBy` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `userHasClassification`
--

INSERT INTO `userHasClassification` (`userID`, `classificationID`, `classifiedAt`, `classifiedBy`) VALUES
(3, 4, '2025-10-14 03:36:12', 'system'),
(5, 4, '2025-10-14 03:36:12', 'system'),
(21, 4, '2025-10-14 03:36:12', 'system');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userHasPermission`
--

CREATE TABLE `userHasPermission` (
  `userHasPermissionID` int NOT NULL,
  `userID` int NOT NULL,
  `permissionID` int NOT NULL,
  `dueDate` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userHasRole`
--

CREATE TABLE `userHasRole` (
  `userID` int NOT NULL,
  `roleID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `userHasRole`
--

INSERT INTO `userHasRole` (`userID`, `roleID`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 2),
(3, 4),
(4, 2),
(4, 3),
(5, 3),
(5, 4),
(19, 1),
(20, 5),
(21, 5);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `userHasRoles`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `userHasRoles` (
`address` varchar(60)
,`articulation` tinyint(1)
,`birthday` date
,`civilStatus` varchar(14)
,`email` varchar(60)
,`entry` year
,`firstName` varchar(45)
,`group` int
,`job` varchar(60)
,`personalEmail` varchar(60)
,`phone` varchar(14)
,`phoneWork` varchar(14)
,`roles` text
,`rolesID` text
,`rut` varchar(14)
,`secondName` varchar(45)
,`sex` char(1)
,`surname1` varchar(45)
,`surname2` varchar(45)
,`userID` int
,`workPlace` varchar(60)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `usersWithRoles`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `usersWithRoles` (
`role` varchar(45)
,`roleID` int
,`userID` int
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `user_short`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `user_short` (
`email` varchar(60)
,`fullName` varchar(183)
,`rut` varchar(14)
,`userID` int
);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `academicHasTitle`
--
ALTER TABLE `academicHasTitle`
  ADD PRIMARY KEY (`academicHasTitleID`),
  ADD KEY `fk_academicHasTitle_title_idx` (`titleID`),
  ADD KEY `fk_academicHasTitle_userID_idx` (`userID`),
  ADD KEY `fk_academicHasTitle_formatID_idx` (`formatID`);

--
-- Indices de la tabla `academicInfo`
--
ALTER TABLE `academicInfo`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `fk_academicInfo_bestDegreeID_idx` (`bestDegreeID`);

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`areaID`);

--
-- Indices de la tabla `assignedSpecialization`
--
ALTER TABLE `assignedSpecialization`
  ADD PRIMARY KEY (`assignedSpecializationID`),
  ADD KEY `fk_assignedSpecialization_userID1_idx` (`userID`),
  ADD KEY `fk_assignedSpecialization_specializationID_idx` (`specializationID`),
  ADD KEY `fk_assignedSpecialization_semesterID1_idx` (`semesterID`);

--
-- Indices de la tabla `bookChapter`
--
ALTER TABLE `bookChapter`
  ADD PRIMARY KEY (`bookChapterID`),
  ADD KEY `fk_bookChapter_userID_idx` (`userID`);

--
-- Indices de la tabla `building`
--
ALTER TABLE `building`
  ADD PRIMARY KEY (`buildingID`),
  ADD KEY `fk_building_campus1_idx` (`campusID`);

--
-- Indices de la tabla `campus`
--
ALTER TABLE `campus`
  ADD PRIMARY KEY (`campusID`),
  ADD KEY `fk_campus_university1_idx` (`universityID`);

--
-- Indices de la tabla `classification`
--
ALTER TABLE `classification`
  ADD PRIMARY KEY (`classificationID`),
  ADD KEY `idx_classification_name` (`name`);

--
-- Indices de la tabla `consultancy`
--
ALTER TABLE `consultancy`
  ADD PRIMARY KEY (`consultancyID`),
  ADD KEY `fk_consultancy_userID_idx` (`userID`);

--
-- Indices de la tabla `degree`
--
ALTER TABLE `degree`
  ADD PRIMARY KEY (`degreeID`);

--
-- Indices de la tabla `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`documentID`),
  ADD KEY `fk_document_format1_idx` (`formatID`),
  ADD KEY `fk_document_user1_idx` (`userID`);

--
-- Indices de la tabla `elective`
--
ALTER TABLE `elective`
  ADD PRIMARY KEY (`electiveID`),
  ADD KEY `fk_elective_specializationID_idx` (`specializationID`);

--
-- Indices de la tabla `evaluation`
--
ALTER TABLE `evaluation`
  ADD PRIMARY KEY (`evaluationID`),
  ADD KEY `fk_evaluate_format1_idx` (`formatID`),
  ADD KEY `fk_specializationHasSemesterID_idx` (`studentHasSemesterID`),
  ADD KEY `fk_evaluate_evaluationStatusID1_idx` (`evaluationStatusID`),
  ADD KEY `fk_evaluation_thesisID_idx` (`thesisGradesID`),
  ADD KEY `fk_evaluation_rubricID_idx` (`rubricID`);

--
-- Indices de la tabla `evaluationStatus`
--
ALTER TABLE `evaluationStatus`
  ADD PRIMARY KEY (`evaluationStatusID`);

--
-- Indices de la tabla `evaluationType`
--
ALTER TABLE `evaluationType`
  ADD PRIMARY KEY (`evaluationTypeID`);

--
-- Indices de la tabla `evaluatorAnswer`
--
ALTER TABLE `evaluatorAnswer`
  ADD PRIMARY KEY (`evaluatorAnswerID`),
  ADD KEY `fk_evaluatorAnswer_preprojectEvaluatorID_idx` (`preprojectEvaluatorID`),
  ADD KEY `fk_evaluatorAnswer_rubricHasQuestionID_idx` (`rubricHasQuestionID`);

--
-- Indices de la tabla `evaluatorCategory`
--
ALTER TABLE `evaluatorCategory`
  ADD PRIMARY KEY (`evaluatorCategoryID`);

--
-- Indices de la tabla `format`
--
ALTER TABLE `format`
  ADD PRIMARY KEY (`formatID`);

--
-- Indices de la tabla `guidedThesis`
--
ALTER TABLE `guidedThesis`
  ADD PRIMARY KEY (`guidedThesisID`),
  ADD KEY `fk_guidedThesis_userID_idx` (`userID`);

--
-- Indices de la tabla `id_mapping`
--
ALTER TABLE `id_mapping`
  ADD PRIMARY KEY (`authdb_id`);

--
-- Indices de la tabla `object`
--
ALTER TABLE `object`
  ADD PRIMARY KEY (`objectID`),
  ADD KEY `fk_format_formatID_idx` (`formatID`);

--
-- Indices de la tabla `otpToken`
--
ALTER TABLE `otpToken`
  ADD PRIMARY KEY (`otpID`),
  ADD UNIQUE KEY `otpID_UNIQUE` (`otpID`),
  ADD KEY `fk_user_email_idx` (`email`);

--
-- Indices de la tabla `patent`
--
ALTER TABLE `patent`
  ADD PRIMARY KEY (`patentID`),
  ADD KEY `fk_patent_userID_idx` (`userID`);

--
-- Indices de la tabla `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`permissionID`);

--
-- Indices de la tabla `preprojectEvaluator`
--
ALTER TABLE `preprojectEvaluator`
  ADD PRIMARY KEY (`preprojectEvaluatorID`),
  ADD KEY `fk_preprojectEvaluator_preprojectID_idx` (`evaluationID`),
  ADD KEY `fk_preprojectEvaluator_userID_idx` (`userID`),
  ADD KEY `fk_preprojectEvaluator_evaluatorCategoryID_idx` (`evaluatorCategoryID`),
  ADD KEY `fk_preprojectEvaluator_evaluationStatusID_idx` (`evaluationStatusID`);

--
-- Indices de la tabla `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`projectID`),
  ADD KEY `fk_project_userID_idx` (`userID`);

--
-- Indices de la tabla `publication`
--
ALTER TABLE `publication`
  ADD PRIMARY KEY (`publicationID`),
  ADD KEY `fk_publication_userID_idx` (`userID`);

--
-- Indices de la tabla `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`questionID`),
  ADD KEY `fk_question_user1_idx` (`userID`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`roleID`);

--
-- Indices de la tabla `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`roomID`),
  ADD KEY `fk_building_buildingID_idx` (`buildingID`),
  ADD KEY `fk_format_formatID_idx` (`formatID`);

--
-- Indices de la tabla `roomHasObject`
--
ALTER TABLE `roomHasObject`
  ADD PRIMARY KEY (`roomHasObjectID`),
  ADD KEY `fk_inventoryHasRoom_room1_idx` (`roomID`),
  ADD KEY `fk_inventoryHasRoom_object1_idx` (`objectID`);

--
-- Indices de la tabla `rubric`
--
ALTER TABLE `rubric`
  ADD PRIMARY KEY (`rubricID`),
  ADD KEY `fk_rubric_templateID1_idx` (`templateID`);

--
-- Indices de la tabla `rubricHasQuestion`
--
ALTER TABLE `rubricHasQuestion`
  ADD PRIMARY KEY (`rubricHasQuestionID`),
  ADD KEY `fk_table1_question1_idx` (`questionID`),
  ADD KEY `fk_sectionHasQuestion_rubric1_idx` (`rubricHasSectionID`);

--
-- Indices de la tabla `rubricHasSection`
--
ALTER TABLE `rubricHasSection`
  ADD PRIMARY KEY (`rubricHasSectionID`),
  ADD KEY `fk_rubricHasSection_rubricID1_idx` (`rubricID`),
  ADD KEY `fk_rubricHasSection_sectionID1_idx` (`sectionID`);

--
-- Indices de la tabla `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`sectionID`);

--
-- Indices de la tabla `semester`
--
ALTER TABLE `semester`
  ADD PRIMARY KEY (`semesterID`);

--
-- Indices de la tabla `semesterStatus`
--
ALTER TABLE `semesterStatus`
  ADD PRIMARY KEY (`semesterStatusID`);

--
-- Indices de la tabla `specialization`
--
ALTER TABLE `specialization`
  ADD PRIMARY KEY (`specializationID`);

--
-- Indices de la tabla `stageAnswer`
--
ALTER TABLE `stageAnswer`
  ADD PRIMARY KEY (`stageAnswerID`),
  ADD KEY `fk_stageAnswer_questionID_idx` (`rubricHasQuestionID`),
  ADD KEY `fk_stageAnswer_thesisEvaluatorID_idx` (`thesisEvaluatorID`);

--
-- Indices de la tabla `studentHasElective`
--
ALTER TABLE `studentHasElective`
  ADD PRIMARY KEY (`studentHasElectiveID`),
  ADD UNIQUE KEY `semesterID_UNIQUE` (`userID`,`semesterID`),
  ADD KEY `fk_studentHasElective_userID_idx` (`userID`),
  ADD KEY `fk_studentHasElective_electiveID_idx` (`electiveID`),
  ADD KEY `fk_studentHasElective_semesterID_idx` (`semesterID`);

--
-- Indices de la tabla `studentHasSemester`
--
ALTER TABLE `studentHasSemester`
  ADD PRIMARY KEY (`studentHasSemesterID`),
  ADD UNIQUE KEY `unique_user_semester` (`userID`,`semesterID`),
  ADD KEY `fk_Name_semester1_idx` (`semesterID`),
  ADD KEY `fk_studentHasSemester_specializationID1_idx` (`specializationID`),
  ADD KEY `fk_studentHasSemester_evaluationStatusID_idx` (`evaluationStatusID`),
  ADD KEY `fk_studentHasSemester_evaluationTypeID_idx` (`evaluationTypeID`);

--
-- Indices de la tabla `studentHasSpecialization`
--
ALTER TABLE `studentHasSpecialization`
  ADD PRIMARY KEY (`studentHasSpecializationID`),
  ADD UNIQUE KEY `unique_user_specialization` (`userID`,`specializationID`) INVISIBLE,
  ADD KEY `fk_studentHasSpecialization_specialization1_idx` (`specializationID`) INVISIBLE,
  ADD KEY `fk_studentHasSpecialization_user1_idx` (`userID`),
  ADD KEY `fk_completionSemester_idx` (`entrySemesterID`),
  ADD KEY `fk_completionSemester_idx1` (`completionSemesterID`) INVISIBLE,
  ADD KEY `fk_studentHasSpecialization_statusID1_idx` (`semesterStatusID`) INVISIBLE;

--
-- Indices de la tabla `studentHasTitle`
--
ALTER TABLE `studentHasTitle`
  ADD PRIMARY KEY (`studentHasTitleID`),
  ADD KEY `fk_rolHasTitle_title1_idx` (`titleID`),
  ADD KEY `fk_rolHasTitle_format1_idx` (`formatID`),
  ADD KEY `fk_rolHasTitle_user1_idx` (`userID`);

--
-- Indices de la tabla `student_evaluator`
--
ALTER TABLE `student_evaluator`
  ADD PRIMARY KEY (`teacher_rubricID`,`userID`),
  ADD KEY `fk_student_evaluator_userID_idx` (`userID`),
  ADD KEY `fk_student_evaluator_teacher_rubricID_idx` (`teacher_rubricID`);

--
-- Indices de la tabla `teacher_question`
--
ALTER TABLE `teacher_question`
  ADD PRIMARY KEY (`teacher_questionID`),
  ADD KEY `fk_question_user1_idx` (`userID`);

--
-- Indices de la tabla `teacher_rubric`
--
ALTER TABLE `teacher_rubric`
  ADD PRIMARY KEY (`teacher_rubricID`),
  ADD KEY `fk_assignedSpecializationID1_idx` (`assignedSpecializationID`),
  ADD KEY `fk_teacher_templateID_idx` (`teacher_templateID`);

--
-- Indices de la tabla `teacher_rubricHasQuestion`
--
ALTER TABLE `teacher_rubricHasQuestion`
  ADD PRIMARY KEY (`teacher_rubricHasQuestionID`),
  ADD KEY `fk_teacher_rubricHasQuestion_techer_questionID1_idx` (`teacher_questionID`),
  ADD KEY `fk_teacher_rubricHasQuestion_teacher_rubricID1_idx` (`teacher_rubricHasSectionID`);

--
-- Indices de la tabla `teacher_rubricHasSection`
--
ALTER TABLE `teacher_rubricHasSection`
  ADD PRIMARY KEY (`teacher_rubricHasSectionID`),
  ADD KEY `fk_teacher_rubricHasSection_teacher_rubricID1_idx` (`teacher_rubricID`),
  ADD KEY `fk_teacher_rubricHasSection_teacher_sectionID1_idx` (`teacher_sectionID`);

--
-- Indices de la tabla `teacher_section`
--
ALTER TABLE `teacher_section`
  ADD PRIMARY KEY (`teacher_sectionID`);

--
-- Indices de la tabla `teacher_template`
--
ALTER TABLE `teacher_template`
  ADD PRIMARY KEY (`teacher_templateID`);

--
-- Indices de la tabla `teacher_templateHasQuestion`
--
ALTER TABLE `teacher_templateHasQuestion`
  ADD PRIMARY KEY (`teacher_templateHasQuestionID`),
  ADD KEY `fk_templateHasQuestion_questionID10_idx` (`teacher_questionID`),
  ADD KEY `fk_templateHasQuestion_templateHasSectionID1_idx` (`teacher_templateHasSectionID`);

--
-- Indices de la tabla `teacher_templateHasSection`
--
ALTER TABLE `teacher_templateHasSection`
  ADD PRIMARY KEY (`teacher_templateHasSectionID`),
  ADD KEY `fk_teacher_templateHasSection_teacher_sectionID1_idx` (`teacher_sectionID`),
  ADD KEY `fk_teacher_templateHasSection_teacher_templateID1_idx` (`teacher_templateID`);

--
-- Indices de la tabla `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`templateID`);

--
-- Indices de la tabla `templateHasQuestion`
--
ALTER TABLE `templateHasQuestion`
  ADD PRIMARY KEY (`templateHasQuestionID`),
  ADD KEY `fk_templateHasQuestion_questionID1_idx` (`questionID`),
  ADD KEY `fk_templateHasQuestion_templateID1_idx` (`templateHasSectionID`);

--
-- Indices de la tabla `templateHasSection`
--
ALTER TABLE `templateHasSection`
  ADD PRIMARY KEY (`templateHasSectionID`),
  ADD KEY `fk_templateHasSection_templateID_idx` (`templateID`),
  ADD KEY `fk_templateHasSection_sectionID1_idx` (`sectionID`);

--
-- Indices de la tabla `thesisEvaluator`
--
ALTER TABLE `thesisEvaluator`
  ADD PRIMARY KEY (`thesisEvaluatorID`),
  ADD KEY `fk_thesisEvaluator_userID_idx` (`userID`),
  ADD KEY `fk_thesisEvaluator_evaluatorCategoryID_idx` (`evaluatorCategoryID`),
  ADD KEY `fk_thesisEvaluator_evaluationID_idx` (`evaluationID`);

--
-- Indices de la tabla `thesisGrades`
--
ALTER TABLE `thesisGrades`
  ADD PRIMARY KEY (`thesisGradesID`);

--
-- Indices de la tabla `thesisRegistration`
--
ALTER TABLE `thesisRegistration`
  ADD PRIMARY KEY (`thesisRegistrationID`);

--
-- Indices de la tabla `title`
--
ALTER TABLE `title`
  ADD PRIMARY KEY (`titleID`),
  ADD KEY `fk_titles_type1_idx` (`degreeID`),
  ADD KEY `fk_title_university1_idx` (`universityID`),
  ADD KEY `fk_title_areaID_idx` (`areaID`);

--
-- Indices de la tabla `university`
--
ALTER TABLE `university`
  ADD PRIMARY KEY (`universityID`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `userID_UNIQUE` (`userID`),
  ADD KEY `idx_email` (`email`);

--
-- Indices de la tabla `userHasClassification`
--
ALTER TABLE `userHasClassification`
  ADD PRIMARY KEY (`userID`,`classificationID`),
  ADD KEY `idx_user_classification` (`userID`),
  ADD KEY `idx_classification_user` (`classificationID`);

--
-- Indices de la tabla `userHasPermission`
--
ALTER TABLE `userHasPermission`
  ADD PRIMARY KEY (`userHasPermissionID`),
  ADD KEY `fk_userHasPermission_userID_idx` (`userID`),
  ADD KEY `fk_userHasPermission_permissionID_idx` (`permissionID`);

--
-- Indices de la tabla `userHasRole`
--
ALTER TABLE `userHasRole`
  ADD PRIMARY KEY (`userID`,`roleID`),
  ADD KEY `fk_rolUser_user1_idx` (`userID`),
  ADD KEY `fk_rolUser_rol1_idx` (`roleID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `academicHasTitle`
--
ALTER TABLE `academicHasTitle`
  MODIFY `academicHasTitleID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `assignedSpecialization`
--
ALTER TABLE `assignedSpecialization`
  MODIFY `assignedSpecializationID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `bookChapter`
--
ALTER TABLE `bookChapter`
  MODIFY `bookChapterID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `building`
--
ALTER TABLE `building`
  MODIFY `buildingID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `campus`
--
ALTER TABLE `campus`
  MODIFY `campusID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `classification`
--
ALTER TABLE `classification`
  MODIFY `classificationID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `consultancy`
--
ALTER TABLE `consultancy`
  MODIFY `consultancyID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `degree`
--
ALTER TABLE `degree`
  MODIFY `degreeID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `document`
--
ALTER TABLE `document`
  MODIFY `documentID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `elective`
--
ALTER TABLE `elective`
  MODIFY `electiveID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `evaluation`
--
ALTER TABLE `evaluation`
  MODIFY `evaluationID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `evaluationStatus`
--
ALTER TABLE `evaluationStatus`
  MODIFY `evaluationStatusID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `evaluatorAnswer`
--
ALTER TABLE `evaluatorAnswer`
  MODIFY `evaluatorAnswerID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluatorCategory`
--
ALTER TABLE `evaluatorCategory`
  MODIFY `evaluatorCategoryID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `format`
--
ALTER TABLE `format`
  MODIFY `formatID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `guidedThesis`
--
ALTER TABLE `guidedThesis`
  MODIFY `guidedThesisID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `object`
--
ALTER TABLE `object`
  MODIFY `objectID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `otpToken`
--
ALTER TABLE `otpToken`
  MODIFY `otpID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `patent`
--
ALTER TABLE `patent`
  MODIFY `patentID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permission`
--
ALTER TABLE `permission`
  MODIFY `permissionID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `preprojectEvaluator`
--
ALTER TABLE `preprojectEvaluator`
  MODIFY `preprojectEvaluatorID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `project`
--
ALTER TABLE `project`
  MODIFY `projectID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publication`
--
ALTER TABLE `publication`
  MODIFY `publicationID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `question`
--
ALTER TABLE `question`
  MODIFY `questionID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `roleID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `room`
--
ALTER TABLE `room`
  MODIFY `roomID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roomHasObject`
--
ALTER TABLE `roomHasObject`
  MODIFY `roomHasObjectID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rubric`
--
ALTER TABLE `rubric`
  MODIFY `rubricID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rubricHasQuestion`
--
ALTER TABLE `rubricHasQuestion`
  MODIFY `rubricHasQuestionID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rubricHasSection`
--
ALTER TABLE `rubricHasSection`
  MODIFY `rubricHasSectionID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `section`
--
ALTER TABLE `section`
  MODIFY `sectionID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `semester`
--
ALTER TABLE `semester`
  MODIFY `semesterID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `semesterStatus`
--
ALTER TABLE `semesterStatus`
  MODIFY `semesterStatusID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `specialization`
--
ALTER TABLE `specialization`
  MODIFY `specializationID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `stageAnswer`
--
ALTER TABLE `stageAnswer`
  MODIFY `stageAnswerID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `studentHasElective`
--
ALTER TABLE `studentHasElective`
  MODIFY `studentHasElectiveID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `studentHasSemester`
--
ALTER TABLE `studentHasSemester`
  MODIFY `studentHasSemesterID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `studentHasSpecialization`
--
ALTER TABLE `studentHasSpecialization`
  MODIFY `studentHasSpecializationID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `studentHasTitle`
--
ALTER TABLE `studentHasTitle`
  MODIFY `studentHasTitleID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `teacher_question`
--
ALTER TABLE `teacher_question`
  MODIFY `teacher_questionID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `teacher_rubric`
--
ALTER TABLE `teacher_rubric`
  MODIFY `teacher_rubricID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `teacher_rubricHasQuestion`
--
ALTER TABLE `teacher_rubricHasQuestion`
  MODIFY `teacher_rubricHasQuestionID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `teacher_rubricHasSection`
--
ALTER TABLE `teacher_rubricHasSection`
  MODIFY `teacher_rubricHasSectionID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `teacher_section`
--
ALTER TABLE `teacher_section`
  MODIFY `teacher_sectionID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `teacher_template`
--
ALTER TABLE `teacher_template`
  MODIFY `teacher_templateID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `teacher_templateHasQuestion`
--
ALTER TABLE `teacher_templateHasQuestion`
  MODIFY `teacher_templateHasQuestionID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `teacher_templateHasSection`
--
ALTER TABLE `teacher_templateHasSection`
  MODIFY `teacher_templateHasSectionID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `template`
--
ALTER TABLE `template`
  MODIFY `templateID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `templateHasQuestion`
--
ALTER TABLE `templateHasQuestion`
  MODIFY `templateHasQuestionID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `templateHasSection`
--
ALTER TABLE `templateHasSection`
  MODIFY `templateHasSectionID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `thesisEvaluator`
--
ALTER TABLE `thesisEvaluator`
  MODIFY `thesisEvaluatorID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `thesisGrades`
--
ALTER TABLE `thesisGrades`
  MODIFY `thesisGradesID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `thesisRegistration`
--
ALTER TABLE `thesisRegistration`
  MODIFY `thesisRegistrationID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `title`
--
ALTER TABLE `title`
  MODIFY `titleID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `university`
--
ALTER TABLE `university`
  MODIFY `universityID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `userID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `userHasPermission`
--
ALTER TABLE `userHasPermission`
  MODIFY `userHasPermissionID` int NOT NULL AUTO_INCREMENT;

-- --------------------------------------------------------

--
-- Estructura para la vista `academic`
--
DROP TABLE IF EXISTS `academic`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `academic`  AS SELECT `a`.`userID` AS `userID`, `a`.`rut` AS `rut`, `a`.`firstName` AS `firstName`, `a`.`secondName` AS `secondName`, `a`.`surname1` AS `surname1`, `a`.`surname2` AS `surname2`, `a`.`sex` AS `sex`, `a`.`civilStatus` AS `civilStatus`, `a`.`birthday` AS `birthday`, `a`.`address` AS `address`, `a`.`email` AS `email`, `a`.`personalEmail` AS `personalEmail`, `a`.`phone` AS `phone`, `a`.`entry` AS `entry`, `a`.`group` AS `group`, `a`.`workPlace` AS `workPlace`, `a`.`phoneWork` AS `phoneWork`, `a`.`job` AS `job`, `a`.`articulation` AS `articulation`, `tt`.`titlesID` AS `titlesID`, `tt`.`titles` AS `titles`, `tt`.`academicHasTitlesID` AS `academicHasTitlesID` FROM ((select `u`.`userID` AS `userID`,`u`.`rut` AS `rut`,`u`.`firstName` AS `firstName`,`u`.`secondName` AS `secondName`,`u`.`surname1` AS `surname1`,`u`.`surname2` AS `surname2`,`u`.`sex` AS `sex`,`u`.`civilStatus` AS `civilStatus`,`u`.`birthday` AS `birthday`,`u`.`address` AS `address`,`u`.`email` AS `email`,`u`.`personalEmail` AS `personalEmail`,`u`.`phone` AS `phone`,`u`.`entry` AS `entry`,`u`.`group` AS `group`,`u`.`workPlace` AS `workPlace`,`u`.`phoneWork` AS `phoneWork`,`u`.`job` AS `job`,`u`.`articulation` AS `articulation` from (`usersWithRoles` `uwr` join `user` `u` on((`u`.`userID` = `uwr`.`userID`))) where (`uwr`.`role` = 'Acad??mico')) `a` left join (select `aht`.`userID` AS `userID`,group_concat(`t`.`titleID` order by `t`.`titleID` ASC separator ';') AS `titlesID`,group_concat(`t`.`name` order by `t`.`titleID` ASC separator ';') AS `titles`,group_concat(`aht`.`academicHasTitleID` order by `t`.`titleID` ASC separator ';') AS `academicHasTitlesID` from (`academicHasTitle` `aht` join `title` `t` on((`t`.`titleID` = `aht`.`titleID`))) group by `aht`.`userID`) `tt` on((`a`.`userID` = `tt`.`userID`))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `administrative`
--
DROP TABLE IF EXISTS `administrative`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `administrative`  AS SELECT `u`.`userID` AS `userID`, `u`.`rut` AS `rut`, `u`.`firstName` AS `firstName`, `u`.`secondName` AS `secondName`, `u`.`surname1` AS `surname1`, `u`.`surname2` AS `surname2`, `u`.`sex` AS `sex`, `u`.`civilStatus` AS `civilStatus`, `u`.`birthday` AS `birthday`, `u`.`address` AS `address`, `u`.`email` AS `email`, `u`.`personalEmail` AS `personalEmail`, `u`.`phone` AS `phone`, `u`.`entry` AS `entry`, `u`.`group` AS `group`, `u`.`workPlace` AS `workPlace`, `u`.`phoneWork` AS `phoneWork`, `u`.`job` AS `job`, `u`.`articulation` AS `articulation`, `uwr`.`role` AS `role` FROM (`user` `u` join `usersWithRoles` `uwr` on((`u`.`userID` = `uwr`.`userID`))) WHERE (`uwr`.`role` <> 'Estudiante') ;

-- --------------------------------------------------------

--
-- Estructura para la vista `preprojectEvaluation`
--
DROP TABLE IF EXISTS `preprojectEvaluation`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `preprojectEvaluation`  AS SELECT `p`.`evaluationID` AS `evaluationID`, `p`.`studentHasSemesterID` AS `studentHasSemesterID`, `p`.`projectURL` AS `projectURL`, `p`.`formatID` AS `formatID`, `p`.`creationDate` AS `creationDate`, `p`.`updateDate` AS `updateDate`, `p`.`lateMinutes` AS `lateMinutes`, `es`.`evaluationStatusID` AS `preproject_statusID`, `es`.`name` AS `preproject_status`, `es`.`description` AS `preproject_statusDescription`, `pe1`.`evaluationStatusID` AS `academicA_statusID`, `pe1`.`comment1` AS `academicA_comment1`, `pe1`.`comment2` AS `academicA_comment2`, `pe1`.`comment3` AS `academicA_comment3`, `pe1`.`comment4` AS `academicA_comment4`, `pe1`.`comment5` AS `academicA_comment5`, `pe1`.`comment6` AS `academicA_comment6`, `pe1`.`comment7` AS `academicA_comment7`, `pe2`.`evaluationStatusID` AS `academicB_statusID`, `pe2`.`comment1` AS `academicB_comment1`, `pe2`.`comment2` AS `academicB_comment2`, `pe2`.`comment3` AS `academicB_comment3`, `pe2`.`comment4` AS `academicB_comment4`, `pe2`.`comment5` AS `academicB_comment5`, `pe2`.`comment6` AS `academicB_comment6`, `pe2`.`comment7` AS `academicB_comment7`, `r`.`rubricID` AS `rubric_rubricID`, `r`.`name` AS `rubric_name`, `r`.`description` AS `rubric_description`, `r`.`templateID` AS `rubric_templateID`, `s`.`semesterID` AS `semesterID`, `s`.`year` AS `year`, `s`.`semesterNumber` AS `semesterNumber`, `s`.`startDate` AS `startDate`, `s`.`finishDate` AS `finishDate`, `u`.`userID` AS `userID`, `u`.`rut` AS `rut`, `u`.`fullName` AS `fullName`, `u`.`email` AS `email`, `sp`.`specializationID` AS `specializationID`, `sp`.`name` AS `specializationName`, `es1`.`name` AS `academicA_status`, `es1`.`description` AS `academicA_statusDescription`, `es2`.`name` AS `academicB_status`, `es2`.`description` AS `academicB_statusDescription`, `pe1`.`preprojectEvaluatorID` AS `academicA_preprojectEvaluatorID`, `e1`.`userID` AS `academicA_userID`, `e1`.`fullName` AS `academicA_fullName`, `e1`.`rut` AS `academicA_rut`, `e1`.`email` AS `academicA_email`, `pe2`.`preprojectEvaluatorID` AS `academicB_preprojectEvaluatorID`, `e2`.`userID` AS `academicB_userID`, `e2`.`fullName` AS `academicB_fullName`, `e2`.`rut` AS `academicB_rut`, `e2`.`email` AS `academicB_email`, `e3`.`userID` AS `guideAcademic_userID`, `e3`.`fullName` AS `guideAcademic_fullName`, `e3`.`rut` AS `guideAcademic_rut`, `e3`.`email` AS `guideAcademic_email` FROM ((((((((((((((`evaluation` `p` join `evaluationStatus` `es` on((`p`.`evaluationStatusID` = `es`.`evaluationStatusID`))) left join `rubric` `r` on((`p`.`rubricID` = `r`.`rubricID`))) join `studentHasSemester` `sse` on((`p`.`studentHasSemesterID` = `sse`.`studentHasSemesterID`))) join `semester` `s` on((`sse`.`semesterID` = `s`.`semesterID`))) join `specialization` `sp` on((`sse`.`specializationID` = `sp`.`specializationID`))) join `user_short` `u` on((`sse`.`userID` = `u`.`userID`))) left join `preprojectEvaluator` `pe1` on(((`p`.`evaluationID` = `pe1`.`evaluationID`) and (`pe1`.`evaluatorCategoryID` = 2)))) left join `evaluationStatus` `es1` on((`pe1`.`evaluationStatusID` = `es1`.`evaluationStatusID`))) left join `user_short` `e1` on((`pe1`.`userID` = `e1`.`userID`))) left join `preprojectEvaluator` `pe2` on(((`p`.`evaluationID` = `pe2`.`evaluationID`) and (`pe2`.`evaluatorCategoryID` = 3)))) left join `evaluationStatus` `es2` on((`pe2`.`evaluationStatusID` = `es2`.`evaluationStatusID`))) left join `user_short` `e2` on((`pe2`.`userID` = `e2`.`userID`))) left join `preprojectEvaluator` `pe3` on(((`p`.`evaluationID` = `pe3`.`evaluationID`) and (`pe3`.`evaluatorCategoryID` = 1)))) left join `user_short` `e3` on((`pe3`.`userID` = `e3`.`userID`))) WHERE (`p`.`thesisGradesID` is null) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `student`
--
DROP TABLE IF EXISTS `student`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `student`  AS SELECT `s`.`userID` AS `userID`, `s`.`rut` AS `rut`, `s`.`firstName` AS `firstName`, `s`.`secondName` AS `secondName`, `s`.`surname1` AS `surname1`, `s`.`surname2` AS `surname2`, `s`.`sex` AS `sex`, `s`.`civilStatus` AS `civilStatus`, `s`.`birthday` AS `birthday`, `s`.`address` AS `address`, `s`.`email` AS `email`, `s`.`personalEmail` AS `personalEmail`, `s`.`phone` AS `phone`, `s`.`entry` AS `entry`, `s`.`group` AS `group`, `s`.`workPlace` AS `workPlace`, `s`.`phoneWork` AS `phoneWork`, `s`.`job` AS `job`, `s`.`articulation` AS `articulation`, `tt`.`titlesID` AS `titlesID`, `tt`.`titles` AS `titles`, `tt`.`studentHasTitlesID` AS `studentHasTitlesID`, `shs`.`studentHasSpecializationID` AS `studentHasSpecializationID`, `sp`.`specializationID` AS `specializationID`, `sp`.`name` AS `specializationName`, `se1`.`studentHasElectiveID` AS `studentHasElectiveID1`, `se1`.`electiveID` AS `electiveID1`, `se1`.`name` AS `electiveName1`, `se2`.`studentHasElectiveID` AS `studentHasElectiveID2`, `se2`.`electiveID` AS `electiveID2`, `se2`.`name` AS `electiveName2` FROM (((((((select `u`.`userID` AS `userID`,`u`.`rut` AS `rut`,`u`.`firstName` AS `firstName`,`u`.`secondName` AS `secondName`,`u`.`surname1` AS `surname1`,`u`.`surname2` AS `surname2`,`u`.`sex` AS `sex`,`u`.`civilStatus` AS `civilStatus`,`u`.`birthday` AS `birthday`,`u`.`address` AS `address`,`u`.`email` AS `email`,`u`.`personalEmail` AS `personalEmail`,`u`.`phone` AS `phone`,`u`.`entry` AS `entry`,`u`.`group` AS `group`,`u`.`workPlace` AS `workPlace`,`u`.`phoneWork` AS `phoneWork`,`u`.`job` AS `job`,`u`.`articulation` AS `articulation` from (`usersWithRoles` `uwr` join `user` `u` on((`u`.`userID` = `uwr`.`userID`))) where (`uwr`.`role` = 'Estudiante')) `s` left join (select `sht`.`userID` AS `userID`,group_concat(`t`.`titleID` order by `t`.`titleID` ASC separator ';') AS `titlesID`,group_concat(`t`.`name` order by `t`.`titleID` ASC separator ';') AS `titles`,group_concat(`sht`.`studentHasTitleID` order by `t`.`titleID` ASC separator ';') AS `studentHasTitlesID` from (`studentHasTitle` `sht` join `title` `t` on((`t`.`titleID` = `sht`.`titleID`))) group by `sht`.`userID`) `tt` on((`s`.`userID` = `tt`.`userID`))) left join (select `shs`.`userID` AS `userID`,max(`shs`.`studentHasSpecializationID`) AS `studentHasSpecializationID` from `studentHasSpecialization` `shs` group by `shs`.`userID`) `ss` on((`s`.`userID` = `ss`.`userID`))) left join `studentHasSpecialization` `shs` on((`shs`.`studentHasSpecializationID` = `ss`.`studentHasSpecializationID`))) left join `specialization` `sp` on((`sp`.`specializationID` = `shs`.`specializationID`))) left join (select `she`.`userID` AS `userID`,max(`she`.`studentHasElectiveID`) AS `studentHasElectiveID`,`e`.`electiveID` AS `electiveID`,`e`.`name` AS `name`,`e`.`specializationID` AS `specializationID` from (`studentHasElective` `she` join `elective` `e` on((`e`.`electiveID` = `she`.`electiveID`))) where (`e`.`number` = 1) group by `she`.`userID`,`e`.`electiveID`,`e`.`name`,`e`.`specializationID`) `se1` on(((`s`.`userID` = `se1`.`userID`) and (`shs`.`specializationID` = `se1`.`specializationID`)))) left join (select `she`.`userID` AS `userID`,max(`she`.`studentHasElectiveID`) AS `studentHasElectiveID`,`e`.`electiveID` AS `electiveID`,`e`.`name` AS `name`,`e`.`specializationID` AS `specializationID` from (`studentHasElective` `she` join `elective` `e` on((`e`.`electiveID` = `she`.`electiveID`))) where (`e`.`number` = 2) group by `she`.`userID`,`e`.`electiveID`,`e`.`name`,`e`.`specializationID`) `se2` on(((`s`.`userID` = `se2`.`userID`) and (`shs`.`specializationID` = `se2`.`specializationID`)))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `thesisEvaluation`
--
DROP TABLE IF EXISTS `thesisEvaluation`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `thesisEvaluation`  AS SELECT `t`.`evaluationID` AS `evaluationID`, `t`.`studentHasSemesterID` AS `studentHasSemesterID`, `t`.`projectURL` AS `projectURL`, `t`.`formatID` AS `formatID`, `t`.`creationDate` AS `creationDate`, `t`.`updateDate` AS `updateDate`, `t`.`lateMinutes` AS `lateMinutes`, `t`.`thesisGradesID` AS `thesisGradesID`, `s`.`semesterID` AS `semesterID`, `s`.`year` AS `year`, `s`.`semesterNumber` AS `semesterNumber`, `s`.`startDate` AS `startDate`, `s`.`finishDate` AS `finishDate`, `u`.`userID` AS `userID`, `u`.`rut` AS `rut`, `u`.`fullName` AS `fullName`, `u`.`email` AS `email`, `sp`.`specializationID` AS `specializationID`, `sp`.`name` AS `specializationName`, `es`.`evaluationStatusID` AS `thesis_statusID`, `es`.`name` AS `thesis_status`, `es`.`description` AS `thesis_statusDescription`, round(`tg`.`finalGrade`,2) AS `finalGrade`, round(`tg`.`grade1`,2) AS `stage1_grade`, round(`tg`.`grade2`,2) AS `stage2_grade`, round(`tg`.`grade3`,2) AS `stage3_grade`, round(`te1`.`grade1`,2) AS `director_grade1`, round(`te1`.`grade2`,2) AS `director_grade2`, round(`te2`.`grade1`,2) AS `codirector_grade1`, round(`te2`.`grade2`,2) AS `codirector_grade2`, round(`te3`.`grade1`,2) AS `programDirector_grade1`, round(`te3`.`grade2`,2) AS `programDirector_grade2`, round(`te4`.`grade1`,2) AS `academicA_grade1`, round(`te4`.`grade2`,2) AS `academicA_grade2`, round(`te5`.`grade1`,2) AS `academicB_grade1`, round(`te5`.`grade2`,2) AS `academicB_grade2`, `r`.`rubricID` AS `rubric_rubricID`, `r`.`name` AS `rubric_name`, `r`.`description` AS `rubric_description`, `r`.`templateID` AS `rubric_templateID`, `te1`.`thesisEvaluatorID` AS `director_thesisEvaluatorID`, `e1`.`userID` AS `director_userID`, `e1`.`fullName` AS `director_fullName`, `e1`.`rut` AS `director_rut`, `e1`.`email` AS `director_email`, `te2`.`thesisEvaluatorID` AS `codirector_thesisEvaluatorID`, `e2`.`userID` AS `codirector_userID`, `e2`.`fullName` AS `codirector_fullName`, `e2`.`rut` AS `codirector_rut`, `e2`.`email` AS `codirector_email`, `te3`.`thesisEvaluatorID` AS `programDirector_thesisEvaluatorID`, `e3`.`userID` AS `programDirector_userID`, `e3`.`fullName` AS `programDirector_fullName`, `e3`.`rut` AS `programDirector_rut`, `e3`.`email` AS `programDirector_email`, `te4`.`thesisEvaluatorID` AS `academicA_thesisEvaluatorID`, `e4`.`userID` AS `academicA_userID`, `e4`.`fullName` AS `academicA_fullName`, `e4`.`rut` AS `academicA_rut`, `e4`.`email` AS `academicA_email`, `te5`.`thesisEvaluatorID` AS `academicB_thesisEvaluatorID`, `e5`.`userID` AS `academicB_userID`, `e5`.`fullName` AS `academicB_fullName`, `e5`.`rut` AS `academicB_rut`, `e5`.`email` AS `academicB_email` FROM (((((((((((((((((`evaluation` `t` join `evaluationStatus` `es` on((`t`.`evaluationStatusID` = `es`.`evaluationStatusID`))) join `thesisGrades` `tg` on((`t`.`thesisGradesID` = `tg`.`thesisGradesID`))) left join `rubric` `r` on((`t`.`rubricID` = `r`.`rubricID`))) join `studentHasSemester` `sse` on((`t`.`studentHasSemesterID` = `sse`.`studentHasSemesterID`))) join `semester` `s` on((`sse`.`semesterID` = `s`.`semesterID`))) join `specialization` `sp` on((`sse`.`specializationID` = `sp`.`specializationID`))) join `user_short` `u` on((`sse`.`userID` = `u`.`userID`))) left join `thesisEvaluator` `te1` on(((`t`.`evaluationID` = `te1`.`evaluationID`) and (`te1`.`evaluatorCategoryID` = 4)))) left join `user_short` `e1` on((`te1`.`userID` = `e1`.`userID`))) left join `thesisEvaluator` `te2` on(((`t`.`evaluationID` = `te2`.`evaluationID`) and (`te2`.`evaluatorCategoryID` = 5)))) left join `user_short` `e2` on((`te2`.`userID` = `e2`.`userID`))) left join `thesisEvaluator` `te3` on(((`t`.`evaluationID` = `te3`.`evaluationID`) and (`te3`.`evaluatorCategoryID` = 6)))) left join `user_short` `e3` on((`te3`.`userID` = `e3`.`userID`))) left join `thesisEvaluator` `te4` on(((`t`.`evaluationID` = `te4`.`evaluationID`) and (`te4`.`evaluatorCategoryID` = 2)))) left join `user_short` `e4` on((`te4`.`userID` = `e4`.`userID`))) left join `thesisEvaluator` `te5` on(((`t`.`evaluationID` = `te5`.`evaluationID`) and (`te5`.`evaluatorCategoryID` = 3)))) left join `user_short` `e5` on((`te5`.`userID` = `e5`.`userID`))) WHERE (`t`.`thesisGradesID` is not null) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `titleHasUniversity`
--
DROP TABLE IF EXISTS `titleHasUniversity`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `titleHasUniversity`  AS SELECT `t`.`titleID` AS `titleID`, `t`.`universityID` AS `universityID`, `t`.`degreeID` AS `degreeID`, `t`.`name` AS `name`, `t`.`areaID` AS `areaID`, `u`.`name` AS `universityName`, `u`.`country` AS `country`, `u`.`city` AS `city`, `d`.`name` AS `degree`, `d`.`type` AS `type` FROM ((`title` `t` join `degree` `d` on((`t`.`degreeID` = `d`.`degreeID`))) join `university` `u` on((`t`.`universityID` = `u`.`universityID`))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `userHasRoles`
--
DROP TABLE IF EXISTS `userHasRoles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `userHasRoles`  AS SELECT `u`.`userID` AS `userID`, `u`.`rut` AS `rut`, `u`.`firstName` AS `firstName`, `u`.`secondName` AS `secondName`, `u`.`surname1` AS `surname1`, `u`.`surname2` AS `surname2`, `u`.`sex` AS `sex`, `u`.`civilStatus` AS `civilStatus`, `u`.`birthday` AS `birthday`, `u`.`address` AS `address`, `u`.`email` AS `email`, `u`.`personalEmail` AS `personalEmail`, `u`.`phone` AS `phone`, `u`.`entry` AS `entry`, `u`.`group` AS `group`, `u`.`workPlace` AS `workPlace`, `u`.`phoneWork` AS `phoneWork`, `u`.`job` AS `job`, `u`.`articulation` AS `articulation`, `roles_agg`.`rolesID` AS `rolesID`, `roles_agg`.`roles` AS `roles` FROM (`user` `u` join (select `ru`.`userID` AS `userID`,group_concat(`ru`.`roleID` order by `ru`.`roleID` ASC separator ';') AS `rolesID`,group_concat(`r`.`name` order by `ru`.`roleID` ASC separator ';') AS `roles` from (`userHasRole` `ru` join `role` `r` on((`r`.`roleID` = `ru`.`roleID`))) group by `ru`.`userID`) `roles_agg` on((`u`.`userID` = `roles_agg`.`userID`))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `usersWithRoles`
--
DROP TABLE IF EXISTS `usersWithRoles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `usersWithRoles`  AS SELECT `uhr`.`userID` AS `userID`, `r`.`name` AS `role`, `r`.`roleID` AS `roleID` FROM (`userHasRole` `uhr` join `role` `r` on((`uhr`.`roleID` = `r`.`roleID`))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `user_short`
--
DROP TABLE IF EXISTS `user_short`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_short`  AS SELECT `u`.`userID` AS `userID`, `u`.`rut` AS `rut`, concat(`u`.`firstName`,' ',`u`.`secondName`,' ',`u`.`surname1`,' ',`u`.`surname2`) AS `fullName`, `u`.`email` AS `email` FROM `user` AS `u` ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `academicHasTitle`
--
ALTER TABLE `academicHasTitle`
  ADD CONSTRAINT `fk_academicHasTitle_formatID` FOREIGN KEY (`formatID`) REFERENCES `format` (`formatID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_academicHasTitle_titleID` FOREIGN KEY (`titleID`) REFERENCES `title` (`titleID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_academicHasTitle_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `academicInfo`
--
ALTER TABLE `academicInfo`
  ADD CONSTRAINT `fk_academicInfo_bestDegreeID` FOREIGN KEY (`bestDegreeID`) REFERENCES `academicHasTitle` (`academicHasTitleID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_academicInfo_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `assignedSpecialization`
--
ALTER TABLE `assignedSpecialization`
  ADD CONSTRAINT `fk_assignedSpecialization_semesterID` FOREIGN KEY (`semesterID`) REFERENCES `semester` (`semesterID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_assignedSpecialization_specializationID` FOREIGN KEY (`specializationID`) REFERENCES `specialization` (`specializationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_assignedSpecialization_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `bookChapter`
--
ALTER TABLE `bookChapter`
  ADD CONSTRAINT `fk_bookChapter_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `building`
--
ALTER TABLE `building`
  ADD CONSTRAINT `fk_building_campusID` FOREIGN KEY (`campusID`) REFERENCES `campus` (`campusID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `campus`
--
ALTER TABLE `campus`
  ADD CONSTRAINT `fk_campus_universityID` FOREIGN KEY (`universityID`) REFERENCES `university` (`universityID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `consultancy`
--
ALTER TABLE `consultancy`
  ADD CONSTRAINT `fk_consultancy_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `fk_document_formatID` FOREIGN KEY (`formatID`) REFERENCES `format` (`formatID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_document_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `elective`
--
ALTER TABLE `elective`
  ADD CONSTRAINT `fk_elective_specializationID` FOREIGN KEY (`specializationID`) REFERENCES `specialization` (`specializationID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluation`
--
ALTER TABLE `evaluation`
  ADD CONSTRAINT `fk_evaluation_evaluationStatusID` FOREIGN KEY (`evaluationStatusID`) REFERENCES `evaluationStatus` (`evaluationStatusID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_evaluation_formatID` FOREIGN KEY (`formatID`) REFERENCES `format` (`formatID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_evaluation_rubricID` FOREIGN KEY (`rubricID`) REFERENCES `rubric` (`rubricID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_evaluation_studentHasSemesterID` FOREIGN KEY (`studentHasSemesterID`) REFERENCES `studentHasSemester` (`studentHasSemesterID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_evaluation_thesisID` FOREIGN KEY (`thesisGradesID`) REFERENCES `thesisGrades` (`thesisGradesID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluatorAnswer`
--
ALTER TABLE `evaluatorAnswer`
  ADD CONSTRAINT `fk_evaluatorAnswer_preprojectEvaluatorID` FOREIGN KEY (`preprojectEvaluatorID`) REFERENCES `preprojectEvaluator` (`preprojectEvaluatorID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_evaluatorAnswer_rubricHasQuestionID` FOREIGN KEY (`rubricHasQuestionID`) REFERENCES `rubricHasQuestion` (`rubricHasQuestionID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `guidedThesis`
--
ALTER TABLE `guidedThesis`
  ADD CONSTRAINT `fk_guidedThesis_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `object`
--
ALTER TABLE `object`
  ADD CONSTRAINT `fk_object_formatID` FOREIGN KEY (`formatID`) REFERENCES `format` (`formatID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `otpToken`
--
ALTER TABLE `otpToken`
  ADD CONSTRAINT `fk_otpToken_email` FOREIGN KEY (`email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `patent`
--
ALTER TABLE `patent`
  ADD CONSTRAINT `fk_patent_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `preprojectEvaluator`
--
ALTER TABLE `preprojectEvaluator`
  ADD CONSTRAINT `fk_preprojectEvaluator_evaluationStatusID` FOREIGN KEY (`evaluationStatusID`) REFERENCES `evaluationStatus` (`evaluationStatusID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_preprojectEvaluator_evaluatorCategoryID` FOREIGN KEY (`evaluatorCategoryID`) REFERENCES `evaluatorCategory` (`evaluatorCategoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_preprojectEvaluator_preprojectID` FOREIGN KEY (`evaluationID`) REFERENCES `evaluation` (`evaluationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_preprojectEvaluator_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `fk_project_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `publication`
--
ALTER TABLE `publication`
  ADD CONSTRAINT `fk_publication_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `fk_question_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `fk_room_buildingID` FOREIGN KEY (`buildingID`) REFERENCES `building` (`buildingID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_room_formatID` FOREIGN KEY (`formatID`) REFERENCES `format` (`formatID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `roomHasObject`
--
ALTER TABLE `roomHasObject`
  ADD CONSTRAINT `fk_roomHasObject_objectID` FOREIGN KEY (`objectID`) REFERENCES `object` (`objectID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_roomHasObject_roomID` FOREIGN KEY (`roomID`) REFERENCES `room` (`roomID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rubric`
--
ALTER TABLE `rubric`
  ADD CONSTRAINT `fk_rubric_templateID` FOREIGN KEY (`templateID`) REFERENCES `template` (`templateID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rubricHasQuestion`
--
ALTER TABLE `rubricHasQuestion`
  ADD CONSTRAINT `fk_rubricHasQuestion_questionID` FOREIGN KEY (`questionID`) REFERENCES `question` (`questionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rubricHasQuestion_rubricID` FOREIGN KEY (`rubricHasSectionID`) REFERENCES `rubricHasSection` (`rubricHasSectionID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rubricHasSection`
--
ALTER TABLE `rubricHasSection`
  ADD CONSTRAINT `fk_rubricHasSection_rubricID1` FOREIGN KEY (`rubricID`) REFERENCES `rubric` (`rubricID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rubricHasSection_sectionID1` FOREIGN KEY (`sectionID`) REFERENCES `section` (`sectionID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `stageAnswer`
--
ALTER TABLE `stageAnswer`
  ADD CONSTRAINT `fk_stageAnswer_rubricHasQuestionID` FOREIGN KEY (`rubricHasQuestionID`) REFERENCES `rubricHasQuestion` (`rubricHasQuestionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_stageAnswer_thesisEvaluatorID` FOREIGN KEY (`thesisEvaluatorID`) REFERENCES `thesisEvaluator` (`thesisEvaluatorID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `studentHasElective`
--
ALTER TABLE `studentHasElective`
  ADD CONSTRAINT `fk_studentHasElective_electiveID` FOREIGN KEY (`electiveID`) REFERENCES `elective` (`electiveID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentHasElective_semesterID` FOREIGN KEY (`semesterID`) REFERENCES `semester` (`semesterID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentHasElective_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `studentHasSemester`
--
ALTER TABLE `studentHasSemester`
  ADD CONSTRAINT `fk_studentHasSemester_evaluationStatusID` FOREIGN KEY (`evaluationStatusID`) REFERENCES `evaluationStatus` (`evaluationStatusID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentHasSemester_evaluationTypeID` FOREIGN KEY (`evaluationTypeID`) REFERENCES `evaluationType` (`evaluationTypeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentHasSemester_semesterID` FOREIGN KEY (`semesterID`) REFERENCES `semester` (`semesterID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentHasSemester_specializationID` FOREIGN KEY (`specializationID`) REFERENCES `specialization` (`specializationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentHasSemester_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `studentHasSpecialization`
--
ALTER TABLE `studentHasSpecialization`
  ADD CONSTRAINT `fk_studentHasSpecialization_completionSemesterID` FOREIGN KEY (`completionSemesterID`) REFERENCES `semester` (`semesterID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentHasSpecialization_entrySemesterID` FOREIGN KEY (`entrySemesterID`) REFERENCES `semester` (`semesterID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentHasSpecialization_semesterStatusID` FOREIGN KEY (`semesterStatusID`) REFERENCES `semesterStatus` (`semesterStatusID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentHasSpecialization_specializationID` FOREIGN KEY (`specializationID`) REFERENCES `specialization` (`specializationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentHasSpecialization_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `studentHasTitle`
--
ALTER TABLE `studentHasTitle`
  ADD CONSTRAINT `fk_studentHasTitle_formatID` FOREIGN KEY (`formatID`) REFERENCES `format` (`formatID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentHasTitle_titleID` FOREIGN KEY (`titleID`) REFERENCES `title` (`titleID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_studentHasTitle_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `student_evaluator`
--
ALTER TABLE `student_evaluator`
  ADD CONSTRAINT `fk_student_evaluator_teacher_rubricID` FOREIGN KEY (`teacher_rubricID`) REFERENCES `teacher_rubric` (`teacher_rubricID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_student_evaluator_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `teacher_question`
--
ALTER TABLE `teacher_question`
  ADD CONSTRAINT `fk_teacher_question_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `teacher_rubric`
--
ALTER TABLE `teacher_rubric`
  ADD CONSTRAINT `fk_teacher_rubric_assignedSpecializationID` FOREIGN KEY (`assignedSpecializationID`) REFERENCES `assignedSpecialization` (`assignedSpecializationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_teacher_rubric_teacher_templateID` FOREIGN KEY (`teacher_templateID`) REFERENCES `teacher_template` (`teacher_templateID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `teacher_rubricHasQuestion`
--
ALTER TABLE `teacher_rubricHasQuestion`
  ADD CONSTRAINT `fk_teacher_rubricHasQuestion_teacher_questionID` FOREIGN KEY (`teacher_questionID`) REFERENCES `teacher_question` (`teacher_questionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_teacher_rubricHasQuestion_teacher_rubricID` FOREIGN KEY (`teacher_rubricHasSectionID`) REFERENCES `teacher_rubricHasSection` (`teacher_rubricHasSectionID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `teacher_rubricHasSection`
--
ALTER TABLE `teacher_rubricHasSection`
  ADD CONSTRAINT `fk_teacher_rubricHasSection_teacher_rubricID` FOREIGN KEY (`teacher_rubricID`) REFERENCES `teacher_rubric` (`teacher_rubricID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_teacher_rubricHasSection_teacher_sectionID` FOREIGN KEY (`teacher_sectionID`) REFERENCES `teacher_section` (`teacher_sectionID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `teacher_templateHasQuestion`
--
ALTER TABLE `teacher_templateHasQuestion`
  ADD CONSTRAINT `fk_teacher_templateHasQuestion_questionID` FOREIGN KEY (`teacher_questionID`) REFERENCES `teacher_question` (`teacher_questionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_teacher_templateHasQuestion_templateHasSectionID` FOREIGN KEY (`teacher_templateHasSectionID`) REFERENCES `teacher_templateHasSection` (`teacher_templateHasSectionID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `teacher_templateHasSection`
--
ALTER TABLE `teacher_templateHasSection`
  ADD CONSTRAINT `fk_teacher_templateHasSection_teacher_sectionID` FOREIGN KEY (`teacher_sectionID`) REFERENCES `teacher_section` (`teacher_sectionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_teacher_templateHasSection_teacher_templateID` FOREIGN KEY (`teacher_templateID`) REFERENCES `teacher_template` (`teacher_templateID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `templateHasQuestion`
--
ALTER TABLE `templateHasQuestion`
  ADD CONSTRAINT `fk_templateHasQuestion_questionID` FOREIGN KEY (`questionID`) REFERENCES `question` (`questionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_templateHasQuestion_templateHasSectionID` FOREIGN KEY (`templateHasSectionID`) REFERENCES `templateHasSection` (`templateHasSectionID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `templateHasSection`
--
ALTER TABLE `templateHasSection`
  ADD CONSTRAINT `fk_templateHasSection_sectionID` FOREIGN KEY (`sectionID`) REFERENCES `section` (`sectionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_templateHasSection_templateID` FOREIGN KEY (`templateID`) REFERENCES `template` (`templateID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `thesisEvaluator`
--
ALTER TABLE `thesisEvaluator`
  ADD CONSTRAINT `fk_thesisEvaluator_evaluationID` FOREIGN KEY (`evaluationID`) REFERENCES `evaluation` (`evaluationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_thesisEvaluator_evaluatorCategoryID` FOREIGN KEY (`evaluatorCategoryID`) REFERENCES `evaluatorCategory` (`evaluatorCategoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_thesisEvaluator_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `title`
--
ALTER TABLE `title`
  ADD CONSTRAINT `fk_title_areaID` FOREIGN KEY (`areaID`) REFERENCES `area` (`areaID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_title_universityID` FOREIGN KEY (`universityID`) REFERENCES `university` (`universityID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_titles_degreeID` FOREIGN KEY (`degreeID`) REFERENCES `degree` (`degreeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `userHasClassification`
--
ALTER TABLE `userHasClassification`
  ADD CONSTRAINT `userHasClassification_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE,
  ADD CONSTRAINT `userHasClassification_ibfk_2` FOREIGN KEY (`classificationID`) REFERENCES `classification` (`classificationID`) ON DELETE CASCADE;

--
-- Filtros para la tabla `userHasPermission`
--
ALTER TABLE `userHasPermission`
  ADD CONSTRAINT `fk_userHasPermission_permissionID` FOREIGN KEY (`permissionID`) REFERENCES `permission` (`permissionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_userHasPermission_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `userHasRole`
--
ALTER TABLE `userHasRole`
  ADD CONSTRAINT `fk_userHasRole_roleID` FOREIGN KEY (`roleID`) REFERENCES `role` (`roleID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_userHasRole_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
