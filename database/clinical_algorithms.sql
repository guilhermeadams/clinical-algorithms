-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 05, 2023 at 06:38 PM
-- Server version: 11.2.2-MariaDB
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clinical_algorithms`
--

-- --------------------------------------------------------

--
-- Table structure for table `alembic_version`
--

CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `alembic_version`
--

INSERT INTO `alembic_version` (`version_num`) VALUES
('19db5623d8a9');

-- --------------------------------------------------------

--
-- Table structure for table `algorithms`
--

CREATE TABLE `algorithms` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `version` varchar(10) DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `algorithms_categories`
--

CREATE TABLE `algorithms_categories` (
  `id` bigint(20) NOT NULL,
  `algorithm_id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `graphs`
--

CREATE TABLE `graphs` (
  `id` bigint(20) NOT NULL,
  `algorithm_id` bigint(20) NOT NULL,
  `graph` text DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `id` bigint(20) NOT NULL,
  `recommendation_id` bigint(20) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `type` enum('high','moderate','low','not_specified') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nodes`
--

CREATE TABLE `nodes` (
  `id` bigint(20) NOT NULL,
  `algorithm_id` bigint(20) NOT NULL,
  `node_id` varchar(255) NOT NULL,
  `node_type` enum('StartElement','ActionElement','EvaluationElement','EndElement','LinkElement','LaneElement') NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recommendations`
--

CREATE TABLE `recommendations` (
  `id` bigint(20) NOT NULL,
  `node_id` bigint(20) NOT NULL,
  `index` bigint(20) NOT NULL,
  `recommendation_type` enum('formal','good_practices','not_formal') NOT NULL,
  `description` text DEFAULT NULL,
  `intervention_type` enum('treatment','diagnosis','population_classification') NOT NULL,
  `intervention` varchar(255) DEFAULT NULL,
  `comparator` varchar(255) DEFAULT NULL,
  `direction` enum('for_intervention','against_intervention','both') NOT NULL,
  `strength` enum('strong','weak') NOT NULL,
  `certainty_of_the_evidence` enum('high','moderate','low','not_specified') NOT NULL,
  `implementation_considerations` text DEFAULT NULL,
  `additional_comments` text DEFAULT NULL,
  `recommendation_source` text DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alembic_version`
--
ALTER TABLE `alembic_version`
  ADD PRIMARY KEY (`version_num`);

--
-- Indexes for table `algorithms`
--
ALTER TABLE `algorithms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_algorithms_description` (`description`(768)),
  ADD KEY `ix_algorithms_id` (`id`),
  ADD KEY `ix_algorithms_title` (`title`);

--
-- Indexes for table `algorithms_categories`
--
ALTER TABLE `algorithms_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `algorithm_id` (`algorithm_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `ix_algorithms_categories_id` (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_categories_id` (`id`);

--
-- Indexes for table `graphs`
--
ALTER TABLE `graphs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `algorithm_id` (`algorithm_id`),
  ADD KEY `ix_graphs_id` (`id`);

--
-- Indexes for table `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recommendation_id` (`recommendation_id`),
  ADD KEY `ix_links_id` (`id`),
  ADD KEY `ix_links_url` (`url`);

--
-- Indexes for table `nodes`
--
ALTER TABLE `nodes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `algorithm_id` (`algorithm_id`),
  ADD KEY `ix_nodes_id` (`id`);

--
-- Indexes for table `recommendations`
--
ALTER TABLE `recommendations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `node_id` (`node_id`),
  ADD KEY `ix_recommendations_additional_comments` (`additional_comments`(768)),
  ADD KEY `ix_recommendations_comparator` (`comparator`),
  ADD KEY `ix_recommendations_description` (`description`(768)),
  ADD KEY `ix_recommendations_id` (`id`),
  ADD KEY `ix_recommendations_implementation_considerations` (`implementation_considerations`(768)),
  ADD KEY `ix_recommendations_intervention` (`intervention`),
  ADD KEY `ix_recommendations_recommendation_source` (`recommendation_source`(768));

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `algorithms`
--
ALTER TABLE `algorithms`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `algorithms_categories`
--
ALTER TABLE `algorithms_categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `graphs`
--
ALTER TABLE `graphs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nodes`
--
ALTER TABLE `nodes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recommendations`
--
ALTER TABLE `recommendations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `algorithms_categories`
--
ALTER TABLE `algorithms_categories`
  ADD CONSTRAINT `algorithms_categories_ibfk_1` FOREIGN KEY (`algorithm_id`) REFERENCES `algorithms` (`id`),
  ADD CONSTRAINT `algorithms_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `graphs`
--
ALTER TABLE `graphs`
  ADD CONSTRAINT `graphs_ibfk_1` FOREIGN KEY (`algorithm_id`) REFERENCES `algorithms` (`id`);

--
-- Constraints for table `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `links_ibfk_1` FOREIGN KEY (`recommendation_id`) REFERENCES `recommendations` (`id`);

--
-- Constraints for table `nodes`
--
ALTER TABLE `nodes`
  ADD CONSTRAINT `nodes_ibfk_1` FOREIGN KEY (`algorithm_id`) REFERENCES `algorithms` (`id`);

--
-- Constraints for table `recommendations`
--
ALTER TABLE `recommendations`
  ADD CONSTRAINT `recommendations_ibfk_1` FOREIGN KEY (`node_id`) REFERENCES `nodes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
