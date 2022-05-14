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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cart`
--

LOCK TABLES `tbl_cart` WRITE;
/*!40000 ALTER TABLE `tbl_cart` DISABLE KEYS */;
INSERT INTO `tbl_cart` VALUES (1,'1','2022-05-14 15:41:34',NULL),(2,'1','2022-05-14 15:43:58',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_cart_items`
--

LOCK TABLES `tbl_cart_items` WRITE;
/*!40000 ALTER TABLE `tbl_cart_items` DISABLE KEYS */;
INSERT INTO `tbl_cart_items` VALUES (1,'1','1','1',NULL,NULL,'1'),(2,'1','2','2',NULL,NULL,'1');
/*!40000 ALTER TABLE `tbl_cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_order_items`
--

DROP TABLE IF EXISTS `tbl_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_order_items` (
  `TOI_Id` bigint NOT NULL AUTO_INCREMENT,
  `TOI_Order_Id` varchar(45) DEFAULT NULL,
  `TOI_Product_Id` varchar(45) DEFAULT NULL,
  `TOI_Quantity` varchar(45) DEFAULT NULL,
  `TOI_Created_On` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `TOI_Updated_On` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`TOI_Id`),
  UNIQUE KEY `TOI_Id_UNIQUE` (`TOI_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_order_items`
--

LOCK TABLES `tbl_order_items` WRITE;
/*!40000 ALTER TABLE `tbl_order_items` DISABLE KEYS */;
INSERT INTO `tbl_order_items` VALUES (1,'ECNJS-2114-000','1','1','2022-05-14 15:46:36',NULL),(2,'ECNJS-2114-000','1','2','2022-05-14 15:46:36',NULL),(4,'ECNJS-2127-000','1','1','2022-05-14 15:47:48',NULL),(5,'ECNJS-2127-000','1','2','2022-05-14 15:47:48',NULL),(7,'ECNJS-2105-000','1','1','2022-05-14 15:48:25',NULL),(8,'ECNJS-2105-000','1','2','2022-05-14 15:48:25',NULL),(10,'ECNJS-2120-000','1','1','2022-05-14 15:49:39',NULL),(11,'ECNJS-2120-000','1','2','2022-05-14 15:49:39',NULL),(13,'ECNJS-2102-000','1','1','2022-05-14 15:50:20',NULL),(14,'ECNJS-2102-000','1','2','2022-05-14 15:50:20',NULL),(16,'ECNJS-2141-000','1','1','2022-05-14 15:50:59',NULL),(17,'ECNJS-2141-000','1','2','2022-05-14 15:50:59',NULL),(19,'ECNJS-2159-000','1','1','2022-05-14 16:28:39',NULL),(20,'ECNJS-2159-000','1','2','2022-05-14 16:28:39',NULL);
/*!40000 ALTER TABLE `tbl_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_orders`
--

DROP TABLE IF EXISTS `tbl_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_orders` (
  `TO_Id` bigint NOT NULL AUTO_INCREMENT,
  `TO_Order_Id` varchar(255) DEFAULT NULL,
  `TO_User_Id` varchar(45) DEFAULT NULL,
  `TO_Net_Price` varchar(45) DEFAULT NULL,
  `TO_Shipping_Cost` varchar(45) DEFAULT NULL,
  `TO_Total_Price` varchar(45) DEFAULT NULL,
  `TO_Coupon_Code` varchar(45) DEFAULT NULL,
  `TO_Created_On` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `TO_Updated_On` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`TO_Id`),
  UNIQUE KEY `TO_Id_UNIQUE` (`TO_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_orders`
--

LOCK TABLES `tbl_orders` WRITE;
/*!40000 ALTER TABLE `tbl_orders` DISABLE KEYS */;
INSERT INTO `tbl_orders` VALUES (1,'ECNJS-2114-000','1','400','200','600',NULL,'2022-05-14 15:46:36',NULL),(2,'ECNJS-2127-000','1','400','200','600',NULL,'2022-05-14 15:47:48',NULL),(3,'ECNJS-2105-000','1','400','200','600',NULL,'2022-05-14 15:48:25',NULL),(4,'ECNJS-2120-000','1','0','200','200',NULL,'2022-05-14 15:49:39',NULL),(5,'ECNJS-2102-000','1','0','200','200',NULL,'2022-05-14 15:50:20',NULL),(6,'ECNJS-2141-000','1','400','200','600',NULL,'2022-05-14 15:50:59',NULL),(7,'ECNJS-2159-000','1','400','200','600',NULL,'2022-05-14 16:28:39',NULL);
/*!40000 ALTER TABLE `tbl_orders` ENABLE KEYS */;
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
 1 AS `TCI_CartItem_AddedBy`,
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
-- Temporary view structure for view `vw_order_details`
--

