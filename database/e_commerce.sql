-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2020 at 01:17 PM
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
  `name` varchar(100) DEFAULT '',
  `email` varchar(400) DEFAULT '',
  `password` varchar(40) DEFAULT '',
  `added_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `name`, `email`, `password`, `added_date`) VALUES
(1, 'Parth Dhankecha', 'admin@admin.com', '21232f297a57a5a743894a0e4a801fc3', '2019-09-14 20:35:28');

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `id` int(11) NOT NULL,
  `description` varchar(2000) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `added_on` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp(),
  `title` varchar(100) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `image_url` varchar(1000) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `is_read` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`id`, `description`, `added_on`, `modified_date`, `title`, `image_url`, `is_read`) VALUES
(1, 'Use promocode NEW50 for 50% cashback upto 150 Rs. for new User', '2019-10-08 07:15:27', '2019-10-08 07:15:27', 'Flat 50 % off Test', '', 0),
(2, 'Flat 30% off in all case-cover.', '2019-10-08 07:15:27', '2019-10-08 07:15:27', 'Flat 30 % off', '', 0),
(3, 'Get 25 Rs. cashback at your first UPI transaction.', '2019-10-08 07:16:33', '2019-10-08 07:16:33', '25 off on UPI Transaction', '', 1),
(4, '15% off on JBL Ultra Sound HeadPhone', '2019-10-08 07:16:33', '2019-10-08 07:16:33', '15 % Off on Sound', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `attribute`
--

CREATE TABLE `attribute` (
  `attribute_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT '',
  `date_time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attribute`
--

INSERT INTO `attribute` (`attribute_id`, `name`, `date_time`) VALUES
(1, 'Size1', '2019-09-30 20:44:20'),
(2, 'Color', '2019-10-02 20:56:55'),
(3, 'Brand', '2019-11-18 08:25:19');

-- --------------------------------------------------------

--
-- Table structure for table `attribute_value`
--

