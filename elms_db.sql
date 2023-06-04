-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: elms
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `BookID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) NOT NULL,
  `ISBN` varchar(20) NOT NULL,
  `PublicationDate` date DEFAULT NULL,
  `NumberOfPages` int DEFAULT NULL,
  `AvailableCopies` int DEFAULT NULL,
  `CoverImage` varchar(255) DEFAULT NULL,
  `PublisherID` int NOT NULL,
  `CategoryID` int NOT NULL,
  `Edition` int DEFAULT NULL,
  PRIMARY KEY (`BookID`),
  KEY `PublisherID` (`PublisherID`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`PublisherID`) REFERENCES `publisher` (`PublisherID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'Teach Yourself C++','9780078823864','1995-12-28',770,3,'img-1685001606647.ktm.jpg',3,1,3),(2,'Fundamentals of Nuclear Science and Engineering','9781498769303','2016-02-28',784,3,'img-1683191955337.7506_9781420051353.jpg',6,1,3),(3,'Krane - Introductory Nuclear Physics','9780471805533','1987-06-19',888,2,'img-1683522034337.R (4).jpg',1,4,1),(4,'Code The Hidden Language of Computer Hardware and Software','9780735611313','2000-10-10',400,3,'img-1683522079734.code_book.jpg',7,1,1),(5,'Compilers - Principles, Techniques, and Tools','9780321486813','2006-08-31',1039,3,'img-1683522169148.336682028_189280320524006_4668426993859854487_n.jpg',2,1,2),(6,'Digital Design and Computer Architecture RISC-V Edition','9780128207597','2020-05-07',626,3,'img-1683522260269.dc.jpg',8,1,1),(7,'Operating System Concepts','9781118129388','2012-06-30',1136,3,'img-1683522238691.os.jpg',1,1,9),(8,'Algorithms','9780321573513','2011-02-28',976,2,'img-1683191482713.OIP.jpg',2,1,4),(9,'Discrete Mathematics and Its Applications','9780073383095','2011-05-31',1072,3,'img-1683191076254.24f0f32c-f228-4cc4-a0dc-21a8276d1985.9ec2cdc9aecc7b37497eede71f57181d.jpeg',3,2,7),(10,'Problem Solving and Program Design in C','9781292098814','2014-12-31',839,3,'img-1683191395124.R.jpg',4,1,1),(11,'The Art of Prolog','9780262192282','1994-08-31',560,3,'img-1683191517306.R (1).jpg',5,1,2),(42,'Yanushevsky, Rafael - Modern missile guidance','9780815384861','2023-05-08',NULL,1,'img-1683521812820.moder_mis.jpg',6,3,2);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookcategory`
--

DROP TABLE IF EXISTS `bookcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookcategory` (
  `BookID` int NOT NULL,
  `CategoryID` int NOT NULL,
  PRIMARY KEY (`BookID`,`CategoryID`),
  KEY `CategoryID` (`CategoryID`),
  CONSTRAINT `bookcategory_ibfk_1` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`),
  CONSTRAINT `bookcategory_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookcategory`
--

