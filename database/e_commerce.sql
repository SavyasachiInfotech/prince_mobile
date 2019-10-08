-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2019 at 04:03 AM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_commerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(400) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `added_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `name`, `email`, `password`, `added_date`) VALUES
(1, 'Parth Dhankecha', 'admin@admin.com', 'a66abb5684c45962d887564f08346e8d', '2019-09-14 20:35:28');

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `id` int(11) NOT NULL,
  `announcement` varchar(2000) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `added_on` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`id`, `announcement`, `added_on`, `modified_date`) VALUES
(1, 'Use promocode NEW50 for 50% cashback upto 150 Rs. for new User', '2019-10-08 07:15:27', '2019-10-08 07:15:27'),
(2, 'Flat 30% off in all case-cover.', '2019-10-08 07:15:27', '2019-10-08 07:15:27'),
(3, 'Get 25 Rs. cashback at your first UPI transaction.', '2019-10-08 07:16:33', '2019-10-08 07:16:33'),
(4, '15% off on JBL Ultra Sound HeadPhone', '2019-10-08 07:16:33', '2019-10-08 07:16:33');

-- --------------------------------------------------------

--
-- Table structure for table `attribute`
--

CREATE TABLE `attribute` (
  `attribute_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `date_time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attribute`
--

INSERT INTO `attribute` (`attribute_id`, `name`, `date_time`) VALUES
(1, 'Size1', '2019-09-30 20:44:20'),
(2, 'Color', '2019-10-02 20:56:55');

-- --------------------------------------------------------

--
-- Table structure for table `attribute_value`
--

CREATE TABLE `attribute_value` (
  `attribute_value_id` int(11) NOT NULL,
  `value` varchar(100) DEFAULT NULL,
  `attribute_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attribute_value`
--

INSERT INTO `attribute_value` (`attribute_value_id`, `value`, `attribute_id`) VALUES
(1, 'XXL', 1),
(2, 'XL', 1),
(3, 'RED', 2),
(4, 'BLUE', 2),
(5, 'YELLOW', 2),
(6, 'PINK', 2),
(7, 'PURPlE', 2),
(8, 'ORANGE', 2),
(9, 'WHITE', 2);

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `image` varchar(700) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `banner_type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `image`, `category_id`, `banner_type`) VALUES
(1, 'banner1.jpg', 2, 0),
(2, 'banner2.jpg', 1, 0),
(3, 'banner3.jpg', 3, 0),
(4, 'banner4.jpg', 11, 0),
(5, 'banner5.jpg', 11, 0),
(6, 'banner6.jpg', 11, 0),
(7, 'banner7.jpg', 11, 0),
(8, 'offer1.jpg', 0, 1),
(9, 'offer2.jpg', 0, 1),
(10, 'offer3.jpg', 0, 1),
(11, 'offer4.webp', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `item_id` int(11) NOT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `variant_id` int(11) DEFAULT NULL,
  `attributes` text DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `added_date` datetime DEFAULT current_timestamp(),
  `modified_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(700) DEFAULT NULL,
  `image_required` tinyint(1) DEFAULT 0,
  `parent_id` int(11) DEFAULT NULL,
  `mobile_required` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `name`, `description`, `image`, `image_required`, `parent_id`, `mobile_required`) VALUES
