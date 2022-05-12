-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: e-commerce-nodejs
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `tbl_cart`
--

DROP TABLE IF EXISTS `tbl_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_cart` (
  `TC_Id` bigint NOT NULL AUTO_INCREMENT,
  `TC_CreatedBy` varchar(255) DEFAULT NULL,
  `TC_CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `TC_UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`TC_Id`),
  UNIQUE KEY `TC_Id_UNIQUE` (`TC_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cart`
--

LOCK TABLES `tbl_cart` WRITE;
/*!40000 ALTER TABLE `tbl_cart` DISABLE KEYS */;
INSERT INTO `tbl_cart` VALUES (1,'1','2022-05-12 15:11:17',NULL),(2,'1','2022-05-12 15:11:18',NULL),(3,'1','2022-05-12 15:11:20',NULL);
/*!40000 ALTER TABLE `tbl_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_cart_items`
--

DROP TABLE IF EXISTS `tbl_cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_cart_items` (
  `TCI_Id` bigint NOT NULL AUTO_INCREMENT,
  `TCI_Quantity` varchar(45) DEFAULT NULL,
  `TCI_CartId` varchar(45) DEFAULT NULL,
  `TCI_ProductId` varchar(45) DEFAULT NULL,
  `TCI_Created_Time` timestamp NULL DEFAULT NULL,
  `TCI_Updated_Time` timestamp NULL DEFAULT NULL,
  `TCI_CartItem_AddedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`TCI_Id`),
  UNIQUE KEY `TCI_Id_UNIQUE` (`TCI_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cart_items`
--

LOCK TABLES `tbl_cart_items` WRITE;
/*!40000 ALTER TABLE `tbl_cart_items` DISABLE KEYS */;
INSERT INTO `tbl_cart_items` VALUES (1,'2','1','1',NULL,NULL,NULL),(2,'2','2','2',NULL,NULL,NULL),(3,'2','3','4',NULL,NULL,NULL);
/*!40000 ALTER TABLE `tbl_cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_products`
--

DROP TABLE IF EXISTS `tbl_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_products` (
  `TP_ProductId` int NOT NULL AUTO_INCREMENT,
  `TP_Product_Title` text,
  `TP_Product_Description` text,
  `TP_Image_URL` text,
  `TP_Product_Price` varchar(45) DEFAULT NULL,
  `TP_Product_AddedBy` varchar(255) DEFAULT NULL,
  `TP_Product_CreatedBy` varchar(255) DEFAULT NULL,
  `TP_Product_ModifiedBy` varchar(255) DEFAULT NULL,
  `TP_Product_DeletedFlag` tinyint DEFAULT NULL,
  PRIMARY KEY (`TP_ProductId`),
  UNIQUE KEY `TP_ProductId_UNIQUE` (`TP_ProductId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_products`
--

LOCK TABLES `tbl_products` WRITE;
/*!40000 ALTER TABLE `tbl_products` DISABLE KEYS */;
INSERT INTO `tbl_products` VALUES (1,'Book 1','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','https://live.staticflickr.com/5217/5471047557_4dc13f5376_n.jpg','200','',NULL,NULL,NULL),(2,'Book 22','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','https://live.staticflickr.com/5217/5471047557_4dc13f5376_n.jpg','200',NULL,NULL,NULL,NULL),(3,'Book 3','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','https://live.staticflickr.com/5217/5471047557_4dc13f5376_n.jpg','200',NULL,NULL,NULL,NULL),(4,'Book 4','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','https://live.staticflickr.com/5217/5471047557_4dc13f5376_n.jpg','200',NULL,NULL,NULL,NULL),(5,'Book 5','Loren Ipsum','https://live.staticflickr.com/5217/5471047557_4dc13f5376_n.jpg','200',NULL,NULL,NULL,NULL),(6,'Book 6','Loreingmklwr','https://live.staticflickr.com/5217/5471047557_4dc13f5376_n.jpg','200',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tbl_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_users` (
  `TUM_Id` int NOT NULL AUTO_INCREMENT,
  `TUM_FirstName` text,
  `TUM_LastName` text,
  `TUM_Role` varchar(45) DEFAULT NULL,
  `TUM_Email` varchar(255) DEFAULT NULL,
  `TUM_MobileNo` varchar(45) DEFAULT NULL,
  `TUM_Password` text,
  `TUM_CreatedBy` timestamp NULL DEFAULT NULL,
  `TUM_UpdatedBy` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`TUM_Id`),
  UNIQUE KEY `TUM_Id_UNIQUE` (`TUM_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (1,'Asish','B','superadmin','asish@gmail.com',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_cart_items`
--

DROP TABLE IF EXISTS `vw_cart_items`;
/*!50001 DROP VIEW IF EXISTS `vw_cart_items`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_cart_items` AS SELECT 
 1 AS `TC_Cart_Id`,
 1 AS `TCI_CartItems_Id`,
 1 AS `TCI_Quantity`,
 1 AS `TC_Cart_CreatedBy`,
 1 AS `TUM_FirstName`,
 1 AS `TUM_LastName`,
 1 AS `TUM_Email`,
 1 AS `TUM_MobileNo`,
 1 AS `TCI_ProductId`,
 1 AS `TCI_Created_Time`,
 1 AS `TCI_Updated_Time`,
 1 AS `TUM_Role`,
 1 AS `TC_CreatedAt`,
 1 AS `TC_UpdatedAt`,
 1 AS `TP_Product_Title`,
 1 AS `TP_Product_Description`,
 1 AS `TP_Image_URL`,
 1 AS `TP_Product_Price`,
 1 AS `TP_Product_DeletedFlag`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'e-commerce-nodejs'
--

--
-- Dumping routines for database 'e-commerce-nodejs'
--

--
-- Final view structure for view `vw_cart_items`
--

/*!50001 DROP VIEW IF EXISTS `vw_cart_items`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_cart_items` AS select `tc`.`TC_Id` AS `TC_Cart_Id`,`tci`.`TCI_Id` AS `TCI_CartItems_Id`,`tci`.`TCI_Quantity` AS `TCI_Quantity`,`tc`.`TC_CreatedBy` AS `TC_Cart_CreatedBy`,`tu`.`TUM_FirstName` AS `TUM_FirstName`,`tu`.`TUM_LastName` AS `TUM_LastName`,`tu`.`TUM_Email` AS `TUM_Email`,`tu`.`TUM_MobileNo` AS `TUM_MobileNo`,`tci`.`TCI_ProductId` AS `TCI_ProductId`,`tci`.`TCI_Created_Time` AS `TCI_Created_Time`,`tci`.`TCI_Updated_Time` AS `TCI_Updated_Time`,`tu`.`TUM_Role` AS `TUM_Role`,`tc`.`TC_CreatedAt` AS `TC_CreatedAt`,`tc`.`TC_UpdatedAt` AS `TC_UpdatedAt`,`tp`.`TP_Product_Title` AS `TP_Product_Title`,`tp`.`TP_Product_Description` AS `TP_Product_Description`,`tp`.`TP_Image_URL` AS `TP_Image_URL`,`tp`.`TP_Product_Price` AS `TP_Product_Price`,`tp`.`TP_Product_DeletedFlag` AS `TP_Product_DeletedFlag` from (((`tbl_cart` `tc` join `tbl_cart_items` `tci`) join `tbl_users` `tu`) join `tbl_products` `tp` on(((`tu`.`TUM_Id` = `tc`.`TC_CreatedBy`) and (`tc`.`TC_Id` = `tci`.`TCI_CartId`) and (`tp`.`TP_ProductId` = `tci`.`TCI_ProductId`)))) */;
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

-- Dump completed on 2022-05-12 22:11:19