CREATE TABLE `attribute_value` (
  `attribute_value_id` int(11) NOT NULL,
  `value` varchar(100) DEFAULT '',
  `attribute_id` int(11) DEFAULT 0
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
(9, 'WHITE', 2),
(10, 'BLACK', 2);

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `image` varchar(700) DEFAULT '',
  `category_id` int(11) DEFAULT 0,
  `banner_type` int(11) DEFAULT 0
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
(8, 'offer1.jpg', 0, 1),
(9, 'offer2.jpg', 0, 1),
(10, 'offer3.jpg', 0, 1),
(11, 'offer4.webp', 0, 1),
(13, '1580041162627search (2).png', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `item_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL DEFAULT 0,
  `variant_id` int(11) NOT NULL DEFAULT 0,
  `quantity` int(11) DEFAULT 0,
  `mobile_required` tinyint(1) NOT NULL DEFAULT 0,
  `mobile_id` int(11) NOT NULL DEFAULT 0,
  `color_id` int(11) NOT NULL DEFAULT 0,
  `size_id` int(11) NOT NULL DEFAULT 0,
  `added_date` datetime DEFAULT current_timestamp(),
  `modified_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`item_id`, `cart_id`, `variant_id`, `quantity`, `mobile_required`, `mobile_id`, `color_id`, `size_id`, `added_date`, `modified_date`) VALUES
(242, 12, 64, 5, 1, 2, 2, 1, '2020-02-22 17:08:24', '2020-02-22 17:08:24'),
(243, 12, 64, 4, 1, 3, 2, 1, '2020-02-22 17:08:24', '2020-02-22 17:08:24');

-- --------------------------------------------------------

--
-- Table structure for table `cart_mobile`
--

CREATE TABLE `cart_mobile` (
  `item_id` int(11) NOT NULL DEFAULT 0,
  `variant_id` int(11) NOT NULL DEFAULT 0,
  `mobile_id` int(11) NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `cart_mobile`
--

INSERT INTO `cart_mobile` (`item_id`, `variant_id`, `mobile_id`, `quantity`) VALUES
(19, 1, 1, 1),
(19, 1, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(60) DEFAULT '',
  `description` text DEFAULT '',
  `image` varchar(700) DEFAULT '',
  `image_required` tinyint(1) DEFAULT 0,
  `parent_id` int(11) DEFAULT 0,
  `mobile_required` tinyint(1) DEFAULT 0,
  `promo_images` varchar(5000) NOT NULL DEFAULT '[]',
  `is_display` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `name`, `description`, `image`, `image_required`, `parent_id`, `mobile_required`, `promo_images`, `is_display`) VALUES
(2, 'Design Print Soft Cover', 'Design Print Soft Cover', 'design-hard-cover.png', 0, 0, 1, '[\"Radhika_Infotech.jpg-1575645524332.jpg\"]', 0),
(3, 'Design Print Hard Cover', 'Design Print Hard Cover', 'design-hard-cover.png', 0, 0, 1, '[\"Radhika_Infotech.jpg-1575628062047.jpg\",\"logo9.png-1575627417727.png\"]', 1),
(4, 'Photo Soft Cover', 'Photo Soft Cover', 'photo-covor.png', 1, 0, 1, '[]', 1),
(5, 'Photo Hard Cover', 'Photo Hard Cover', 'photo-hard-cover.png', 1, 0, 1, '[\"a.jpg-1578142384287.jpg\",\"b.jpg-1578142387267.jpg\",\"d.jpg-1578142388196.jpg\",\"g.jpg-1578142390756.jpg\"]', 1),
(6, 'Earphone', 'Earphone', 'ear-phone.png', 0, 0, 0, '[]', 1),
(7, 'Cabel', 'Cabel', 'cabel.png', 0, 0, 0, '[]', 1),
(8, 'Charger', 'Charger', 'charger.png', 0, 0, 0, '[]', 1),
(9, 'Speaker', 'Speaker', 'speaker.png', 0, 0, 0, '[]', 1),
(10, 'Design Print Soft Cover', '', 'soft-cover.png', 0, 2, 0, '[]', 1),
(11, 'Soft Design Print Cover', '', 'soft-cover.png', 0, 2, 0, '[]', 1),
(12, 'Design Print Hard Cover', '', 'design-hard-cover.png', 0, 3, 0, '[]', 1),
(13, 'Hard Design Print Cover', '', 'design-hard-cover.png', 0, 3, 0, '[]', 1),
(14, 'Rubber Photo Hard Cover', '', 'photo-covor.png', 1, 5, 0, '[]', 1),
(15, 'Hard Photo Cover', '', 'photo-covor.png', 1, 5, 0, '[]', 1),
(16, 'Rubber Photo Soft Cover', '', 'photo-covor.png', 1, 4, 0, '[]', 1),
(17, 'Soft Photo Cover', '', 'photo-covor.png', 1, 4, 0, '[]', 1),
(18, 'Lot Shot', '', '1579716385858delivery-truck (1).png', 0, 0, 1, '[]', 1),
(19, 'Parth Test', 'Testing', NULL, 1, 0, 1, '[]', 0),
(20, 'Parth Sub Category', 'Test desc', NULL, 0, 19, 0, '[]', 1),
(21, 'sdsa', '', '', 0, 0, 0, '[]', 1),
(22, 'ydsajghfukjdsb j', '', '1579716572003delivery-truck (1).png', 0, 0, 0, '[]', 1),
(24, 'sad', 'sadf', '', 0, 3, 0, '[]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `fname` varchar(100) DEFAULT '',
  `lname` varchar(100) DEFAULT '',
  `username` varchar(100) DEFAULT '',
  `email` varchar(400) DEFAULT '',
  `password` varchar(40) DEFAULT '',
  `mobile1` bigint(20) DEFAULT 0,
  `mobile2` bigint(20) DEFAULT 0,
  `flatno` varchar(50) DEFAULT '',
  `colony` varchar(300) DEFAULT '',
  `landmark` varchar(100) DEFAULT '',
  `address` varchar(800) DEFAULT '',
  `pincode` varchar(6) DEFAULT '',
  `profile_image` varchar(800) DEFAULT '',
  `city` varchar(100) DEFAULT '',
  `state` varchar(100) DEFAULT '',
  `added_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp(),
  `reset_token` text DEFAULT '',
  `register_otp` int(11) DEFAULT 0,
  `mobile_verified` tinyint(1) DEFAULT 0,
  `block_bit` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `fname`, `lname`, `username`, `email`, `password`, `mobile1`, `mobile2`, `flatno`, `colony`, `landmark`, `address`, `pincode`, `profile_image`, `city`, `state`, `added_date`, `modified_date`, `reset_token`, `register_otp`, `mobile_verified`, `block_bit`) VALUES
(12, NULL, NULL, 'Parth Dhankecha', 'a@a.com', 'E10ADC3949BA59ABBE56E057F20F883E', 9737156065, NULL, '', '', '', NULL, '', NULL, NULL, NULL, '2019-10-02 08:59:52', '2019-10-02 08:59:52', NULL, 252476, 0, 0),
(17, NULL, NULL, 'A Xyz', 'pmd3290@gmail.co', 'E10ADC3949BA59ABBE56E057F20F883E', 9737156061, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-10-26 10:53:48', '2019-10-26 10:53:48', NULL, 917531, 0, 0),
(18, NULL, NULL, 'A Xyz', 'pmd3290@gmail.com', 'fcea920f7412b5da7be0cf42b8c93759', 9737156062, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-10-26 17:47:04', '2019-10-26 17:47:04', '709782', 713440, 0, 0),
(19, '', '', 'Sheetal', 'sheetughori7@gmail.com', '12010e22b282d32e69d2728ba5b6abf9', 9924176971, 0, '', '', '', '', '', '', '', '', '2019-12-21 15:18:44', '2019-12-21 15:18:44', '601322', 326392, 0, 0),
(20, '', '', 'MAULIK PANSURIYA', 'maulikpansuriya111@gmail.com', '32d3a3dbb25520665ca7cdb7531ea6ca', 8000754750, 0, '', '', '', '', '', '15781437193141578143718134.jpg', '', '', '2019-12-21 17:31:32', '2019-12-21 17:31:32', '', 342777, 0, 1),
(21, '', '', 'Sample', 'anandyadav1280@gmail.com', 'e550b8269c0eebc2afb6e99c01b392ef', 8530172127, 0, '', '', '', '', '', '15770794324871577079431766.jpg', '', '', '2019-12-22 05:59:15', '2019-12-22 05:59:15', '', 186700, 0, 0),
(22, '', '', 'Sanket', 'sanketvanani6492@gmail.com', '5135ed4027e72b59ff77f7237b6b4783', 8347583112, 0, '', '', '', '', '', '', '', '', '2019-12-23 08:02:06', '2019-12-23 08:02:06', '', 432421, 0, 0),
(23, '', '', 'Yatinj', 'yatinjpatel30@gmail.com', '7731875540eaf66de7e7e70db46d5a07', 8732977817, 0, '', '', '', '', '', '', '', '', '2019-12-23 10:58:04', '2019-12-23 10:58:04', '', 965733, 0, 0),
(24, '', '', 'Pinal', 'pinal.gangani@gmail.com', '8f8a3cf1970388a02230b3e2d742087b', 8401894494, 0, '', '', '', '', '', '', '', '', '2019-12-25 16:27:05', '2019-12-25 16:27:05', '', 782987, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `customer_address`
--

CREATE TABLE `customer_address` (
  `address_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL DEFAULT '',
  `last_name` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(400) NOT NULL DEFAULT '',
  `flatno` text DEFAULT '',
  `colony` text DEFAULT '',
  `landmark` varchar(100) DEFAULT '',
  `city` varchar(100) DEFAULT '',
  `state` varchar(100) DEFAULT '',
  `pincode` int(11) DEFAULT 0,
  `mobile` bigint(11) DEFAULT 0,
  `customer_id` int(11) DEFAULT 0,
  `default_address` tinyint(1) NOT NULL DEFAULT 0,
  `zipping_address_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_address`
--

INSERT INTO `customer_address` (`address_id`, `first_name`, `last_name`, `email`, `flatno`, `colony`, `landmark`, `city`, `state`, `pincode`, `mobile`, `customer_id`, `default_address`, `zipping_address_id`) VALUES
(1, 'Parth', 'Dhankecha', 'pmdhankecha.18@gmail.com', 'c-18, shivdarshan socity', 'yogichowk', 'Yogichowk', 'Surat', 'Surat', 395010, 9737156062, 12, 1, 0),
(2, 'Parth', 'Dhankecha', 'pmdhankecha.18@gmail.com', 'c-18, shivdarshan socity', 'yogichowk', 'Yogichowk', 'Surat', 'Surat', 395010, 9737156062, 12, 0, 0),
(3, 'Parth', 'Dhankecha', 'pmdhankecha.18@gmail.com', 'c-18, shivdarshan socity', 'yogichowk', 'Yogichowk', 'Surat', 'Gujarat', 395010, 9737156062, 12, 0, 0),
(5, 'pinal', 'patrl', 'rushitghori83@gmail.com', '23', 'colony ', 'mota varachha ', 'surat', 'Gujarat ', 395010, 8879879886, 19, 1, 0),
(7, 'g', 'bb', 'bn@gmail.com', '2', 'hh', 'hh', 'ff', 'cc', 395010, 5858585858, 21, 1, 0),
(9, 'Mehul bhai', 'senta', 'ms.mobileworld07@gmail.com', '45', 'vdv', 'xbb', 'surat', 'gujrat', 395010, 8000968500, 20, 1, 6);

-- --------------------------------------------------------

--
-- Table structure for table `customer_order`
--

CREATE TABLE `customer_order` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT 0,
  `address_id` int(11) DEFAULT 0,
  `shipment_id` varchar(100) DEFAULT '',
  `awbno` varchar(100) DEFAULT '',
  `comment` varchar(5000) DEFAULT '',
  `apx_shipped_date` date DEFAULT current_timestamp(),
  `status_id` int(11) DEFAULT 0,
  `promo_id` int(11) NOT NULL DEFAULT 0,
  `iscod` tinyint(1) NOT NULL DEFAULT 0,
  `collectable_amount` float DEFAULT 0,
  `order_amount` float NOT NULL DEFAULT 0,
  `total_weight` float DEFAULT 0,
  `dm_length` float NOT NULL DEFAULT 0,
  `dm_breadth` float DEFAULT 0,
  `dm_height` float DEFAULT 0,
  `ewaybillno` varchar(20) NOT NULL DEFAULT '',
  `taxable_value` float DEFAULT 0,
  `sgst` float NOT NULL DEFAULT 0,
  `cgst` float NOT NULL DEFAULT 0,
  `igst` float NOT NULL DEFAULT 0,
  `added_date` datetime DEFAULT current_timestamp(),
  `modified_date` datetime DEFAULT current_timestamp(),
  `variant_id` int(11) NOT NULL DEFAULT 0,
  `deliveryCharge` int(11) NOT NULL,
  `delivery_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_order`
--

INSERT INTO `customer_order` (`order_id`, `user_id`, `address_id`, `shipment_id`, `awbno`, `comment`, `apx_shipped_date`, `status_id`, `promo_id`, `iscod`, `collectable_amount`, `order_amount`, `total_weight`, `dm_length`, `dm_breadth`, `dm_height`, `ewaybillno`, `taxable_value`, `sgst`, `cgst`, `igst`, `added_date`, `modified_date`, `variant_id`, `deliveryCharge`, `delivery_date`) VALUES
(27, 27, 9, '204651', '1347917027750', '', '2020-01-04', 4, 1, 1, 299, 249, 0.02, 0, 0, 0, '', 249, 0, 0, 0, '2020-01-04 14:11:27', '2020-01-04 14:11:27', 296, 0, '2020-11-03 09:55:00'),
(85, 12, 1, '204232', '', '', '2020-02-22', 2, 0, 1, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, '2020-02-22 17:14:51', '2020-02-22 17:14:51', 64, 0, '0000-00-00 00:00:00'),
(100, 20, 9, '262480', '1347917026073', '', '2020-01-04', 2, 1, 1, 299, 249, 0.02, 0, 0, 0, '', 249, 0, 0, 0, '2020-01-04 14:11:27', '2020-01-04 14:11:27', 65, 0, '0000-00-00 00:00:00'),
(500, 27, 9, '204651', '1347917027750', '', '2020-01-04', 4, 1, 1, 299, 249, 0.02, 0, 0, 0, '', 249, 0, 0, 0, '2020-01-04 14:11:27', '2020-01-04 14:11:27', 296, 0, '2020-11-03 09:55:00'),
(507, 27, 9, '280137', '1347917181424', '', '2020-01-04', 4, 1, 1, 299, 249, 0.02, 0, 0, 0, '', 249, 0, 0, 0, '2020-01-04 14:11:27', '2020-01-04 14:11:27', 293, 0, '2020-11-03 09:55:00'),
(5102, 27, 9, '280137', '1347917181424', '', '2020-01-04', 4, 1, 1, 299, 249, 0.02, 0, 0, 0, '', 249, 0, 0, 0, '2020-01-04 14:11:27', '2020-01-04 14:11:27', 293, 0, '2020-11-03 09:55:00');

-- --------------------------------------------------------

--
-- Table structure for table `meta`
--

CREATE TABLE `meta` (
  `id` int(11) NOT NULL,
  `meta_key` varchar(50) NOT NULL DEFAULT '',
  `meta_value` varchar(5000) NOT NULL DEFAULT '',
  `user_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `meta`
--

INSERT INTO `meta` (`id`, `meta_key`, `meta_value`, `user_id`) VALUES
(1, 'cod_charge', '60', 0),
(4, 'noti_token', 'fEiXfUq-59c:APA91bGn87l5p1_bL_czZYV6CoKjSYr2V0UD2C6AbTm7h9gMDoXo8HN0jjE0mHemGhW9QAv68Wk0DyHfeKEJUO8xlqQ3jIhaKZqBKbAmXC1F23HVfl-TMw5LjNta4Ppc7dLwo4pM8xlV', 20),
(5, 'noti_token', 'fEiXfUq-59c:APA91bGn87l5p1_bL_czZYV6CoKjSYr2V0UD2C6AbTm7h9gMDoXo8HN0jjE0mHemGhW9QAv68Wk0DyHfeKEJUO8xlqQ3jIhaKZqBKbAmXC1F23HVfl-TMw5LjNta4Ppc7dLwo4pM8xlV', 21),
(7, 'noti_token', 'eqT4kZEQRME:APA91bEbT8OzyWLkz1gWarhVoVgWzR9SxPthGaTgpMDO-FG7PuCdu0Q4DrlY0x_2VQgonDc3hxqqNU1jetJ4KSw4pbFHER3lllItN8dnDXfoHBmhHKV20BnMaXHWjey07TPOcEFdET3l', 20),
(8, 'noti_token', 'eagovKBj72w:APA91bEpiq961QkkIpyk5qc021JvzK7UPMWHfgwpAzw4p3LnrkzMH5YQaMnx8o7jS4MyTOuNwWQSL4zwImStac-OmEZ4KpQgT1TTehQskrRhkossbeMaIF-_g7DLujMIvbplr8LmkEq8', 21),
(9, 'noti_token', 'dfsO8IrU8DI:APA91bGooaKwNJGZbMqnH2g8jekuG6ZtJziwGXHq4hICEz-IFlANyz9GfAUG7Zh12oXNmVJ90FB5Apzdomr1Xv7FNwVJ6jmPdS60bRBDwT2FiQF8_RUvIaaIRPOx8oPaqTQYK_H3CvL9', 22),
(10, 'noti_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMiwiaWF0IjoxNTcwNjc0MDI3fQ.Cr-3K5_1puzN0ynwySseGE2tXKRnJZ9W0wArurXthgA', 19),
(12, 'noti_token', 'e9hICASC9l8:APA91bG2TZD6RnqZxeo9jBU_5rooUnotAQrQB4s-2G8_y6vTo7qh5ARNE2-1YEuei6Yif1fz0QW1ENL7vbl-lrFhdjqlTG5Zz1v8Wsa2_OKdqvyO6Abp9mq15cTZr-S0xj5fQlYQ6xvk', 20),
(13, 'noti_token', 'c2rS36hJw48:APA91bGIc6IOYoF4bxeObJdI8LZr3y0DqXM_5B0GKfdZAqwHStnWoDGRZ8v4J7ERTSHd_dQGq8zVB9cvPOLY3wdXWC7pwkbLK5ejy-O5ZmwPibB-iPvDd_1q37X0Y_dDtQPisj-VSRnu', 21),
(14, 'noti_token', 'cjbZ8av1SQM:APA91bFfwxIVITpF_o-x63rH9qq_jWyygXexcs0of0g1cQSb9yWYi474uv9OhjkxwZr6FJEfWcJVCqTUX7OTW_UkDQLSEmFbBpnZo3p-4UoCCU13JG-P2J0vo1A0tizQFlycT4DdS2WF', 20),
(16, 'noti_token', 'ccytJWiTS8A:APA91bE8tuXi79S7wUDbAoO8q1t9lWhpV5Q5AI_WgkxHrHkMAVotBJRbsEawNNZIb04o1O1KncPZZOBWpObAUcyT8NRUd1ooXrun0eeN7uubyFuUJRLIH0Fh0Tuhkkt532V0KEwA4arY', 20),
(19, 'noti_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMiwiaWF0IjoxNTcwNjc0MDI3fQ.Cr-3K5_1puzN0ynwySseGE2tXKRnJZ9W0wArurXthgA', 20);

-- --------------------------------------------------------

--
-- Table structure for table `mobile_brand`
--

CREATE TABLE `mobile_brand` (
  `brand_id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mobile_brand`
--

INSERT INTO `mobile_brand` (`brand_id`, `name`) VALUES
(1, 'Samsung'),
(2, 'Oppo'),
(3, 'Mi'),
(4, 'Vivo'),
(5, 'Lenovo');

-- --------------------------------------------------------

--
-- Table structure for table `mobile_models`
--

CREATE TABLE `mobile_models` (
  `model_id` int(11) NOT NULL,
  `model_name` varchar(100) DEFAULT '',
  `brand_id` int(11) DEFAULT 0,
  `type` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mobile_models`
--

INSERT INTO `mobile_models` (`model_id`, `model_name`, `brand_id`, `type`) VALUES
(1, 'Redmi 7 pro', NULL, 0),
(2, 'Redmi 6 pro', NULL, 0),
(3, 'Samsung Galaxy M30s', 1, 0),
(4, 'Oppo Redmi 5 pro', 2, 0),
(5, 'Mi a3', 3, 0),
(6, 'Mi a1', 3, 0),
(7, 'Oppo Redmi 5 pro', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(100) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `description` varchar(2000) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `added_on` datetime NOT NULL DEFAULT current_timestamp(),
  `orderId` int(11) NOT NULL DEFAULT -1,
  `itemId` int(11) NOT NULL DEFAULT -1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `description`, `is_read`, `added_on`, `orderId`, `itemId`) VALUES
(3, 20, 'Testing title', 'Notification  Description', 0, '2020-01-26 10:02:00', -1, -1),
(4, 20, 'Testing title', 'Notification  Description', 0, '2020-01-26 10:02:00', -1, -1),
(5, 20, 'Testing title', 'Notification  Description', 0, '2020-01-26 10:02:00', -1, -1),
(6, 20, 'Testing title', 'Notification  Description', 0, '2020-01-26 10:02:00', -1, -1),
(7, 20, 'Testing title', 'Notification  Description', 0, '2020-01-26 10:02:00', -1, -1),
(8, 20, 'Testing title', 'Notification  Description', 0, '2020-01-26 10:02:00', -1, -1),
(9, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:50:01', -1, -1),
(10, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:50:01', -1, -1),
(11, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:50:01', -1, -1),
(12, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:50:01', -1, -1),
(13, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:50:01', -1, -1),
(14, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:50:01', -1, -1),
(15, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:52:34', -1, -1),
(16, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:52:34', -1, -1),
(17, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:52:34', -1, -1),
(18, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:52:34', -1, -1),
(19, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:52:34', -1, -1),
(20, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:52:34', -1, -1),
(21, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:53:36', -1, -1),
(22, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:53:36', -1, -1),
(23, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:53:36', -1, -1),
(24, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:53:36', -1, -1),
(25, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:53:36', -1, -1),
(26, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:53:36', -1, -1),
(27, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:54:47', -1, -1),
(28, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:54:47', -1, -1),
(29, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:54:47', -1, -1),
(30, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:54:47', -1, -1),
(31, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:54:47', -1, -1),
(32, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 21:54:47', -1, -1),
(33, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:03:01', -1, -1),
(34, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:03:01', -1, -1),
(35, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:03:01', -1, -1),
(36, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:03:01', -1, -1),
(37, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:03:01', -1, -1),
(38, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:03:01', -1, -1),
(39, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:14:39', -1, -1),
(40, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:14:39', -1, -1),
(41, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:14:39', -1, -1),
(42, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:14:39', -1, -1),
(43, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:14:39', -1, -1),
(44, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:14:39', -1, -1),
(45, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:18:35', -1, -1),
(46, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:18:35', -1, -1),
(47, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:18:35', -1, -1),
(48, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:18:35', -1, -1),
(49, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:18:35', -1, -1),
(50, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:18:35', -1, -1),
(51, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:25:19', -1, -1),
(52, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:25:19', -1, -1),
(53, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:25:19', -1, -1),
(54, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:25:19', -1, -1),
(55, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:25:19', -1, -1),
(56, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:25:19', -1, -1),
(57, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:26:24', -1, -1),
(58, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:26:24', -1, -1),
(59, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:26:24', -1, -1),
(60, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:26:24', -1, -1),
(61, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:26:24', -1, -1),
(62, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:26:24', -1, -1),
(63, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:27:17', -1, -1),
(64, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:27:17', -1, -1),
(65, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:27:17', -1, -1),
(66, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:27:17', -1, -1),
(67, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:27:17', -1, -1),
(68, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:27:17', -1, -1),
(69, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:28:06', -1, -1),
(70, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:28:06', -1, -1),
(71, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:28:06', -1, -1),
(72, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:28:06', -1, -1),
(73, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:28:06', -1, -1),
(74, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:28:06', -1, -1),
(75, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:31:19', -1, -1),
(76, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:31:19', -1, -1),
(77, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:31:19', -1, -1),
(78, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:31:19', -1, -1),
(79, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:31:19', -1, -1),
(80, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:31:19', -1, -1),
(81, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:32:55', -1, -1),
(82, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:32:55', -1, -1),
(83, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:32:55', -1, -1),
(84, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:32:55', -1, -1),
(85, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:32:55', -1, -1),
(86, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:32:55', -1, -1),
(87, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:33:20', -1, -1),
(88, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:33:20', -1, -1),
(89, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:33:20', -1, -1),
(90, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:33:20', -1, -1),
(91, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:33:20', -1, -1),
(92, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:33:20', -1, -1),
(93, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:38:04', -1, -1),
(94, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:38:04', -1, -1),
(95, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:38:04', -1, -1),
(96, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:38:04', -1, -1),
(97, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:38:04', -1, -1),
(98, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:38:04', -1, -1),
(99, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:40:12', -1, -1),
(100, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:40:12', -1, -1),
(101, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:40:12', -1, -1),
(102, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:40:12', -1, -1),
(103, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:40:12', -1, -1),
(104, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:40:12', -1, -1),
(105, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:41:58', -1, -1),
(106, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:41:58', -1, -1),
(107, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:41:58', -1, -1),
(108, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:41:58', -1, -1),
(109, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:41:58', -1, -1),
(110, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:41:58', -1, -1),
(111, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:42:28', -1, -1),
(112, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:42:28', -1, -1),
(113, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:42:28', -1, -1),
(114, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:42:28', -1, -1),
(115, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:42:28', -1, -1),
(116, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:42:28', -1, -1),
(117, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:45:44', -1, -1),
(118, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:45:44', -1, -1),
(119, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:45:44', -1, -1),
(120, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:45:44', -1, -1),
(121, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:45:44', -1, -1),
(122, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:45:44', -1, -1),
(123, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:46:57', -1, -1),
(124, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:46:57', -1, -1),
(125, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:46:57', -1, -1),
(126, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:46:57', -1, -1),
(127, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:46:57', -1, -1),
(128, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:46:57', -1, -1),
(129, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:48:10', -1, -1),
(130, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:48:10', -1, -1),
(131, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:48:10', -1, -1),
(132, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:48:10', -1, -1),
(133, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:48:10', -1, -1),
(134, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:48:10', -1, -1),
(135, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:49:16', -1, -1),
(136, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:49:16', -1, -1),
(137, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:49:16', -1, -1),
(138, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:49:16', -1, -1),
(139, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:49:16', -1, -1),
(140, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:49:16', -1, -1),
(141, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:54:35', -1, -1),
(142, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:54:35', -1, -1),
(143, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:54:35', -1, -1),
(144, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:54:35', -1, -1),
(145, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:54:35', -1, -1),
(146, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:54:35', -1, -1),
(147, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:59:46', -1, -1),
(148, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:59:46', -1, -1),
(149, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:59:46', -1, -1),
(150, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:59:46', -1, -1),
(151, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:59:46', -1, -1),
(152, 20, 'Order Processing', 'Your order no 84 is processing by seller.', 0, '2020-02-03 22:59:46', -1, -1),
(153, 20, 'Return request is accepted for order 27.', 'Keep your parcel ready. Our currior boy will pick up it within 1-2 days.', 0, '2020-09-09 22:43:32', -1, -1),
(154, 20, 'Order Placed', 'Order (95) placed successfully.', 0, '2020-09-09 22:48:35', 95, 82),
(155, 20, 'Order Placed', 'Order (96) placed successfully.', 0, '2020-09-09 22:49:06', 96, 83),
(156, 20, 'Order Placed', 'Order (97) placed successfully.', 0, '2020-09-09 22:50:35', 97, 84),
(157, 20, 'Order Placed', 'Order (98) placed successfully.', 0, '2020-09-09 22:51:06', 98, 85),
(158, 20, 'Order Placed', 'Order (99) placed successfully.', 0, '2020-09-09 22:53:07', 99, 86);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `offer_id` int(11) NOT NULL,
  `name` varchar(300) DEFAULT '',
  `offer_per` float DEFAULT 0,
  `maximum_limit` int(11) DEFAULT 0 COMMENT 'Discount upto rs.',
  `banner` varchar(700) DEFAULT '',
  `category_id` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `item_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT 0,
  `variant_id` int(11) DEFAULT 0,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `attributes` text DEFAULT '',
  `variant` text DEFAULT '' COMMENT 'JSON of whole Product',
  `quantity` int(11) DEFAULT 0,
  `cancel_bit` tinyint(1) DEFAULT 0,
  `unit_cost` int(11) DEFAULT 0,
  `mobile_required` tinyint(1) NOT NULL DEFAULT 0,
  `mobile_id` int(11) NOT NULL DEFAULT 0,
  `promocode` int(11) DEFAULT 0,
  `added_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`item_id`, `order_id`, `variant_id`, `user_id`, `attributes`, `variant`, `quantity`, `cancel_bit`, `unit_cost`, `mobile_required`, `mobile_id`, `promocode`, `added_date`, `modified_date`) VALUES
(18, 27, 65, 20, '', '{\"item_id\":240,\"cart_quantity\":1,\"mobile_required\":1,\"mobile_id\":5,\"cart_date\":\"2020-01-04T14:11:21.000Z\",\"variant_id\":65,\"name\":\"case  cover\",\"price\":249,\"discount\":100,\"tax_id\":4,\"accept_promocode\":1,\"min_qty\":1,\"quantity\":10,\"parent\":1,\"avg_rating\":0,\"attribute\":\"\",\"thumbnail\":\"http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/100-100B8.jpg-1578143157167.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"image_required\":0,\"product_id\":15,\"promo_id\":0,\"extra_detail\":\"\",\"order_count\":8,\"admin_id\":0,\"is_cod\":1,\"added_on\":\"2020-01-04T12:44:07.000Z\",\"modified_date\":\"2020-01-04T12:44:07.000Z\",\"tax\":0,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":2,\"mprice\":249,\"mdiscount\":100}', 1, 0, 0, 1, 5, 0, '2020-01-04 14:11:27', '2020-01-04 14:11:27'),
(75, 88, 65, 20, '', '{\"item_id\":240,\"cart_quantity\":1,\"mobile_required\":1,\"mobile_id\":5,\"cart_date\":\"2020-01-04T14:11:21.000Z\",\"variant_id\":65,\"name\":\"case  cover\",\"price\":249,\"discount\":100,\"tax_id\":4,\"accept_promocode\":1,\"min_qty\":1,\"quantity\":10,\"parent\":1,\"avg_rating\":0,\"attribute\":\"\",\"thumbnail\":\"http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/100-100B8.jpg-1578143157167.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"image_required\":0,\"product_id\":15,\"promo_id\":0,\"extra_detail\":\"\",\"order_count\":8,\"admin_id\":0,\"is_cod\":1,\"added_on\":\"2020-01-04T12:44:07.000Z\",\"modified_date\":\"2020-01-04T12:44:07.000Z\",\"tax\":0,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":2,\"mprice\":249,\"mdiscount\":100,\"warranty\":null}', 1, 0, 0, 1, 5, 0, '2020-08-30 17:18:23', '2020-08-30 17:18:23'),
(76, 89, 65, 20, '', '{\"item_id\":240,\"cart_quantity\":1,\"mobile_required\":1,\"mobile_id\":5,\"cart_date\":\"2020-01-04T14:11:21.000Z\",\"variant_id\":65,\"name\":\"case  cover\",\"price\":249,\"discount\":100,\"tax_id\":4,\"accept_promocode\":1,\"min_qty\":1,\"quantity\":10,\"parent\":1,\"avg_rating\":0,\"attribute\":\"\",\"thumbnail\":\"http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/100-100B8.jpg-1578143157167.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"image_required\":0,\"product_id\":15,\"promo_id\":0,\"extra_detail\":\"\",\"order_count\":8,\"admin_id\":0,\"is_cod\":1,\"added_on\":\"2020-01-04T12:44:07.000Z\",\"modified_date\":\"2020-01-04T12:44:07.000Z\",\"tax\":0,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":2,\"mprice\":249,\"mdiscount\":100,\"warranty\":null}', 1, 0, 0, 1, 5, 0, '2020-08-30 17:19:34', '2020-08-30 17:19:34'),
(77, 90, 65, 20, '', '{\"item_id\":240,\"cart_quantity\":1,\"mobile_required\":1,\"mobile_id\":5,\"cart_date\":\"2020-01-04T14:11:21.000Z\",\"variant_id\":65,\"name\":\"case  cover\",\"price\":249,\"discount\":100,\"tax_id\":4,\"accept_promocode\":1,\"min_qty\":1,\"quantity\":10,\"parent\":1,\"avg_rating\":0,\"attribute\":\"\",\"thumbnail\":\"http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/100-100B8.jpg-1578143157167.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"image_required\":0,\"product_id\":15,\"promo_id\":0,\"extra_detail\":\"\",\"order_count\":8,\"admin_id\":0,\"is_cod\":1,\"added_on\":\"2020-01-04T12:44:07.000Z\",\"modified_date\":\"2020-01-04T12:44:07.000Z\",\"tax\":0,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":2,\"mprice\":249,\"mdiscount\":100,\"warranty\":null}', 1, 0, 0, 1, 5, 0, '2020-08-30 17:24:20', '2020-08-30 17:24:20'),
(78, 91, 65, 20, '', '{\"item_id\":240,\"cart_quantity\":1,\"mobile_required\":1,\"mobile_id\":5,\"cart_date\":\"2020-01-04T14:11:21.000Z\",\"variant_id\":65,\"name\":\"case  cover\",\"price\":249,\"discount\":100,\"tax_id\":4,\"accept_promocode\":1,\"min_qty\":1,\"quantity\":10,\"parent\":1,\"avg_rating\":0,\"attribute\":\"\",\"thumbnail\":\"http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/100-100B8.jpg-1578143157167.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"image_required\":0,\"product_id\":15,\"promo_id\":0,\"extra_detail\":\"\",\"order_count\":8,\"admin_id\":0,\"is_cod\":1,\"added_on\":\"2020-01-04T12:44:07.000Z\",\"modified_date\":\"2020-01-04T12:44:07.000Z\",\"tax\":0,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":2,\"mprice\":249,\"mdiscount\":100,\"warranty\":null}', 1, 0, 0, 1, 5, 0, '2020-08-30 17:25:08', '2020-08-30 17:25:08'),
(79, 92, 65, 20, '', '{\"item_id\":240,\"cart_quantity\":1,\"mobile_required\":1,\"mobile_id\":5,\"cart_date\":\"2020-01-04T14:11:21.000Z\",\"variant_id\":65,\"name\":\"case  cover\",\"price\":249,\"discount\":100,\"tax_id\":4,\"accept_promocode\":1,\"min_qty\":1,\"quantity\":10,\"parent\":1,\"avg_rating\":0,\"attribute\":\"\",\"thumbnail\":\"http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/100-100B8.jpg-1578143157167.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"image_required\":0,\"product_id\":15,\"promo_id\":0,\"extra_detail\":\"\",\"order_count\":8,\"admin_id\":0,\"is_cod\":1,\"added_on\":\"2020-01-04T12:44:07.000Z\",\"modified_date\":\"2020-01-04T12:44:07.000Z\",\"tax\":0,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":2,\"mprice\":249,\"mdiscount\":100,\"warranty\":null}', 1, 0, 0, 1, 5, 0, '2020-09-09 22:37:57', '2020-09-09 22:37:57'),
(80, 93, 65, 20, '', '{\"item_id\":240,\"cart_quantity\":1,\"mobile_required\":1,\"mobile_id\":5,\"cart_date\":\"2020-01-04T14:11:21.000Z\",\"variant_id\":65,\"name\":\"case  cover\",\"price\":249,\"discount\":100,\"tax_id\":4,\"accept_promocode\":1,\"min_qty\":1,\"quantity\":10,\"parent\":1,\"avg_rating\":0,\"attribute\":\"\",\"thumbnail\":\"http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/100-100B8.jpg-1578143157167.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"image_required\":0,\"product_id\":15,\"promo_id\":0,\"extra_detail\":\"\",\"order_count\":8,\"admin_id\":0,\"is_cod\":1,\"added_on\":\"2020-01-04T12:44:07.000Z\",\"modified_date\":\"2020-01-04T12:44:07.000Z\",\"tax\":0,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":2,\"mprice\":249,\"mdiscount\":100,\"warranty\":null}', 1, 0, 0, 1, 5, 0, '2020-09-09 22:41:09', '2020-09-09 22:41:09'),
(81, 94, 65, 20, '', '{\"item_id\":240,\"cart_quantity\":1,\"mobile_required\":1,\"mobile_id\":5,\"cart_date\":\"2020-01-04T14:11:21.000Z\",\"variant_id\":65,\"name\":\"case  cover\",\"price\":249,\"discount\":100,\"tax_id\":4,\"accept_promocode\":1,\"min_qty\":1,\"quantity\":10,\"parent\":1,\"avg_rating\":0,\"attribute\":\"\",\"thumbnail\":\"http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/100-100B8.jpg-1578143157167.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"image_required\":0,\"product_id\":15,\"promo_id\":0,\"extra_detail\":\"\",\"order_count\":8,\"admin_id\":0,\"is_cod\":1,\"added_on\":\"2020-01-04T12:44:07.000Z\",\"modified_date\":\"2020-01-04T12:44:07.000Z\",\"tax\":0,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":2,\"mprice\":249,\"mdiscount\":100,\"warranty\":null}', 1, 0, 0, 1, 5, 0, '2020-09-09 22:43:30', '2020-09-09 22:43:30'),
(82, 95, 65, 20, '', '{\"item_id\":240,\"cart_quantity\":1,\"mobile_required\":1,\"mobile_id\":5,\"cart_date\":\"2020-01-04T14:11:21.000Z\",\"variant_id\":65,\"name\":\"case  cover\",\"price\":249,\"discount\":100,\"tax_id\":4,\"accept_promocode\":1,\"min_qty\":1,\"quantity\":10,\"parent\":1,\"avg_rating\":0,\"attribute\":\"\",\"thumbnail\":\"http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/100-100B8.jpg-1578143157167.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"image_required\":0,\"product_id\":15,\"promo_id\":0,\"extra_detail\":\"\",\"order_count\":8,\"admin_id\":0,\"is_cod\":1,\"added_on\":\"2020-01-04T12:44:07.000Z\",\"modified_date\":\"2020-01-04T12:44:07.000Z\",\"tax\":0,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":2,\"mprice\":249,\"mdiscount\":100}', 1, 0, 0, 1, 5, 0, '2020-09-09 22:48:35', '2020-09-09 22:48:35'),
(83, 96, 65, 20, '', '{\"item_id\":240,\"cart_quantity\":1,\"mobile_required\":1,\"mobile_id\":5,\"cart_date\":\"2020-01-04T14:11:21.000Z\",\"variant_id\":65,\"name\":\"case  cover\",\"price\":249,\"discount\":100,\"tax_id\":4,\"accept_promocode\":1,\"min_qty\":1,\"quantity\":10,\"parent\":1,\"avg_rating\":0,\"attribute\":\"\",\"thumbnail\":\"http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/100-100B8.jpg-1578143157167.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"image_required\":0,\"product_id\":15,\"promo_id\":0,\"extra_detail\":\"\",\"order_count\":8,\"admin_id\":0,\"is_cod\":1,\"added_on\":\"2020-01-04T12:44:07.000Z\",\"modified_date\":\"2020-01-04T12:44:07.000Z\",\"tax\":0,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":2,\"mprice\":249,\"mdiscount\":100}', 1, 0, 0, 1, 5, 0, '2020-09-09 22:49:06', '2020-09-09 22:49:06'),
(84, 97, 65, 20, '', '{\"item_id\":240,\"cart_quantity\":1,\"mobile_required\":1,\"mobile_id\":5,\"cart_date\":\"2020-01-04T14:11:21.000Z\",\"variant_id\":65,\"name\":\"case  cover\",\"price\":249,\"discount\":100,\"tax_id\":4,\"accept_promocode\":1,\"min_qty\":1,\"quantity\":10,\"parent\":1,\"avg_rating\":0,\"attribute\":\"\",\"thumbnail\":\"http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/100-100B8.jpg-1578143157167.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"image_required\":0,\"product_id\":15,\"promo_id\":0,\"extra_detail\":\"\",\"order_count\":8,\"admin_id\":0,\"is_cod\":1,\"added_on\":\"2020-01-04T12:44:07.000Z\",\"modified_date\":\"2020-01-04T12:44:07.000Z\",\"tax\":0,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":2,\"mprice\":249,\"mdiscount\":100}', 1, 0, 0, 1, 5, 0, '2020-09-09 22:50:35', '2020-09-09 22:50:35'),
(85, 98, 65, 20, '', '{\"item_id\":240,\"cart_quantity\":1,\"mobile_required\":1,\"mobile_id\":5,\"cart_date\":\"2020-01-04T14:11:21.000Z\",\"variant_id\":65,\"name\":\"case  cover\",\"price\":249,\"discount\":100,\"tax_id\":4,\"accept_promocode\":1,\"min_qty\":1,\"quantity\":10,\"parent\":1,\"avg_rating\":0,\"attribute\":\"\",\"thumbnail\":\"http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/100-100B8.jpg-1578143157167.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"image_required\":0,\"product_id\":15,\"promo_id\":0,\"extra_detail\":\"\",\"order_count\":8,\"admin_id\":0,\"is_cod\":1,\"added_on\":\"2020-01-04T12:44:07.000Z\",\"modified_date\":\"2020-01-04T12:44:07.000Z\",\"tax\":0,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":2,\"mprice\":249,\"mdiscount\":100}', 1, 0, 0, 1, 5, 0, '2020-09-09 22:51:06', '2020-09-09 22:51:06'),
(86, 99, 65, 20, '', '{\"item_id\":240,\"cart_quantity\":1,\"mobile_required\":1,\"mobile_id\":5,\"cart_date\":\"2020-01-04T14:11:21.000Z\",\"variant_id\":65,\"name\":\"case  cover\",\"price\":249,\"discount\":100,\"tax_id\":4,\"accept_promocode\":1,\"min_qty\":1,\"quantity\":10,\"parent\":1,\"avg_rating\":0,\"attribute\":\"\",\"thumbnail\":\"http://ec2-13-235-241-35.ap-south-1.compute.amazonaws.com:3000/thumbnail/100-100B8.jpg-1578143157167.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"image_required\":0,\"product_id\":15,\"promo_id\":0,\"extra_detail\":\"\",\"order_count\":8,\"admin_id\":0,\"is_cod\":1,\"added_on\":\"2020-01-04T12:44:07.000Z\",\"modified_date\":\"2020-01-04T12:44:07.000Z\",\"tax\":0,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":2,\"mprice\":249,\"mdiscount\":100}', 1, 0, 0, 1, 5, 0, '2020-09-09 22:53:07', '2020-09-09 22:53:07');

-- --------------------------------------------------------

--
-- Table structure for table `paytm_details`
--

CREATE TABLE `paytm_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL DEFAULT 0,
  `paytm_order_id` varchar(2000) DEFAULT '',
  `variant_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `paytm_response` text NOT NULL DEFAULT '',
  `is_completed` tinyint(1) NOT NULL DEFAULT 0,
  `mobile_required` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paytm_details`
--

INSERT INTO `paytm_details` (`id`, `order_id`, `paytm_order_id`, `variant_id`, `price`, `user_id`, `paytm_response`, `is_completed`, `mobile_required`) VALUES
(1, 0, '0', 13, 400, 12, '', 0, 0),
(2, 0, '0', 13, 400, 12, '', 0, 0),
(3, 0, '0', 13, 400, 12, '', 0, 0),
(4, 0, '0', 13, 400, 12, '', 0, 0),
(5, 0, '0', 13, 400, 12, '', 0, 0),
(6, 0, '0', 60, 500, 19, '', 0, 0),
(7, 0, '0', 60, 500, 19, '', 0, 0),
(8, 0, '0', 60, 500, 19, '', 0, 0),
(9, 0, '0', 60, 500, 19, '', 0, 0),
(10, 0, '0', 60, 500, 19, '', 0, 0),
(11, 0, '0', 60, 500, 19, '', 0, 0),
(12, 0, '0', 60, 500, 19, '', 0, 0),
(13, 0, '0', 60, 500, 19, '', 0, 0),
(14, 0, '0', 60, 500, 19, '', 0, 0),
(15, 0, '0', 60, 500, 19, '', 0, 0),
(16, 0, '0', 60, 500, 19, '', 0, 0),
(17, 0, '0', 60, 500, 19, '', 0, 0),
(18, 0, '0', 60, 500, 19, '', 0, 0),
(19, 0, '0', 60, 500, 19, '', 0, 0),
(20, 0, '0', 60, 500, 19, '', 0, 0),
(21, 0, '0', 60, 500, 19, '', 0, 0),
(22, 0, '0', 60, 500, 19, '', 0, 0),
(23, 0, '0', 60, 500, 19, '', 0, 0),
(24, 0, '0', 60, 500, 19, '', 0, 0),
(25, 0, '0', 60, 500, 19, '', 0, 0),
(26, 0, '0', 60, 500, 19, '', 0, 0),
(27, 0, '0', 60, 500, 19, '', 0, 0),
(28, 0, '0', 60, 500, 19, '', 0, 0),
(29, 0, '0', 60, 500, 19, '', 0, 0),
(30, 0, '0', 60, 500, 19, '', 0, 0),
(31, 0, '0', 60, 500, 19, '', 0, 0),
(32, 0, '0', 60, 500, 19, '', 0, 0),
(33, 0, '0', 60, 500, 19, '', 0, 0),
(34, 0, '0', 60, 500, 19, '', 0, 0),
(35, 0, '0', 60, 500, 19, '', 0, 0),
(36, 0, '0', 60, 500, 19, '', 0, 0),
(37, 0, '0', 60, 500, 19, '', 0, 0),
(38, 0, '0', 60, 500, 19, '', 0, 0),
(39, 0, '0', 60, 500, 19, '', 0, 0),
(40, 0, '0', 60, 500, 19, '', 0, 0),
(41, 0, '0', 60, 500, 19, '', 0, 0),
(42, 0, '0', 60, 500, 19, '', 0, 0),
(43, 0, '0', 60, 500, 19, '', 0, 0),
(44, 0, '0', 60, 500, 19, '', 0, 0),
(45, 0, '20191230111212800110168112201145832', 60, 500, 19, '{\"STATUS\":\"TXN_SUCCESS\",\"BANKNAME\":\"WALLET\",\"ORDERID\":\"45\",\"TXNAMOUNT\":\"500.00\",\"TXNDATE\":\"2019-12-30 22:33:03.0\",\"MID\":\"EjsRfg05989973136203\",\"TXNID\":\"20191230111212800110168112201145832\",\"RESPCODE\":\"01\",\"PAYMENTMODE\":\"PPI\",\"BANKTXNID\":\"29733954\",\"CURRENCY\":\"INR\",\"GATEWAYNAME\":\"WALLET\",\"RESPMSG\":\"Txn Success\"}', 1, 0),
(46, 0, '0', 60, 500, 19, '', 0, 0),
(47, 0, '0', 60, 500, 19, '', 0, 0),
(48, 0, '0', 60, 500, 19, '', 0, 0),
(49, 0, '0', 61, 400, 19, '', 0, 0),
(50, 0, '0', 61, 400, 19, '', 0, 0),
(51, 0, '', 60, 500, 19, '', 0, 1),
(52, 0, '', 60, 500, 19, '', 0, 1),
(53, 0, '', 60, 500, 19, '', 0, 1),
(54, 0, '20200101111212800110168814001162179', 60, 500, 19, '{\"BANKNAME\":\"WALLET\",\"BANKTXNID\":\"30431950\",\"CURRENCY\":\"INR\",\"GATEWAYNAME\":\"WALLET\",\"MID\":\"EjsRfg05989973136203\",\"ORDERID\":\"54\",\"PAYMENTMODE\":\"PPI\",\"RESPCODE\":\"01\",\"RESPMSG\":\"Txn Success\",\"STATUS\":\"TXN_SUCCESS\",\"TXNAMOUNT\":\"500.00\",\"TXNDATE\":\"2020-01-01 20:01:01.0\",\"TXNID\":\"20200101111212800110168814001162179\"}', 1, 1),
(55, 0, '20200101111212800110168805201155762', 60, 500, 19, '{\"BANKNAME\":\"WALLET\",\"BANKTXNID\":\"30436111\",\"CURRENCY\":\"INR\",\"GATEWAYNAME\":\"WALLET\",\"MID\":\"EjsRfg05989973136203\",\"ORDERID\":\"55\",\"PAYMENTMODE\":\"PPI\",\"RESPCODE\":\"01\",\"RESPMSG\":\"Txn Success\",\"STATUS\":\"TXN_SUCCESS\",\"TXNAMOUNT\":\"500.00\",\"TXNDATE\":\"2020-01-01 20:16:59.0\",\"TXNID\":\"20200101111212800110168805201155762\"}', 1, 1),
(56, 0, '20200101111212800110168798701154973', 60, 500, 19, '{\"BANKNAME\":\"WALLET\",\"BANKTXNID\":\"30436662\",\"CURRENCY\":\"INR\",\"GATEWAYNAME\":\"WALLET\",\"MID\":\"EjsRfg05989973136203\",\"ORDERID\":\"56\",\"PAYMENTMODE\":\"PPI\",\"RESPCODE\":\"01\",\"RESPMSG\":\"Txn Success\",\"STATUS\":\"TXN_SUCCESS\",\"TXNAMOUNT\":\"500.00\",\"TXNDATE\":\"2020-01-01 20:19:24.0\",\"TXNID\":\"20200101111212800110168798701154973\"}', 1, 1),
(57, 0, '20200101111212800110168309801228085', 60, 500, 19, '{\"BANKNAME\":\"WALLET\",\"BANKTXNID\":\"30438022\",\"CURRENCY\":\"INR\",\"GATEWAYNAME\":\"WALLET\",\"MID\":\"EjsRfg05989973136203\",\"ORDERID\":\"57\",\"PAYMENTMODE\":\"PPI\",\"RESPCODE\":\"01\",\"RESPMSG\":\"Txn Success\",\"STATUS\":\"TXN_SUCCESS\",\"TXNAMOUNT\":\"500.00\",\"TXNDATE\":\"2020-01-01 20:25:22.0\",\"TXNID\":\"20200101111212800110168309801228085\"}', 1, 1),
(58, 0, '', 60, 500, 20, '', 0, 1),
(59, 0, '20200103111212800110168762401149110', 61, 400, 20, '{\"BANKNAME\":\"WALLET\",\"BANKTXNID\":\"31164979\",\"CURRENCY\":\"INR\",\"GATEWAYNAME\":\"WALLET\",\"MID\":\"EjsRfg05989973136203\",\"ORDERID\":\"59\",\"PAYMENTMODE\":\"PPI\",\"RESPCODE\":\"01\",\"RESPMSG\":\"Txn Success\",\"STATUS\":\"TXN_SUCCESS\",\"TXNAMOUNT\":\"400.00\",\"TXNDATE\":\"2020-01-03 19:24:14.0\",\"TXNID\":\"20200103111212800110168762401149110\"}', 1, 1),
(60, 0, '', 60, 500, 12, '', 0, 1),
(61, 0, '', 60, 500, 12, '', 0, 1),
(62, 0, '', 60, 500, 12, '', 0, 1),
(63, 0, '', 60, 500, 20, '', 0, 1),
(64, 0, '', 60, 500, 20, '', 0, 1),
(65, 0, '', 60, 500, 20, '', 0, 1),
(66, 0, '', 60, 2000, 12, '', 0, 1),
(67, 0, '20200104111212800110168476701150269', 60, 2000, 12, '{\"BANKNAME\":\"WALLET\",\"BANKTXNID\":\"31405270\",\"CURRENCY\":\"INR\",\"GATEWAYNAME\":\"WALLET\",\"MID\":\"EjsRfg05989973136203\",\"ORDERID\":\"67\",\"PAYMENTMODE\":\"PPI\",\"RESPCODE\":\"01\",\"RESPMSG\":\"Txn Success\",\"STATUS\":\"TXN_SUCCESS\",\"TXNAMOUNT\":\"2000.00\",\"TXNDATE\":\"2020-01-04 11:13:28.0\",\"TXNID\":\"20200104111212800110168476701150269\"}', 1, 1),
(68, 0, '20200104111212800110168465101165386', 60, 1000, 20, '{\"BANKNAME\":\"WALLET\",\"BANKTXNID\":\"31485220\",\"CURRENCY\":\"INR\",\"GATEWAYNAME\":\"WALLET\",\"MID\":\"EjsRfg05989973136203\",\"ORDERID\":\"68\",\"PAYMENTMODE\":\"PPI\",\"RESPCODE\":\"01\",\"RESPMSG\":\"Txn Success\",\"STATUS\":\"TXN_SUCCESS\",\"TXNAMOUNT\":\"1000.00\",\"TXNDATE\":\"2020-01-04 16:10:19.0\",\"TXNID\":\"20200104111212800110168465101165386\"}', 1, 1),
(69, 0, '', 60, 1000, 20, '', 0, 1),
(70, 0, '', 63, 0, 20, '', 0, 1),
(71, 0, '', 63, 0, 20, '', 0, 1),
(72, 0, '20200104111212800110168215301138993', 61, 1600, 20, '{\"BANKNAME\":\"WALLET\",\"BANKTXNID\":\"31502300\",\"CURRENCY\":\"INR\",\"GATEWAYNAME\":\"WALLET\",\"MID\":\"EjsRfg05989973136203\",\"ORDERID\":\"72\",\"PAYMENTMODE\":\"PPI\",\"RESPCODE\":\"01\",\"RESPMSG\":\"Txn Success\",\"STATUS\":\"TXN_SUCCESS\",\"TXNAMOUNT\":\"1600.00\",\"TXNDATE\":\"2020-01-04 17:13:46.0\",\"TXNID\":\"20200104111212800110168215301138993\"}', 1, 1),
(73, 0, '', 61, 1600, 20, '', 0, 1),
(74, 0, '20200104111212800110168199101162125', 65, 747, 20, '{\"BANKNAME\":\"WALLET\",\"BANKTXNID\":\"31524757\",\"CURRENCY\":\"INR\",\"GATEWAYNAME\":\"WALLET\",\"MID\":\"EjsRfg05989973136203\",\"ORDERID\":\"74\",\"PAYMENTMODE\":\"PPI\",\"RESPCODE\":\"01\",\"RESPMSG\":\"Txn Success\",\"STATUS\":\"TXN_SUCCESS\",\"TXNAMOUNT\":\"747.00\",\"TXNDATE\":\"2020-01-04 18:39:19.0\",\"TXNID\":\"20200104111212800110168199101162125\"}', 1, 1),
(75, 0, '', 65, 747, 20, '', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `description` text DEFAULT '',
  `is_display` tinyint(1) DEFAULT 0,
  `total_weight` float NOT NULL DEFAULT 0,
  `dimention_length` float NOT NULL DEFAULT 0,
  `dimention_breadth` float NOT NULL DEFAULT 0,
  `dimention_height` float NOT NULL DEFAULT 0,
  `hsncode` int(11) NOT NULL DEFAULT 0,
  `category_id` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `description`, `is_display`, `total_weight`, `dimention_length`, `dimention_breadth`, `dimention_height`, `hsncode`, `category_id`) VALUES
(15, 'plastic hard material cover', 1, 0, 0, 0, 0, 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `product_specification`
--

CREATE TABLE `product_specification` (
  `variant_id` int(11) NOT NULL,
  `specification_key` varchar(2000) NOT NULL,
  `specification_value` varchar(2000) NOT NULL DEFAULT '',
  `srno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_specification`
--

INSERT INTO `product_specification` (`variant_id`, `specification_key`, `specification_value`, `srno`) VALUES
(71, 'Compatibility Type', 'Cover', 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_variant`
--

CREATE TABLE `product_variant` (
  `variant_id` int(11) NOT NULL,
  `name` text DEFAULT '',
  `price` int(11) DEFAULT 0,
  `discount` float DEFAULT 0,
  `tax_id` int(11) DEFAULT 0,
  `accept_promocode` tinyint(1) DEFAULT 0,
  `min_qty` int(11) DEFAULT 0,
  `quantity` int(11) DEFAULT 0,
  `parent` tinyint(1) DEFAULT 0,
  `avg_rating` float DEFAULT 0,
  `attribute` text DEFAULT '' COMMENT 'JSON format attributes',
  `thumbnail` text DEFAULT '' COMMENT 'JSON Array',
  `list_image` text DEFAULT '' COMMENT 'JSON Array',
  `view_image` text DEFAULT '' COMMENT 'JSON Array',
  `main_image` text DEFAULT '' COMMENT 'JSON Array',
  `image_required` tinyint(1) NOT NULL DEFAULT 0,
  `product_id` int(11) NOT NULL DEFAULT 0,
  `promo_id` int(11) NOT NULL DEFAULT 0,
  `extra_detail` text NOT NULL DEFAULT '',
  `order_count` int(11) NOT NULL DEFAULT 0,
  `admin_id` int(11) DEFAULT 0,
  `is_cod` tinyint(1) NOT NULL DEFAULT 1,
  `warranty` int(11) NOT NULL DEFAULT 0,
  `added_on` datetime DEFAULT current_timestamp(),
  `modified_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_variant`
--

INSERT INTO `product_variant` (`variant_id`, `name`, `price`, `discount`, `tax_id`, `accept_promocode`, `min_qty`, `quantity`, `parent`, `avg_rating`, `attribute`, `thumbnail`, `list_image`, `view_image`, `main_image`, `image_required`, `product_id`, `promo_id`, `extra_detail`, `order_count`, `admin_id`, `is_cod`, `warranty`, `added_on`, `modified_date`) VALUES
(64, 'case  cover', 249, 100, 4, 1, 1, 10, 1, 0, '', '[\"100-100bitspair.JPG-1598681220720.JPG\",\"100-100B2.jpg-1578143134261.jpg\",\"100-100B3.jpg-1578143140963.jpg\"]', '[\"300-300bitspair.JPG-1598681220720.JPG\",\"300-300B2.jpg-1578143134261.jpg\",\"300-300B3.jpg-1578143140963.jpg\"]', '[\"500-500bitspair.JPG-1598681220720.JPG\",\"500-500B2.jpg-1578143134261.jpg\",\"500-500B3.jpg-1578143140963.jpg\"]', '[\"bitspair.JPG-1598681220720.JPG\",\"B2.jpg-1578143134261.jpg\",\"B3.jpg-1578143140963.jpg\"]', 0, 15, 0, '', 0, 0, 1, 100, '2020-01-04 12:41:28', '2020-01-04 12:41:28'),
(65, 'case  cover', 249, 100, 4, 1, 1, 10, 1, 0, '', '[\"100-100B8.jpg-1578143157167.jpg\"]', '[\"300-300B8.jpg-1578143157167.jpg\"]', '[\"500-500B8.jpg-1578143157167.jpg\"]', '[\"B8.jpg-1578143157167.jpg\"]', 0, 15, 0, '', 9, 0, 1, 0, '2020-01-04 12:44:07', '2020-01-04 12:44:07'),
(66, 'Cover with Image 1', 700, 10, 4, 1, 10, 120, 1, 0, '', '[\"100-100adoration-of-the-kings.gif-1597207993583.gif\",\"100-1002d29d0b31060c110210933fb3dd17a641f.png-1597207913810.png\",\"100-1009e4fa56f9d82b9ba1badd1287f10bb8d.png-1597207929436.png\"]', '[\"300-300adoration-of-the-kings.gif-1597207993583.gif\",\"300-3002d29d0b31060c110210933fb3dd17a641f.png-1597207913810.png\",\"300-3009e4fa56f9d82b9ba1badd1287f10bb8d.png-1597207929436.png\"]', '[\"500-500adoration-of-the-kings.gif-1597207993583.gif\",\"500-5002d29d0b31060c110210933fb3dd17a641f.png-1597207913810.png\",\"500-5009e4fa56f9d82b9ba1badd1287f10bb8d.png-1597207929436.png\"]', '[\"adoration-of-the-kings.gif-1597207993583.gif\",\"2d29d0b31060c110210933fb3dd17a641f.png-1597207913810.png\",\"9e4fa56f9d82b9ba1badd1287f10bb8d.png-1597207929436.png\"]', 0, 15, 0, '', 0, 0, 1, 0, '2020-01-26 15:51:40', '2020-01-26 15:51:40'),
(68, 'dsfdsfvg', 20, 1, 4, 1, 0, 0, 1, 0, '', '[]', '[]', '[]', '[]', 0, 15, 0, '', 0, 0, 1, 0, '2020-02-08 11:41:20', '2020-02-08 11:41:20'),
(69, 'saczc', 20, 10, 4, 1, 42, 4142, 1, 0, '', '[]', '[]', '[]', '[]', 0, 15, 0, '', 0, 0, 1, 0, '2020-02-18 21:02:12', '2020-02-18 21:02:12'),
(70, 'Cover with Image 1', 20, 11, 1, 1, 2, 32, 1, 0, '', '[]', '[]', '[]', '[]', 0, 15, 0, '', 0, 0, 1, 3, '2020-02-23 11:57:56', '2020-02-23 11:57:56');

-- --------------------------------------------------------

--
-- Table structure for table `promocode`
--

CREATE TABLE `promocode` (
  `id` int(11) NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `description` varchar(800) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `type` int(11) NOT NULL DEFAULT 0 COMMENT '1. For Gobal 2. For products',
  `discount` float NOT NULL DEFAULT 0,
  `min_limit` int(11) NOT NULL DEFAULT 0,
  `max_discount` int(11) NOT NULL DEFAULT 0,
  `discount_type` int(11) NOT NULL DEFAULT 0 COMMENT '1 - Rs. , 2.- Percentage',
  `max_attempt` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `promocode`
--

INSERT INTO `promocode` (`id`, `code`, `description`, `type`, `discount`, `min_limit`, `max_discount`, `discount_type`, `max_attempt`) VALUES
(1, 'MS50', 'Flat 50% off on purchase of covers where total amount is more than 500 Rs.', 2, 50, 100, 150, 2, 2),
(2, 'NEW50', 'Flat 50% off on purchase of any product for new users only.', 1, 0, 50, 200, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `refund`
--

CREATE TABLE `refund` (
  `id` int(11) NOT NULL,
  `paytm_id` text NOT NULL DEFAULT '',
  `amount` int(11) NOT NULL DEFAULT 0,
  `response` text NOT NULL DEFAULT '',
  `order_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `refund`
--

INSERT INTO `refund` (`id`, `paytm_id`, `amount`, `response`, `order_id`) VALUES
(1, '20191230111212800110168112201145832', 500, '{\"STATUS\":\"TXN_SUCCESS\",\"BANKNAME\":\"WALLET\",\"ORDERID\":\"45\",\"TXNAMOUNT\":\"500.00\",\"TXNDATE\":\"2019-12-30 22:33:03.0\",\"MID\":\"EjsRfg05989973136203\",\"TXNID\":\"20191230111212800110168112201145832\",\"RESPCODE\":\"01\",\"PAYMENTMODE\":\"PPI\",\"BANKTXNID\":\"29733954\",\"CURRENCY\":\"INR\",\"GATEWAYNAME\":\"WALLET\",\"RESPMSG\":\"Txn Success\"}', 45);

-- --------------------------------------------------------

--
-- Table structure for table `return_order_detail`
--

CREATE TABLE `return_order_detail` (
  `item_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT 0,
  `variant_id` int(11) DEFAULT 0,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `attributes` text DEFAULT '',
  `variant` text DEFAULT '' COMMENT 'JSON of whole Product',
  `quantity` int(11) DEFAULT 0,
  `cancel_bit` tinyint(1) DEFAULT 0,
  `unit_cost` int(11) DEFAULT 0,
  `mobile_required` tinyint(1) NOT NULL DEFAULT 0,
  `mobile_id` int(11) NOT NULL DEFAULT 0,
  `promocode` int(11) DEFAULT 0,
  `added_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `return_order_detail`
--

INSERT INTO `return_order_detail` (`item_id`, `order_id`, `variant_id`, `user_id`, `attributes`, `variant`, `quantity`, `cancel_bit`, `unit_cost`, `mobile_required`, `mobile_id`, `promocode`, `added_date`, `modified_date`, `status_id`) VALUES
(17, 26, 2, 12, NULL, '{\"item_id\":41,\"cart_quantity\":20,\"mobile_required\":1,\"mobile_id\":2,\"cart_date\":\"2019-10-23T03:06:40.000Z\",\"variant_id\":2,\"name\":\"Soft leather print back cover good quality Camera protection layer\",\"price\":120,\"discount\":20,\"tax_id\":1,\"accept_promocode\":1,\"min_qty\":10,\"quantity\":0,\"parent\":1,\"avg_rating\":4.2,\"attribute\":null,\"thumbnail\":\"http://52.66.237.4:3000/thumbnail/product1_main.jpg\",\"list_image\":\"\",\"view_image\":\"\",\"main_image\":\"\",\"product_id\":1,\"promo_id\":1,\"extra_detail\":\"Further Description which admin want to display to the user\",\"order_count\":170,\"admin_id\":1,\"added_on\":\"2019-09-18T15:13:50.000Z\",\"modified_date\":\"2019-09-18T15:13:50.000Z\",\"tax\":2.5,\"total_weight\":0,\"dimention_length\":0,\"dimention_breadth\":0,\"dimention_height\":0,\"hsncode\":0,\"mquantity\":10000,\"mprice\":200,\"mdiscount\":0}', 20, NULL, NULL, 1, 2, NULL, '2019-10-23 08:37:38', '2019-10-25 22:03:43', 6);

-- --------------------------------------------------------

--
-- Table structure for table `return_reason`
--

CREATE TABLE `return_reason` (
  `id` int(11) NOT NULL,
  `reason` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `return_reason`
--

INSERT INTO `return_reason` (`id`, `reason`) VALUES
(0, 'No Reason');

-- --------------------------------------------------------

--
-- Table structure for table `return_request`
--

CREATE TABLE `return_request` (
  `order_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT '0- Return 1 - Replace',
  `reason` int(11) NOT NULL,
  `image` int(11) NOT NULL,
  `is_accepted` tinyint(1) NOT NULL,
  `is_paid` tinyint(1) NOT NULL,
  `added_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `return_request`
--

INSERT INTO `return_request` (`order_id`, `item_id`, `type`, `reason`, `image`, `is_accepted`, `is_paid`, `added_date`, `modified_date`) VALUES
(27, 18, 1, 0, 2147483647, 1, 1, '2019-12-27 09:06:38', '2020-09-09 22:53:07');

-- --------------------------------------------------------

--
-- Table structure for table `shipping`
--

CREATE TABLE `shipping` (
  `id` int(11) NOT NULL,
  `max_amount` float DEFAULT 0,
  `charge` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `specification`
--

CREATE TABLE `specification` (
  `specification_id` int(11) NOT NULL,
  `specification_key` varchar(80) DEFAULT '',
  `specification_value` varchar(300) DEFAULT NULL,
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
(8, 'Model Number', 'Aspgkk_Red_Mei_7_Blue1', '2019-10-05 21:02:52'),
(9, 'TestParth Specification ', 'Parth', '2020-01-04 10:54:33');

-- --------------------------------------------------------

--
-- Table structure for table `specification_type`
--

CREATE TABLE `specification_type` (
  `id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `status` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `status`) VALUES
(0, 'Order Placed'),
(1, 'Order Confirmed'),
(2, 'Processing Factories'),
(3, 'Shipped'),
(4, 'Delivered'),
(6, 'Returned'),
(7, 'Cancelled');

-- --------------------------------------------------------

--
-- Table structure for table `support`
--

CREATE TABLE `support` (
  `id` int(11) NOT NULL,
  `mobiles` text DEFAULT '[]',
  `whatsapp_link` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tax`
--

CREATE TABLE `tax` (
  `tax_id` int(11) NOT NULL,
  `tax` float NOT NULL DEFAULT 0,
  `name` varchar(20) COLLATE utf8mb4_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `tax`
--

INSERT INTO `tax` (`tax_id`, `tax`, `name`) VALUES
(1, 5, '5% Tax'),
(2, 18, '18% Tax'),
(3, 12, '18% Tax'),
(4, 0, 'No Tax'),
(5, 28, '28% Tax');

-- --------------------------------------------------------

--
-- Table structure for table `track_detail`
--

CREATE TABLE `track_detail` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL DEFAULT 0,
  `status_id` int(11) NOT NULL DEFAULT 0,
  `added_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `track_detail`
--

INSERT INTO `track_detail` (`id`, `item_id`, `status_id`, `added_date`) VALUES
(3, 16, 1, '0000-00-00 00:00:00'),
(4, 16, 2, '0000-00-00 00:00:00'),
(5, 28, 7, '2019-12-25 18:09:49'),
(6, 48, 7, '2019-12-26 16:19:20'),
(7, 65, 7, '2020-01-02 17:55:20'),
(8, 62, 7, '2020-01-02 17:55:38'),
(9, 59, 7, '2020-01-02 18:16:14'),
(10, 63, 7, '2020-01-02 18:17:23'),
(11, 67, 7, '2020-01-03 10:56:28'),
(12, 78, 1, '2020-01-04 11:46:43'),
(13, 77, 1, '2020-01-04 11:48:17'),
(14, 79, 1, '2020-01-04 13:11:01'),
(15, 79, 5, '2020-01-04 13:12:08'),
(16, 84, 7, '2020-01-04 14:12:32'),
(17, 84, 1, '2020-01-25 08:00:43'),
(18, 84, 1, '2020-01-25 08:03:09'),
(19, 84, 1, '2020-01-25 08:05:46'),
(20, 84, 1, '2020-01-25 08:08:16'),
(21, 84, 1, '2020-01-25 17:24:44'),
(22, 84, 1, '2020-01-25 17:30:44'),
(23, 84, 1, '2020-01-25 17:33:17'),
(24, 84, 1, '2020-01-25 17:34:55'),
(25, 84, 1, '2020-01-25 17:52:11'),
(26, 84, 2, '2020-02-03 21:50:01'),
(27, 84, 2, '2020-02-03 21:52:34'),
(28, 84, 2, '2020-02-03 21:53:36'),
(29, 84, 2, '2020-02-03 21:54:47'),
(30, 84, 2, '2020-02-03 22:03:01'),
(31, 84, 2, '2020-02-03 22:14:39'),
(32, 84, 2, '2020-02-03 22:18:35'),
(33, 84, 2, '2020-02-03 22:25:19'),
(34, 84, 2, '2020-02-03 22:26:24'),
(35, 84, 2, '2020-02-03 22:27:17'),
(36, 84, 2, '2020-02-03 22:28:06'),
(37, 84, 2, '2020-02-03 22:31:19'),
(38, 84, 2, '2020-02-03 22:32:55'),
(39, 84, 2, '2020-02-03 22:33:20'),
(40, 84, 2, '2020-02-03 22:38:04'),
(41, 84, 2, '2020-02-03 22:40:12'),
(42, 84, 2, '2020-02-03 22:41:58'),
(43, 84, 2, '2020-02-03 22:42:28'),
(44, 84, 2, '2020-02-03 22:45:43'),
(45, 84, 2, '2020-02-03 22:46:57'),
(46, 84, 2, '2020-02-03 22:48:10'),
(47, 84, 2, '2020-02-03 22:49:16'),
(48, 84, 2, '2020-02-03 22:54:35'),
(49, 84, 2, '2020-02-03 22:59:46'),
(50, 95, 0, '2020-09-09 22:48:35'),
(51, 96, 0, '2020-09-09 22:49:06'),
(52, 97, 0, '2020-09-09 22:50:35'),
(53, 98, 0, '2020-09-09 22:51:06'),
(54, 99, 0, '2020-09-09 22:53:07');

-- --------------------------------------------------------

--
-- Table structure for table `track_order`
--

CREATE TABLE `track_order` (
  `order_id` int(11) NOT NULL,
  `courier` varchar(300) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `tracking_no` varchar(100) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `carrier_phone` bigint(11) NOT NULL DEFAULT 0,
  `item_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `user_otp`
--

CREATE TABLE `user_otp` (
  `mobile` bigint(20) NOT NULL,
  `otp` int(11) NOT NULL DEFAULT 0,
  `added_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

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
(38, 6),
(48, 1),
(51, 3),
(52, 3),
(55, 10),
(56, 10),
(57, 10),
(58, 10),
(59, 10),
(60, 3),
(61, 3),
(62, 1),
(64, 1),
(64, 3),
(69, 1),
(69, 2),
(69, 3),
(70, 1),
(71, 1),
(71, 5);

-- --------------------------------------------------------

--
-- Table structure for table `variant_mobile`
--

CREATE TABLE `variant_mobile` (
  `variant_id` int(11) NOT NULL,
  `mobile_id` int(11) NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `price` float NOT NULL DEFAULT 0,
  `discount` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `variant_mobile`
--

INSERT INTO `variant_mobile` (`variant_id`, `mobile_id`, `quantity`, `price`, `discount`) VALUES
(60, 1, 99, 500, 0),
(60, 3, 99, 500, 0),
(60, 5, 99, 500, 0),
(61, 1, 93, 400, 0),
(61, 3, 93, 400, 0),
(61, 4, 93, 400, 0),
(61, 6, 93, 400, 0),
(62, 1, 108, 823, 15),
(62, 5, 108, 823, 15),
(63, 1, 195, 545, 10),
(63, 3, 195, 545, 10),
(64, 1, 10, 249, 100),
(64, 2, 10, 249, 100),
(64, 3, 10, 249, 100),
(64, 4, 10, 249, 100),
(64, 5, 10, 249, 100),
(64, 6, 10, 249, 100),
(65, 1, 1, 249, 100),
(65, 2, 1, 249, 100),
(65, 3, 0, 249, 100),
(65, 4, 1, 249, 100),
(65, 5, -1, 249, 100),
(65, 6, 1, 249, 100),
(66, 1, 10, 700, 10),
(68, 5, 121, 20, 1),
(68, 6, 11, 20, 1),
(68, 7, 51, 20, 1),
(69, 2, 110, 20, 10),
(69, 4, 110, 20, 10),
(69, 5, 110, 20, 10),
(70, 1, 0, 20, 11),
(70, 2, 0, 20, 11),
(70, 3, 0, 20, 11),
(70, 4, 0, 20, 11),
(71, 7, 11, 823, 11);

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
  ADD PRIMARY KEY (`cart_id`,`variant_id`,`mobile_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `cart_mobile`
--
ALTER TABLE `cart_mobile`
  ADD PRIMARY KEY (`item_id`,`mobile_id`);

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
  ADD KEY `customer_id` (`user_id`),
  ADD KEY `address_id` (`address_id`),
  ADD KEY `promocode` (`promo_id`);

--
-- Indexes for table `meta`
--
ALTER TABLE `meta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `User ID` (`user_id`);

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
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

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
  ADD KEY `variant_id` (`variant_id`),
  ADD KEY `mobile_id` (`mobile_id`);

--
-- Indexes for table `paytm_details`
--
ALTER TABLE `paytm_details`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`variant_id`,`specification_key`);

--
-- Indexes for table `product_variant`
--
ALTER TABLE `product_variant`
  ADD PRIMARY KEY (`variant_id`),
  ADD KEY `tax_id` (`tax_id`),
  ADD KEY `Admin ID` (`admin_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `promocode`
--
ALTER TABLE `promocode`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `refund`
--
ALTER TABLE `refund`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `return_order_detail`
--
ALTER TABLE `return_order_detail`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `variant_id` (`variant_id`),
  ADD KEY `mobile_id` (`mobile_id`);

--
-- Indexes for table `return_reason`
--
ALTER TABLE `return_reason`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `return_request`
--
ALTER TABLE `return_request`
  ADD PRIMARY KEY (`order_id`,`item_id`);

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
-- Indexes for table `support`
--
ALTER TABLE `support`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tax`
--
ALTER TABLE `tax`
  ADD PRIMARY KEY (`tax_id`);

--
-- Indexes for table `track_detail`
--
ALTER TABLE `track_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `track_order`
--
ALTER TABLE `track_order`
  ADD PRIMARY KEY (`order_id`,`item_id`);

--
-- Indexes for table `user_otp`
--
ALTER TABLE `user_otp`
  ADD PRIMARY KEY (`mobile`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `attribute`
--
ALTER TABLE `attribute`
  MODIFY `attribute_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `attribute_value`
--
ALTER TABLE `attribute_value`
  MODIFY `attribute_value_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `customer_address`
--
ALTER TABLE `customer_address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `customer_order`
--
ALTER TABLE `customer_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5104;

--
-- AUTO_INCREMENT for table `meta`
--
ALTER TABLE `meta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `mobile_brand`
--
ALTER TABLE `mobile_brand`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `mobile_models`
--
ALTER TABLE `mobile_models`
  MODIFY `model_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `offer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `paytm_details`
--
ALTER TABLE `paytm_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `product_variant`
--
ALTER TABLE `product_variant`
  MODIFY `variant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `promocode`
--
ALTER TABLE `promocode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `refund`
--
ALTER TABLE `refund`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `return_order_detail`
--
ALTER TABLE `return_order_detail`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `return_reason`
--
ALTER TABLE `return_reason`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shipping`
--
ALTER TABLE `shipping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `specification`
--
ALTER TABLE `specification`
  MODIFY `specification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `specification_type`
--
ALTER TABLE `specification_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `support`
--
ALTER TABLE `support`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tax`
--
ALTER TABLE `tax`
  MODIFY `tax_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `track_detail`
--
ALTER TABLE `track_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