(2, 'Design Print Soft Cover', 'Design Print Soft Cover', 'design-hard-cover.png', 0, 0, 1),
(3, 'Design Print Hard Cover', 'Design Print Hard Cover', 'design-hard-cover.png', 0, 0, 1),
(4, 'Photo Soft Cover', 'Photo Soft Cover', 'photo-covor.png', 1, 0, 1),
(5, 'Photo Hard Cover', 'Photo Hard Cover', 'photo-hard-cover.png', 1, 0, 1),
(6, 'Earphone', 'Earphone', 'ear-phone.png', 0, 0, 0),
(7, 'Cabel', 'Cabel', 'cabel.png', 0, 0, 0),
(8, 'Charger', 'Charger', 'charger.png', 0, 0, 0),
(9, 'Speaker', 'Speaker', 'speaker.png', 0, 0, 0),
(10, 'Design Print Soft Cover', '', 'soft-cover.png', 0, 2, 0),
(11, 'Soft Design Print Cover', '', 'soft-cover.png', 0, 2, 0),
(12, 'Design Print Hard Cover', '', 'design-hard-cover.png', 0, 3, 0),
(13, 'Hard Design Print Cover', '', 'design-hard-cover.png', 0, 3, 0),
(14, 'Rubber Photo Hard Cover', '', 'photo-covor.png', 1, 5, 0),
(15, 'Hard Photo Cover', '', 'photo-covor.png', 1, 5, 0),
(16, 'Rubber Photo Soft Cover', '', 'photo-covor.png', 1, 4, 0),
(17, 'Soft Photo Cover', '', 'photo-covor.png', 1, 4, 0),
(18, 'Lot Shot', '', 'lotshot.png', 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(400) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `mobile1` bigint(20) DEFAULT NULL,
  `mobile2` bigint(20) DEFAULT NULL,
  `flatno` varchar(50) DEFAULT NULL,
  `colony` varchar(300) DEFAULT NULL,
  `landmark` varchar(100) DEFAULT NULL,
  `address` varchar(800) DEFAULT NULL,
  `pincode` varchar(6) DEFAULT NULL,
  `profile_image` varchar(800) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `added_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp(),
  `reset_token` text DEFAULT NULL,
  `register_otp` int(11) DEFAULT NULL,
  `mobile_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `fname`, `lname`, `username`, `email`, `password`, `mobile1`, `mobile2`, `flatno`, `colony`, `landmark`, `address`, `pincode`, `profile_image`, `city`, `state`, `added_date`, `modified_date`, `reset_token`, `register_otp`, `mobile_verified`) VALUES
(12, NULL, NULL, 'Parth Dhankecha', 'b@cb.com', 'E10ADC3949BA59ABBE56E057F20F883E', 9858633363, NULL, '', '', '', NULL, '', NULL, NULL, NULL, '2019-10-02 08:59:52', '2019-10-02 08:59:52', NULL, 715426, 0);

-- --------------------------------------------------------

--
-- Table structure for table `customer_address`
--