DROP TABLE IF EXISTS `vw_order_details`;
/*!50001 DROP VIEW IF EXISTS `vw_order_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_order_details` AS SELECT 
 1 AS `TO_Id`,
 1 AS `TO_Order_Id`,
 1 AS `TO_User_Id`,
 1 AS `TO_Net_Price`,
 1 AS `TO_Shipping_Cost`,
 1 AS `TO_Total_Price`,
 1 AS `TO_Coupon_Code`,
 1 AS `TO_Created_On`,
 1 AS `TO_Updated_On`,
 1 AS `TOI_Id`,
 1 AS `TOI_Product_Id`,
 1 AS `TOI_Quantity`,
 1 AS `TOI_Created_On`,
 1 AS `TOI_Updated_On`,
 1 AS `TUM_FirstName`,
 1 AS `TUM_LastName`,
 1 AS `TUM_Role`,
 1 AS `TUM_Email`,
 1 AS `TUM_MobileNo`,
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
/*!50001 VIEW `vw_cart_items` AS select `tc`.`TC_Id` AS `TC_Cart_Id`,`tci`.`TCI_Id` AS `TCI_CartItems_Id`,`tci`.`TCI_Quantity` AS `TCI_Quantity`,`tci`.`TCI_CartItem_AddedBy` AS `TCI_CartItem_AddedBy`,`tu`.`TUM_FirstName` AS `TUM_FirstName`,`tu`.`TUM_LastName` AS `TUM_LastName`,`tu`.`TUM_Email` AS `TUM_Email`,`tu`.`TUM_MobileNo` AS `TUM_MobileNo`,`tci`.`TCI_ProductId` AS `TCI_ProductId`,`tci`.`TCI_Created_Time` AS `TCI_Created_Time`,`tci`.`TCI_Updated_Time` AS `TCI_Updated_Time`,`tu`.`TUM_Role` AS `TUM_Role`,`tc`.`TC_CreatedAt` AS `TC_CreatedAt`,`tc`.`TC_UpdatedAt` AS `TC_UpdatedAt`,`tp`.`TP_Product_Title` AS `TP_Product_Title`,`tp`.`TP_Product_Description` AS `TP_Product_Description`,`tp`.`TP_Image_URL` AS `TP_Image_URL`,`tp`.`TP_Product_Price` AS `TP_Product_Price`,`tp`.`TP_Product_DeletedFlag` AS `TP_Product_DeletedFlag` from (((`tbl_cart` `tc` join `tbl_cart_items` `tci`) join `tbl_users` `tu`) join `tbl_products` `tp` on(((`tu`.`TUM_Id` = `tc`.`TC_CreatedBy`) and (`tc`.`TC_Id` = `tci`.`TCI_CartId`) and (`tp`.`TP_ProductId` = `tci`.`TCI_ProductId`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_order_details`
--

/*!50001 DROP VIEW IF EXISTS `vw_order_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_order_details` AS select `tbo`.`TO_Id` AS `TO_Id`,`tbo`.`TO_Order_Id` AS `TO_Order_Id`,`tbo`.`TO_User_Id` AS `TO_User_Id`,`tbo`.`TO_Net_Price` AS `TO_Net_Price`,`tbo`.`TO_Shipping_Cost` AS `TO_Shipping_Cost`,`tbo`.`TO_Total_Price` AS `TO_Total_Price`,`tbo`.`TO_Coupon_Code` AS `TO_Coupon_Code`,`tbo`.`TO_Created_On` AS `TO_Created_On`,`tbo`.`TO_Updated_On` AS `TO_Updated_On`,`tot`.`TOI_Id` AS `TOI_Id`,`tot`.`TOI_Product_Id` AS `TOI_Product_Id`,`tot`.`TOI_Quantity` AS `TOI_Quantity`,`tot`.`TOI_Created_On` AS `TOI_Created_On`,`tot`.`TOI_Updated_On` AS `TOI_Updated_On`,`tu`.`TUM_FirstName` AS `TUM_FirstName`,`tu`.`TUM_LastName` AS `TUM_LastName`,`tu`.`TUM_Role` AS `TUM_Role`,`tu`.`TUM_Email` AS `TUM_Email`,`tu`.`TUM_MobileNo` AS `TUM_MobileNo`,`tp`.`TP_Product_Title` AS `TP_Product_Title`,`tp`.`TP_Product_Description` AS `TP_Product_Description`,`tp`.`TP_Image_URL` AS `TP_Image_URL`,`tp`.`TP_Product_Price` AS `TP_Product_Price`,`tp`.`TP_Product_DeletedFlag` AS `TP_Product_DeletedFlag` from (((`tbl_orders` `tbo` join `tbl_order_items` `tot`) join `tbl_users` `tu`) join `tbl_products` `tp` on(((`tbo`.`TO_Order_Id` = `tot`.`TOI_Order_Id`) and (`tbo`.`TO_User_Id` = `tu`.`TUM_Id`) and (`tp`.`TP_ProductId` = `tot`.`TOI_Product_Id`)))) */;
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

-- Dump completed on 2022-05-14 22:40:56
