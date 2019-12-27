-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 27, 2019 at 04:55 AM
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
-- Table structure for table `return_request`
--

CREATE TABLE `return_request` (
  `order_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT '0- Return 1 - Replace',
  `reason` int(11) NOT NULL,
  `image` int(11) NOT NULL,
  `added_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `return_request`
--

INSERT INTO `return_request` (`order_id`, `item_id`, `type`, `reason`, `image`, `added_date`, `modified_date`) VALUES
(27, 18, 0, 0, 2147483647, '2019-12-27 09:06:38', '2019-12-27 09:06:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `return_request`
--
ALTER TABLE `return_request`
  ADD PRIMARY KEY (`order_id`,`item_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