CREATE TABLE `customer_address` (
  `address_id` int(11) NOT NULL,
  `add1` text DEFAULT NULL,
  `add2` text DEFAULT NULL,
  `add3` text DEFAULT NULL,
  `landmark` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `mobile` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_order`
--

CREATE TABLE `customer_order` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `shipment_id` varchar(100) DEFAULT NULL,
  `awbno` varchar(100) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `apx_shipped_date` date DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `added_date` datetime DEFAULT current_timestamp(),
  `modified_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mobile_brand`
--

CREATE TABLE `mobile_brand` (
  `brand_id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mobile_models`
--

CREATE TABLE `mobile_models` (
  `model_id` int(11) NOT NULL,
  `model_name` varchar(100) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mobile_models`
--

INSERT INTO `mobile_models` (`model_id`, `model_name`, `brand_id`) VALUES
(1, 'Redmi 7 pro', NULL),
(2, 'Redmi 6 pro', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `offer_id` int(11) NOT NULL,
  `name` varchar(300) DEFAULT NULL,
  `offer_per` float DEFAULT NULL,
  `maximum_limit` int(11) DEFAULT NULL COMMENT 'Discount upto rs.',
  `banner` varchar(700) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `item_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `variant_id` int(11) DEFAULT NULL,
  `attributes` text DEFAULT NULL,
  `variant` text DEFAULT NULL COMMENT 'JSON of whole Product',
  `quantity` int(11) DEFAULT NULL,
  `cancel_bit` tinyint(1) DEFAULT NULL,
  `unit_cost` int(11) DEFAULT NULL,
  `promocode` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `is_display` tinyint(1) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `description`, `is_display`, `category_id`) VALUES
(1, 'Soft leather print back cover good quality Camera protection layer', 1, 11),
(2, 'Soft leather print back cover good quality Camera protection layer', 1, 18),
(3, 'Soft leather print back cover good quality Camera protection layer', 1, 2),
(4, 'Soft leather print back cover good quality Camera protection layer', 1, 3),
(5, 'Soft leather print back cover good quality Camera protection layer', 1, 4),
(6, 'Soft leather print back cover good quality Camera protection layer', 1, 5),
(7, 'Soft leather print back cover good quality Camera protection layer', 1, 6),
(8, 'Soft leather print back cover good quality Camera protection layer', 1, 18);

-- --------------------------------------------------------

--
-- Table structure for table `product_specification`
--

CREATE TABLE `product_specification` (
  `variant_id` int(11) NOT NULL,
  `specification_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_specification`
--

INSERT INTO `product_specification` (`variant_id`, `specification_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7),
(4, 8),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(5, 5),
(5, 6),
(5, 7),
(5, 8),
(6, 1),
(6, 2),
(6, 3),
(6, 4),
(6, 5),
(6, 6),
(6, 7),
(6, 8),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5),
(7, 6),
(7, 7),
(7, 8),
(8, 1),
(8, 2),
(8, 3),
(8, 4),
(8, 5),
(8, 6),
(8, 7),
(8, 8),
(9, 1),
(9, 2),
(9, 3),
(9, 4),
(9, 5),
(9, 6),
(9, 7),
(9, 8),
(10, 1),
(10, 2),
(10, 3),
(10, 4),
(10, 5),
(10, 6),
(10, 7),
(10, 8),
(11, 1),
(11, 2),
(11, 3),
(11, 4),
(11, 5),
(11, 6),
(11, 7),
(11, 8),
(12, 1),
(12, 2),
(12, 3),
(12, 4),
(12, 5),
(12, 6),
(12, 7),
(12, 8),
(13, 1),
(13, 2),
(13, 3),
(13, 4),
(13, 5),
(13, 6),
(13, 7),
(13, 8),
(14, 1),
(14, 2),
(14, 3),
(14, 4),
(14, 5),
(14, 6),
(14, 7),
(14, 8),
(15, 1),
(15, 2),
(15, 3),
(15, 4),
(15, 5),
(15, 6),
(15, 7),
(15, 8),
(16, 1),
(16, 2),
(16, 3),
(16, 4),
(16, 5),
(16, 6),
(16, 7),
(16, 8),
(17, 1),
(17, 2),
(17, 3),
(17, 4),
(17, 5),
(17, 6),
(17, 7),
(17, 8),
(18, 1),
(18, 2),
(18, 3),
(18, 4),
(18, 5),
(18, 6),
(18, 7),
(18, 8),
(19, 1),
(19, 2),
(19, 3),
(19, 4),
(19, 5),
(19, 6),
(19, 7),
(19, 8),
(20, 1),
(20, 2),
(20, 3),
(20, 4),
(20, 5),
(20, 6),
(20, 7),
(20, 8),
(21, 1),
(21, 2),
(21, 3),
(21, 4),
(21, 5),
(21, 6),
(21, 7),
(21, 8),
(22, 1),
(22, 2),
(22, 3),
(22, 4),
(22, 5),
(22, 6),
(22, 7),
(22, 8),
(23, 1),
(23, 2),
(23, 3),
(23, 4),
(23, 5),
(23, 6),
(23, 7),
(23, 8),
(24, 1),
(24, 2),
(24, 3),
(24, 4),
(24, 5),
(24, 6),
(24, 7),
(24, 8),
(25, 1),
(25, 2),
(25, 3),
(25, 4),
(25, 5),
(25, 6),
(25, 7),
(25, 8),
(26, 1),
(26, 2),
(26, 3),
(26, 4),
(26, 5),
(26, 6),
(26, 7),
(26, 8),
(27, 1),
(27, 2),
(27, 3),
(27, 4),
(27, 5),
(27, 6),
(27, 7),
(27, 8),
(28, 1),
(28, 2),
(28, 3),
(28, 4),
(28, 5),
(28, 6),
(28, 7),
(28, 8),
(29, 1),
(29, 2),
(29, 3),
(29, 4),
(29, 5),
(29, 6),
(29, 7),
(29, 8),
(30, 1),
(30, 2),
(30, 3),
(30, 4),
(30, 5),
(30, 6),
(30, 7),
(30, 8),
(31, 1),
(31, 2),
(31, 3),
(31, 4),
(31, 5),
(31, 6),
(31, 7),
(31, 8),
(32, 1),
(32, 2),
(32, 3),
(32, 4),
(32, 5),
(32, 6),
(32, 7),
(32, 8),
(33, 1),
(33, 2),
(33, 3),
(33, 4),
(33, 5),
(33, 6),
(33, 7),
(33, 8),
(34, 1),
(34, 2),
(34, 3),
(34, 4),
(34, 5),
(34, 6),
(34, 7),
(34, 8),
(35, 1),
(35, 2),
(35, 3),
(35, 4),
(35, 5),
(35, 6),
(35, 7),
(35, 8),
(36, 1),
(36, 2),
(36, 3),
(36, 4),
(36, 5),
(36, 6),
(36, 7),
(36, 8),
(37, 1),
(37, 2),
(37, 3),
(37, 4),
(37, 5),
(37, 6),
(37, 7),
(37, 8),
(38, 1),
(38, 2),
(38, 3),
(38, 4),
(38, 5),
(38, 6),
(38, 7),
(38, 8);

