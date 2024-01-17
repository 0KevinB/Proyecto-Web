-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: proyecto-web
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alquiler`
--

DROP TABLE IF EXISTS `alquiler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alquiler` (
  `RentalID` int NOT NULL AUTO_INCREMENT,
  `Cedula` varchar(20) DEFAULT NULL,
  `BikeID` int DEFAULT NULL,
  `FechaInicio` datetime DEFAULT NULL,
  `FechaFin` datetime DEFAULT NULL,
  `EstadoAlquiler` varchar(50) DEFAULT NULL,
  `MontoTotal` decimal(8,2) DEFAULT NULL,
  `LocationID` int DEFAULT NULL,
  PRIMARY KEY (`RentalID`),
  KEY `Cedula` (`Cedula`),
  KEY `BikeID` (`BikeID`),
  KEY `LocationID` (`LocationID`),
  CONSTRAINT `alquiler_ibfk_1` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_10` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_11` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_12` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_13` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_14` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_15` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_16` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_17` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_18` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_19` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_2` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_20` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_21` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_22` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_23` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_24` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_25` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_26` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_27` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_28` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_29` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_3` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_30` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_31` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_32` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_33` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_34` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_35` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_36` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_37` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_38` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_39` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_4` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_40` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_41` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_42` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_43` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_44` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_45` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_46` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_47` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_48` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_49` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_5` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_50` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_51` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_52` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_53` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_54` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_55` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_56` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_57` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_58` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_59` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_6` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_60` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_61` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_62` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_63` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_64` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_65` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_66` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_67` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_68` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_69` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_7` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_70` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_71` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_72` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_73` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_74` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_75` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_8` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `alquiler_ibfk_9` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alquiler`
--

LOCK TABLES `alquiler` WRITE;
/*!40000 ALTER TABLE `alquiler` DISABLE KEYS */;
INSERT INTO `alquiler` VALUES (1,'1105716938',1,'2024-01-17 18:35:22','2024-01-17 18:45:22','Finalizada',35.00,1),(2,'1105716938',3,'2024-01-17 19:52:50','2024-01-17 19:55:50','Finalizada',4.50,2),(3,'1105716938',3,'2024-01-17 22:07:39','2024-01-17 22:08:39','Finalizada',1.50,2),(4,'1105716938',1,'2024-01-17 22:26:01','2024-01-17 22:28:01','Finalizada',7.00,1),(5,'1105716938',3,'2024-01-17 22:38:39','2024-01-17 22:58:39','Finalizada',30.00,2),(6,'1105716938',3,'2024-01-17 22:43:52','2024-01-17 22:56:52','Finalizada',19.50,2),(7,'1105716938',3,'2024-01-17 22:47:28','2024-01-17 22:59:28','Finalizada',18.00,2),(8,'1105716938',3,'2024-01-17 22:59:54','2024-01-17 23:00:54','Finalizada',1.50,2);
/*!40000 ALTER TABLE `alquiler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bicicleta`
--

DROP TABLE IF EXISTS `bicicleta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bicicleta` (
  `BikeID` int NOT NULL AUTO_INCREMENT,
  `Modelo` varchar(255) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `PrecioPorHora` decimal(8,2) DEFAULT NULL,
  `Descripcion` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`BikeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bicicleta`
--

LOCK TABLES `bicicleta` WRITE;
/*!40000 ALTER TABLE `bicicleta` DISABLE KEYS */;
INSERT INTO `bicicleta` VALUES (1,'Cube Agree Hybrid C:62 SLT Disc','Eléctrica','Muy bueno',3.50,'Motor: Sistema de asistencia al pedaleo con motor Fazua Evation 2.0, que proporciona un impulso adicional durante el pedaleo. Batería: Batería integrada en el tubo diagonal del cuadro, con capacidad de almacenamiento ajustable y extraíble para facilitar la carga.','2024-01-17 18:27:45','2024-01-17 18:27:45'),(3,'Cube Reaction Hybrid EX 625 Allroad','Tradicional','Muy bueno',1.50,'Motor: Equipado con un motor eléctrico Bosch Performance Line CX, que ofrece una asistencia potente para enfrentar terrenos difíciles en bicicletas de montaña eléctricas. Batería: Incorpora una batería Bosch PowerTube de 625 Wh, integrada en el cuadro para proporcionar una mayor autonomía en rutas largas y exigentes.','2024-01-17 19:52:10','2024-01-17 19:52:10');
/*!40000 ALTER TABLE `bicicleta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bicicleta_ubicacion`
--

DROP TABLE IF EXISTS `bicicleta_ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bicicleta_ubicacion` (
  `Bicicleta_UbicacionID` int NOT NULL AUTO_INCREMENT,
  `LocationID` int DEFAULT NULL,
  `BikeID` int DEFAULT NULL,
  PRIMARY KEY (`Bicicleta_UbicacionID`),
  UNIQUE KEY `Bicicleta_Ubicacion_BikeID_LocationID_unique` (`LocationID`,`BikeID`),
  KEY `BikeID` (`BikeID`),
  CONSTRAINT `bicicleta_ubicacion_ibfk_1` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_10` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_11` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_12` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_13` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_14` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_15` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_16` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_17` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_18` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_19` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_2` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_20` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_21` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_22` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_23` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_24` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_25` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_26` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_27` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_28` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_29` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_3` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_30` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_31` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_32` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_33` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_34` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_35` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_36` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_37` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_38` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_39` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_4` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_40` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_41` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_42` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_43` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_44` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_45` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_46` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_47` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_48` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_49` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_5` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_50` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_6` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_7` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_8` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `bicicleta_ubicacion_ibfk_9` FOREIGN KEY (`LocationID`) REFERENCES `ubicacion` (`LocationID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bicicleta_ubicacion`
--

LOCK TABLES `bicicleta_ubicacion` WRITE;
/*!40000 ALTER TABLE `bicicleta_ubicacion` DISABLE KEYS */;
INSERT INTO `bicicleta_ubicacion` VALUES (1,1,1),(2,2,3);
/*!40000 ALTER TABLE `bicicleta_ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `CarritoID` int NOT NULL AUTO_INCREMENT,
  `Cedula` varchar(20) DEFAULT NULL,
  `BikeID` int DEFAULT NULL,
  `HorasSeleccionadas` int DEFAULT NULL,
  `FechaInicio` datetime DEFAULT NULL,
  `FechaFinalizacion` datetime DEFAULT NULL,
  `PrecioTotal` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`CarritoID`),
  KEY `Cedula` (`Cedula`),
  KEY `BikeID` (`BikeID`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_10` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_11` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_12` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_13` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_14` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_15` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_16` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_17` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_18` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_19` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_20` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_21` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_22` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_23` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_24` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_25` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_26` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_27` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_28` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_29` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_3` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_30` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_31` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_32` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_33` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_34` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_35` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_36` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_37` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_38` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_39` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_4` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_40` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_41` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_42` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_43` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_44` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_45` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_46` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_47` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_48` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_49` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_5` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_50` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_6` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_7` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_8` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `carrito_ibfk_9` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (1,'1105716938',1,10,'2024-01-17 18:35:22','2024-01-17 18:45:22',35.00),(2,'1105716938',3,3,'2024-01-17 19:52:50','2024-01-17 19:55:50',4.50),(3,'1105716938',3,1,'2024-01-17 22:07:39','2024-01-17 22:08:39',1.50),(4,'1105716938',1,2,'2024-01-17 22:26:01','2024-01-17 22:28:01',7.00),(5,'1105716938',3,20,'2024-01-17 22:38:39','2024-01-17 22:58:39',30.00),(6,'1105716938',3,13,'2024-01-17 22:43:52','2024-01-17 22:56:52',19.50),(7,'1105716938',3,12,'2024-01-17 22:47:28','2024-01-17 22:59:28',18.00),(8,'1105716938',3,1,'2024-01-17 22:59:54','2024-01-17 23:00:54',1.50);
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `controlcalidad`
--

DROP TABLE IF EXISTS `controlcalidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `controlcalidad` (
  `QualityControlID` int NOT NULL AUTO_INCREMENT,
  `BikeID` int DEFAULT NULL,
  `FechaRevision` datetime DEFAULT NULL,
  `Observaciones` text,
  `EstadoCalidad` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`QualityControlID`),
  KEY `BikeID` (`BikeID`),
  CONSTRAINT `controlcalidad_ibfk_1` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_10` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_11` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_12` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_13` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_14` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_15` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_16` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_17` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_18` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_19` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_2` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_20` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_21` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_22` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_23` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_24` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_25` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_3` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_4` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_5` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_6` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_7` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_8` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `controlcalidad_ibfk_9` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `controlcalidad`
--

LOCK TABLES `controlcalidad` WRITE;
/*!40000 ALTER TABLE `controlcalidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `controlcalidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mantenimiento`
--

DROP TABLE IF EXISTS `mantenimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mantenimiento` (
  `MaintenanceID` int NOT NULL AUTO_INCREMENT,
  `BikeID` int DEFAULT NULL,
  `DescripcionMantenimiento` text,
  `FechaInicioMantenimiento` datetime DEFAULT NULL,
  `FechaFinMantenimiento` datetime DEFAULT NULL,
  `CostoMantenimiento` decimal(8,2) DEFAULT NULL,
  `EstadoMantenimiento` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`MaintenanceID`),
  KEY `BikeID` (`BikeID`),
  CONSTRAINT `mantenimiento_ibfk_1` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_10` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_11` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_12` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_13` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_14` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_15` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_16` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_17` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_18` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_19` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_2` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_20` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_21` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_22` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_23` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_24` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_25` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_3` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_4` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_5` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_6` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_7` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_8` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_9` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mantenimiento`
--

LOCK TABLES `mantenimiento` WRITE;
/*!40000 ALTER TABLE `mantenimiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `mantenimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propietariobicicletas`
--

DROP TABLE IF EXISTS `propietariobicicletas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propietariobicicletas` (
  `OwnerID` int NOT NULL AUTO_INCREMENT,
  `Cedula` varchar(20) DEFAULT NULL,
  `BikeID` int DEFAULT NULL,
  `imagenReferencia` varchar(255) DEFAULT NULL,
  `Estado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`OwnerID`),
  KEY `Cedula` (`Cedula`),
  KEY `BikeID` (`BikeID`),
  CONSTRAINT `propietariobicicletas_ibfk_1` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_10` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_11` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_12` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_13` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_14` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_15` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_16` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_17` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_18` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_19` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_2` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_20` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_21` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_22` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_23` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_24` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_25` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_26` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_27` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_28` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_29` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_3` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_30` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_31` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_32` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_33` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_34` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_35` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_36` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_37` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_38` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_39` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_4` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_40` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_41` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_42` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_43` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_44` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_45` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_46` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_47` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_48` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_49` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_5` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_50` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_6` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_7` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_8` FOREIGN KEY (`BikeID`) REFERENCES `bicicleta` (`BikeID`) ON UPDATE CASCADE,
  CONSTRAINT `propietariobicicletas_ibfk_9` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propietariobicicletas`
--

LOCK TABLES `propietariobicicletas` WRITE;
/*!40000 ALTER TABLE `propietariobicicletas` DISABLE KEYS */;
INSERT INTO `propietariobicicletas` VALUES (1,'1105716938',1,'1705516065569-Captura de pantalla 2024-01-03 195416.png',1),(3,'1105716938',3,'1705521130094-Captura de pantalla 2024-01-17 145011.png',1);
/*!40000 ALTER TABLE `propietariobicicletas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (2,'Administrador'),(3,'Mantenimiento'),(1,'Usuario');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaccion`
--

DROP TABLE IF EXISTS `transaccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaccion` (
  `TransactionID` int NOT NULL AUTO_INCREMENT,
  `Cedula` varchar(20) DEFAULT NULL,
  `RentalID` int DEFAULT NULL,
  `Monto` decimal(8,2) DEFAULT NULL,
  `MetodoPago` varchar(50) DEFAULT NULL,
  `FechaTransaccion` datetime DEFAULT NULL,
  PRIMARY KEY (`TransactionID`),
  KEY `Cedula` (`Cedula`),
  KEY `RentalID` (`RentalID`),
  CONSTRAINT `transaccion_ibfk_1` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_10` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_11` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_12` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_13` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_14` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_15` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_16` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_17` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_18` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_19` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_2` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_20` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_21` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_22` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_23` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_24` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_25` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_26` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_27` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_28` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_29` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_3` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_30` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_31` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_32` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_33` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_34` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_35` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_36` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_37` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_38` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_39` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_4` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_40` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_41` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_42` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_43` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_44` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_45` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_46` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_47` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_48` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_49` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_5` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_50` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_6` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_7` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_8` FOREIGN KEY (`RentalID`) REFERENCES `alquiler` (`RentalID`) ON UPDATE CASCADE,
  CONSTRAINT `transaccion_ibfk_9` FOREIGN KEY (`Cedula`) REFERENCES `usuarios` (`Cedula`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaccion`
--

LOCK TABLES `transaccion` WRITE;
/*!40000 ALTER TABLE `transaccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ubicacion`
--

DROP TABLE IF EXISTS `ubicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ubicacion` (
  `LocationID` int NOT NULL AUTO_INCREMENT,
  `NombreUbicacion` varchar(255) DEFAULT NULL,
  `Latitud` decimal(10,6) DEFAULT NULL,
  `Longitud` decimal(10,6) DEFAULT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`LocationID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
INSERT INTO `ubicacion` VALUES (1,'Parque central ',-3.996983,-79.201527,'10 de agosto entre Bernardo Valdivieso y Bolivar '),(2,'Parque infantil',-4.005027,-79.199911,'Andrés Bello y José Joaquín de Olmedo ');
/*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `Cedula` varchar(20) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `CorreoElectronico` varchar(50) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Direccion` varchar(50) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `Estado` tinyint(1) DEFAULT '0',
  `RolID` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`Cedula`),
  UNIQUE KEY `CorreoElectronico` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_2` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_3` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_4` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_5` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_6` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_7` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_8` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_9` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_10` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_11` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_12` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_13` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_14` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_15` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_16` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_17` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_18` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_19` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_20` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_21` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_22` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_23` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_24` (`CorreoElectronico`),
  UNIQUE KEY `CorreoElectronico_25` (`CorreoElectronico`),
  KEY `RolID` (`RolID`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`RolID`) REFERENCES `rol` (`ID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('1105589426','Kevin Alexander ','Barrazueta Quizhpe ','kevin010803abq@gmail.com','$2b$10$b7lWfnoH6BZ.nvuOC5zbhOWvvtoeqD1LPcu9pcbJmho9oG7JtBPay','Daniel Álvarez ','0962645019',0,2,'2024-01-17 18:30:35','2024-01-17 18:30:35'),('1105716938','Carolina de los Ángeles','Alvarado Jiménez ','carolalvaradojime@gmail.com','$2b$10$KCsTWdQ/rryCYXTsmq9fgOL6eo2S7.a1nsdqtRk1nL/cC6gqPLyGu','Zamora Huayco ','+593991850524',0,1,'2024-01-17 18:25:25','2024-01-17 18:25:25');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-17 18:26:51
