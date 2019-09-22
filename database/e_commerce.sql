-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2019 at 11:36 PM
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
-- Table structure for table `attribute`
--

CREATE TABLE `attribute` (
  `attribute_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `date_time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `attribute_value`
--

CREATE TABLE `attribute_value` (
  `attribute_value_id` int(11) NOT NULL,
  `value` varchar(100) DEFAULT NULL,
  `attribute_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 'banner1.PNG', 2, 0),
(2, 'banner2.PNG', 1, 0),
(3, 'banner3.PNG', 3, 0),
(4, 'banner4.jpg', 11, 0),
(5, 'banner5.jpg', 11, 0),
(6, 'banner6.jpg', 11, 0),
(7, 'banner7.jpg', 11, 0);

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
  `image_required` tinyint(1) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `mobile_required` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `name`, `description`, `image`, `image_required`, `parent_id`, `mobile_required`) VALUES
(2, 'Design Print Soft Cover', 'Design Print Soft Cover', 'cover.jpg', 0, 0, 1),
(3, 'Design Print Hard Cover', 'Design Print Hard Cover', 'cover.jpg', 0, 0, 1),
(4, 'Photo Soft Cover', 'Photo Soft Cover', 'cover.jpg', 1, 0, 1),
(5, 'Photo Hard Cover', 'Photo Hard Cover', 'cover.jpg', 1, 0, 1),
(6, 'Earphone', 'Earphone', 'headphone.jpg', 0, 0, 0),
(7, 'Cabel', 'Cabel', 'electric.jpg', 0, 0, 0),
(8, 'Charger', 'Charger', 'electric.jpg', 0, 0, 0),
(9, 'Speaker', 'Speaker', 'speaker.jpg', 0, 0, 0),
(10, 'Design Print Soft Cover', '', 'cover.jpg', 0, 2, NULL),
(11, 'Soft Design Print Cover', '', 'cover.jpg', 0, 2, NULL),
(12, 'Design Print Hard Cover', '', 'cover.jpg', 0, 3, NULL),
(13, 'Hard Design Print Cover', '', 'cover.jpg', 0, 3, NULL),
(14, 'Rubber Photo Hard Cover', '', 'cover.jpg', 1, 5, NULL),
(15, 'Hard Photo Cover', '', 'cover.jpg', 1, 5, NULL),
(16, 'Rubber Photo Soft Cover', '', 'cover.jpg', 1, 4, NULL),
(17, 'Soft Photo Cover', '', 'cover.jpg', 1, 4, NULL),
(18, 'Lot Shot', '', 'cover.jpg', 0, 0, 1);

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
  `profile_image` varchar(800) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `added_date` datetime DEFAULT current_timestamp(),
  `modified_date` datetime DEFAULT current_timestamp(),
  `reset_token` text DEFAULT NULL,
  `register_otp` int(11) NOT NULL,
  `mobile_verified` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `fname`, `lname`, `username`, `email`, `password`, `mobile1`, `mobile2`, `profile_image`, `city`, `state`, `added_date`, `modified_date`, `reset_token`, `register_otp`, `mobile_verified`) VALUES
(5, NULL, NULL, 'Parth Dhankecha', 'pmd3290@gmail.com', 'E10ADC3949BA59ABBE56E057F20F883E', 9856563777, NULL, '', NULL, NULL, '2019-09-16 20:13:05', '2019-09-16 20:13:05', NULL, 0, 1),
(6, NULL, NULL, 'A Xyz', 'A@c.com', 'E10ADC3949BA59ABBE56E057F20F883E', 9852685363, NULL, '', NULL, NULL, '2019-09-21 19:02:39', '2019-09-21 19:02:39', NULL, 0, 1),
(7, NULL, NULL, 'A Xyz', 'A@a.com', 'E10ADC3949BA59ABBE56E057F20F883E', 9852636363, NULL, '', NULL, NULL, '2019-09-22 23:23:07', '2019-09-22 23:23:07', NULL, 759730, 0),
(8, NULL, NULL, 'A Xyz', 'A@sa.com', 'E10ADC3949BA59ABBE56E057F20F883E', 9852636367, NULL, NULL, NULL, NULL, '2019-09-23 02:46:15', '2019-09-23 02:46:15', NULL, 371532, 0);

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
  `mdel_id` int(11) NOT NULL,
  `model_name` varchar(100) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `descripiton` text DEFAULT NULL,
  `is_display` tinyint(1) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `descripiton`, `is_display`, `category_id`) VALUES
(1, 'Soft leather print back cover good quality Camera protection layer', 1, 11),
(2, 'Soft leather print back cover good quality Camera protection layer', 1, 18);

-- --------------------------------------------------------

--
-- Table structure for table `product_specification`
--

CREATE TABLE `product_specification` (
  `product_id` int(11) NOT NULL,
  `specification_id` int(11) NOT NULL,
  `value` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(8, 'Soft leather print back cover good quality Camera protection layer\r\n\r\n', 120, 20, 1, 1, 10, 80, 1, 4.2, NULL, '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', '[\"product1_main.jpg\"]', 2, 0, 1, '2019-09-18 20:43:50', '2019-09-18 20:43:50');

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
  `category_id` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `date_time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

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
  ADD PRIMARY KEY (`mdel_id`),
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
  ADD PRIMARY KEY (`product_id`,`specification_id`);

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
  ADD PRIMARY KEY (`specification_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `specification type` (`type`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attribute`
--
ALTER TABLE `attribute`
  MODIFY `attribute_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attribute_value`
--
ALTER TABLE `attribute_value`
  MODIFY `attribute_value_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `mdel_id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_variant`
--
ALTER TABLE `product_variant`
  MODIFY `variant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `specification_id` int(11) NOT NULL AUTO_INCREMENT;

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