-- --------------------------------------------------------

--
-- Table structure for table `product_variant`
--

CREATE TABLE `product_variant` (
  `variant_id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `tax_id` int(11) DEFAULT NULL,
  `accept_promocode` tinyint(1) DEFAULT NULL,
  `min_qty` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `parent` tinyint(1) DEFAULT NULL,
  `avg_rating` float DEFAULT NULL,
  `attribute` text DEFAULT NULL COMMENT 'JSON format attributes',
  `thumbnail` text DEFAULT NULL COMMENT 'JSON Array',
  `list_image` text DEFAULT NULL COMMENT 'JSON Array',
  `view_image` text DEFAULT NULL COMMENT 'JSON Array',
  `main_image` text DEFAULT NULL COMMENT 'JSON Array',
  `product_id` int(11) NOT NULL,
  `order_count` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `added_on` datetime DEFAULT current_timestamp(),
  `modified_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_variant`
--

INSERT INTO `product_variant` (`variant_id`, `name`, `price`, `discount`, `tax_id`, `accept_promocode`, `min_qty`, `quantity`, `parent`, `avg_rating`, `attribute`, `thumbnail`, `list_image`, `view_image`, `main_image`, `product_id`, `order_count`, `admin_id`, `added_on`, `modified_date`) VALUES
(1, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 1, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(2, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 1, 50, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(3, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 1, 20, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(4, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 1, 100, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(5, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 2, 11, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(6, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 2, 20, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(7, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 2, 55, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(8, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 2, 0, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(9, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 3, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(10, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 3, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(11, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 3, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(12, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 3, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(13, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 3, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(14, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 3, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(15, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 4, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(16, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 4, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(17, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 4, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(18, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 4, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(19, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 4, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(20, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 5, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(21, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 5, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(22, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 5, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(23, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 6, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(24, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 6, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(25, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 6, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(26, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 7, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(27, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 2, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(28, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 2, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(29, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 2, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(30, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 7, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(31, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 7, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(32, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 7, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(33, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 7, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(34, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 7, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(35, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 8, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(36, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 8, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(37, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 8, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50'),
(38, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 8, 10, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50');

-- --------------------------------------------------------

--
-- Table structure for table `return_reason`
--

CREATE TABLE `return_reason` (
  `id` int(11) NOT NULL,
  `reason` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `shipping`
--

CREATE TABLE `shipping` (
  `id` int(11) NOT NULL,
  `max_amount` float DEFAULT NULL,
  `charge` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `specification`
--

CREATE TABLE `specification` (
  `specification_id` int(11) NOT NULL,
  `specification_key` varchar(80) DEFAULT NULL,
  `specification_value` varchar(300) NOT NULL,
  `date_time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `specification`
--

INSERT INTO `specification` (`specification_id`, `specification_key`, `specification_value`, `date_time`) VALUES
(1, 'Compatibility Type', 'Back Case', '2019-10-05 20:57:09'),
(2, 'Built Type and Surface', '\r\nSoft Case Fancy, \r\nSoft Case Logo, \r\nSoft Case Printed, ', '2019-10-05 20:57:09'),
(3, 'Warranty Period', '1 Month', '2019-10-05 20:58:24'),
(4, 'Material', 'TPU,Plastic,Hard Plastic,Rubber, ', '2019-10-05 20:58:24'),
(5, 'Theme', 'Colourful', '2019-10-05 20:59:55'),
(6, 'color', 'Black', '2019-10-05 20:59:55'),
(7, 'Built Type and Surface', 'Soft Case 360', '2019-10-05 21:00:53'),
(8, 'Model Number', 'Aspgkk_Red_Mei_7_Blue1', '2019-10-05 21:02:52');

-- --------------------------------------------------------

--
-- Table structure for table `specification_type`
--

CREATE TABLE `specification_type` (
  `id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tax`
--

CREATE TABLE `tax` (
  `tax_id` int(11) NOT NULL,
  `tax` float NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `tax`
--

INSERT INTO `tax` (`tax_id`, `tax`, `name`) VALUES
(1, 2.5, 'CGST'),
(2, 2.5, 'SGST'),
(3, 5, 'IGST');

-- --------------------------------------------------------

--
-- Table structure for table `variant_attribute`
--

CREATE TABLE `variant_attribute` (
  `variant_id` int(11) NOT NULL,
  `attribute_value_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `variant_attribute`
--

INSERT INTO `variant_attribute` (`variant_id`, `attribute_value_id`) VALUES
(1, 3),
(2, 4),
(3, 5),
(4, 6),
(5, 3),
(6, 4),
(7, 5),
(8, 6),
(9, 3),
(10, 4),
(11, 5),
(12, 6),
(13, 7),
(14, 9),
(15, 3),
(16, 4),
(17, 5),
(18, 6),
(19, 7),
(20, 3),
(21, 3),
(22, 5),
(23, 3),
(24, 4),
(25, 7),
(26, 3),
(27, 7),
(28, 8),
(29, 9),
(30, 4),
(31, 5),
(32, 6),
(33, 7),
(34, 8),
(35, 3),
(36, 4),
(37, 5),
(38, 6);

-- --------------------------------------------------------

--
-- Table structure for table `variant_mobile`
--

CREATE TABLE `variant_mobile` (
  `variant_id` int(11) NOT NULL,
  `mobile_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attribute`
--
ALTER TABLE `attribute`
  ADD PRIMARY KEY (`attribute_id`);

--
-- Indexes for table `attribute_value`
--
ALTER TABLE `attribute_value`
  ADD PRIMARY KEY (`attribute_value_id`),
  ADD KEY `attribute_id` (`attribute_id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_address`
--
ALTER TABLE `customer_address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `customer_order`
--
ALTER TABLE `customer_order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `address_id` (`address_id`);

--
-- Indexes for table `mobile_brand`
--
ALTER TABLE `mobile_brand`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `mobile_models`
--
ALTER TABLE `mobile_models`
  ADD PRIMARY KEY (`model_id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`offer_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_specification`
--
ALTER TABLE `product_specification`
  ADD PRIMARY KEY (`variant_id`,`specification_id`);

--
-- Indexes for table `product_variant`
--
ALTER TABLE `product_variant`
  ADD PRIMARY KEY (`variant_id`),
  ADD KEY `tax_id` (`tax_id`),
  ADD KEY `Admin ID` (`admin_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `return_reason`
--
ALTER TABLE `return_reason`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipping`
--
ALTER TABLE `shipping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specification`
--
ALTER TABLE `specification`
  ADD PRIMARY KEY (`specification_id`);

--
-- Indexes for table `specification_type`
--
ALTER TABLE `specification_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tax`
--
ALTER TABLE `tax`
  ADD PRIMARY KEY (`tax_id`);

--
-- Indexes for table `variant_attribute`
--
ALTER TABLE `variant_attribute`
  ADD PRIMARY KEY (`variant_id`,`attribute_value_id`);

--
-- Indexes for table `variant_mobile`
--
ALTER TABLE `variant_mobile`
  ADD PRIMARY KEY (`variant_id`,`mobile_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `attribute`
--
ALTER TABLE `attribute`
  MODIFY `attribute_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `attribute_value`
--
ALTER TABLE `attribute_value`
  MODIFY `attribute_value_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `customer_address`
--
ALTER TABLE `customer_address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_order`
--
ALTER TABLE `customer_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mobile_brand`
--
ALTER TABLE `mobile_brand`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mobile_models`
--
ALTER TABLE `mobile_models`
  MODIFY `model_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `offer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product_variant`
--
ALTER TABLE `product_variant`
  MODIFY `variant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `return_reason`
--
ALTER TABLE `return_reason`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipping`
--
ALTER TABLE `shipping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `specification`
--
ALTER TABLE `specification`
  MODIFY `specification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `specification_type`
--
ALTER TABLE `specification_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tax`
--
ALTER TABLE `tax`
  MODIFY `tax_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