LOCK TABLES `bookcategory` WRITE;
/*!40000 ALTER TABLE `bookcategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrowing`
--

DROP TABLE IF EXISTS `borrowing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrowing` (
  `BorrowingID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `BookID` int NOT NULL,
  `BorrowingDate` date DEFAULT NULL,
  `DueDate` date DEFAULT NULL,
  `ReturnDate` date DEFAULT NULL,
  PRIMARY KEY (`BorrowingID`),
  KEY `UserID` (`UserID`),
  KEY `BookID` (`BookID`),
  CONSTRAINT `borrowing_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `borrowing_ibfk_2` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrowing`
--

LOCK TABLES `borrowing` WRITE;
/*!40000 ALTER TABLE `borrowing` DISABLE KEYS */;
INSERT INTO `borrowing` VALUES (7,2,3,'2023-07-04','2023-07-11','2023-07-18'),(8,2,8,'2023-07-04','2023-07-11','2023-07-18');
/*!40000 ALTER TABLE `borrowing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Computer Science'),(2,'Mathematics'),(3,'Nuclear Engineering'),(4,'Nuclear Physics'),(5,'Action and Adventure'),(6,'Arts and Photography'),(7,'Biographies and Memoirs'),(8,'Business and Investing'),(9,'Children'),(10,'Classics'),(11,'Comics'),(12,'Computers and Technology'),(13,'Cookbooks'),(14,'Crafts and Hobbies'),(15,'Crime and Thrillers'),(16,'Education and Reference'),(17,'Fantasy'),(18,'Fiction'),(19,'Health and Fitness'),(20,'History'),(21,'Horror'),(22,'Humor and Entertainment'),(23,'Law'),(24,'Literature and Fiction'),(25,'Mystery'),(26,'Nonfiction'),(27,'Philosophy'),(28,'Poetry'),(29,'Politics and Social Sciences'),(30,'Religion and Spirituality'),(31,'Romance'),(32,'Science Fiction'),(33,'Science related'),(34,'Travel'),(35,'Young Adult'),(36,'Artificial Intelligence'),(37,'Computer Architecture'),(38,'Computer Graphics'),(39,'Computer Networking'),(40,'Computer Science'),(41,'Cryptography'),(42,'Data Science'),(43,'Database Systems'),(44,'Human-Computer Interaction'),(45,'Information Security'),(46,'Machine Learning'),(47,'Mobile Computing'),(48,'Natural Language Processing'),(49,'Operating Systems'),(50,'Parallel and Distributed Computing'),(51,'Programming Languages'),(52,'Robotics'),(53,'Software Engineering'),(54,'Theory of Computation');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `elibrary`
--

DROP TABLE IF EXISTS `elibrary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elibrary` (
  `BookID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) NOT NULL,
  `Edition` varchar(50) DEFAULT NULL,
  `NumberOfPages` int DEFAULT NULL,
  `CoverImage` varchar(255) DEFAULT NULL,
  `PDFFile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`BookID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `elibrary`
--

LOCK TABLES `elibrary` WRITE;
/*!40000 ALTER TABLE `elibrary` DISABLE KEYS */;
/*!40000 ALTER TABLE `elibrary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher` (
  `PublisherID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`PublisherID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES (1,'Wiley'),(2,'Addison-Wesley'),(3,'McGraw-Hill'),(4,'Pearson'),(5,'MIT Press'),(6,'CRC Press'),(7,'Microsoft Press'),(8,'Morgan Kaufmann'),(9,'b'),(10,'Keeway'),(11,'Tanvir');
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `password` varchar(500) DEFAULT NULL,
  `Email` varchar(50) NOT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `Admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin','$2b$10$bpKOaULH1VBRRkwvVfRsF.1Yh9XOQSdwF9Ilisx3GKSScih8AKUCi','admin@gmail.com',NULL,NULL,NULL,NULL,1),(2,'Mr.A','$2b$10$uANcK.exzywVochUa04wiedWEmsf1yOyqPd1H9r.X26Ax3ltOHwma','a@gmail.com','Altair','Khan','Dhaka','232223',0),(3,'b','$2b$10$EaR7Ks6Md52ZcpbVKtJpjOq3AFgg6iRKkIfPZeUQZBLYvyEE3DfJO','b@gmail.com','Benson','Chilli','Italy','023232222',0),(4,'shawon','$2b$10$4vHuDCwm1Om6ei1jXN7TnebGMzNkwXXCdvCW4shu8O3wNTZqPJTiq','shawon@gmail.com',NULL,NULL,NULL,NULL,0),(5,'Duti','$2b$10$PAxkjoNnPnOfXUEcb35x8e0E./fzKruAnC2u1nyI./ZUReQkarM1i','rafia@gmail.com',NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-05  2:09:57
