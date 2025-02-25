-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2025 at 10:52 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_manager`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertRequiredDocuments` (IN `new_project_id` INT)   BEGIN
    INSERT INTO required_documents (project_id, document_name) VALUES
    (new_project_id, 'Letter of Intent (LOI)'),
    (new_project_id, 'TNA Form 1'),
    (new_project_id, 'TNA Form 2'),
    (new_project_id, 'RRA Form 3'),
    (new_project_id, 'TNA Form 4'),
    (new_project_id, 'SB Reso / Sec Certificate'),
    (new_project_id, 'Registration'),
    (new_project_id, 'Memorandum of Agreement'),
    (new_project_id, 'DV (Delivery Verification)'),
    (new_project_id, 'Property Acknowledgement Receipt'),
    (new_project_id, '1st Progress Report'),
    (new_project_id, '2nd Progress Report'),
    (new_project_id, 'Completion Report'),
    (new_project_id, 'Request for Transfer of Ownership'),
    (new_project_id, 'PM-TO-SS-5-23-14-F1'),
    (new_project_id, 'PM-TO-ISS-05-14-F2'),
    (new_project_id, 'Approval of Request for Transfer'),
    (new_project_id, 'On Process on Transfer'),
    (new_project_id, 'Fully Transferred the Equipment/With Property Transfer Report');
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `cest_users`
--

CREATE TABLE `cest_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cest_users`
--

INSERT INTO `cest_users` (`id`, `username`, `password`, `full_name`, `role`, `created_at`) VALUES
(1, 'cest_admin', '$2y$10$hpCUFpyLKhzijq1eLEw1t.rEJgVVLqIxaINcYVHNXIfK6dBqM6xcS', 'CEST Admin', 'admin', '2025-02-24 06:28:10'),
(2, 'cesto', '$2y$10$iI1gso.wrpPkyeKv5pEFVO7acdZI9hFgHHDpsat7p6ccqCKs0BbaO', NULL, 'user', '2025-02-24 06:47:58');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `document_name` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `uploaded` tinyint(1) DEFAULT 0,
  `upload_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `project_id`, `document_name`, `file_name`, `file_type`, `size`, `uploaded`, `upload_date`) VALUES
(102, 47, '1. Letter of Intent', '1740148942_Background.jpg', NULL, NULL, 1, '2025-02-21 14:42:22'),
(105, 47, '4. TNA Form 3', '1740148953_1740148031_MOA.docx', NULL, NULL, 1, '2025-02-21 14:42:33'),
(106, 47, '5. TNA Form 4', '1740148958_QuitClaim.docx', NULL, NULL, 1, '2025-02-21 14:42:38'),
(107, 47, '6. Project Proposal', '1740148962_QuitClaim.docx', NULL, NULL, 1, '2025-02-21 14:42:42'),
(108, 47, '7. PSTD-Endorsement of Project Proposal', '1740148966_QuitClaim_ShairynFabro.pdf', NULL, NULL, 1, '2025-02-21 14:42:46'),
(109, 47, ' 8. DOST-III TEC Endorsement', '1740148970_1740148205_1740148031_MOA.docx', NULL, NULL, 1, '2025-02-21 14:42:50'),
(110, 47, '9. Notice of Approval', '1740148974_1740148205_1740148031_MOA.docx', NULL, NULL, 1, '2025-02-21 14:42:54'),
(111, 47, '10. Memorandum of Agreement', '1740148977_1740148205_1740148031_MOA.docx', NULL, NULL, 1, '2025-02-21 14:42:57'),
(112, 47, '11. Property Acknowledgement Receipt', '1740148983_1740148205_1740148031_MOA.docx', NULL, NULL, 1, '2025-02-21 14:43:03'),
(113, 47, '12. 1st Progress Report', '1740148987_1740148205_1740148031_MOA.docx', NULL, NULL, 1, '2025-02-21 14:43:07'),
(114, 47, '13. 2nd Progress Report', '1740148990_1740148031_MOA.docx', NULL, NULL, 1, '2025-02-21 14:43:10'),
(115, 47, '14. Completion Report', '1740148994_1740148205_1740148031_MOA.docx', NULL, NULL, 1, '2025-02-21 14:43:14'),
(116, 47, '15. Letter of request for transfer', '1740148998_1740148031_MOA.docx', NULL, NULL, 1, '2025-02-21 14:43:18'),
(117, 47, '16. PM Form 1', '1740149002_1740148205_1740148031_MOA.docx', NULL, NULL, 1, '2025-02-21 14:43:22'),
(118, 47, '17. PM Form 2', '1740149006_1740148205_1740148031_MOA.docx', NULL, NULL, 1, '2025-02-21 14:43:26'),
(119, 47, '18. Approval of Transfer', '1740149011_1740148205_1740148031_MOA.docx', NULL, NULL, 1, '2025-02-21 14:43:31'),
(120, 47, '19. Property Transfer Report', '1740149017_1740148205_1740148031_MOA.docx', NULL, NULL, 1, '2025-02-21 14:43:37'),
(121, 47, '20. Journal Entry Voucher', '1740149021_FT-CRD-137-01-Student-Application-Letter-Template.doc', NULL, NULL, 1, '2025-02-21 14:43:41'),
(122, 47, '21. Deed of Donation and Certificate of Acceptance', '1740149028_FT-CRD-176-00-OJT-Training-Plan_BSIT-BSCS-BSIS-ACT-ITP.doc', NULL, NULL, 1, '2025-02-21 14:43:48'),
(132, 39, '1. Letter of Intent', '1740359609_1740359336_1740126838_1740126642_1740104578_1740100911_1740041550_1740039759_1740031442_setup (1) (1) (3).csv', NULL, NULL, 1, '2025-02-24 01:13:29'),
(133, 47, '2. TNA 1', '1740359660_1740126671_1740032990_DOST TNA Form 2-3.0 (2) (1) (1) (1).docx', NULL, NULL, 1, '2025-02-24 01:14:20'),
(134, 47, '3. TNA 2', '1740359665_1740126616_DOST TNA Form 2-3.0 (3).docx', NULL, NULL, 1, '2025-02-24 01:14:25');

-- --------------------------------------------------------

--
-- Table structure for table `gia_files`
--

CREATE TABLE `gia_files` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `document_name` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `uploaded` tinyint(1) DEFAULT 0,
  `upload_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gia_files`
--

INSERT INTO `gia_files` (`id`, `project_id`, `document_name`, `file_name`, `file_type`, `size`, `uploaded`, `upload_date`) VALUES
(102, 47, '1. Letter of Intent', '1740148942_Background.jpg', NULL, NULL, 1, '2025-02-21 06:42:22');

-- --------------------------------------------------------

--
-- Table structure for table `gia_projects`
--

CREATE TABLE `gia_projects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` year(4) NOT NULL,
  `required_files` int(11) NOT NULL,
  `uploaded_files` int(11) DEFAULT 0,
  `status` varchar(50) NOT NULL DEFAULT 'For Deployment'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gia_projects`
--

INSERT INTO `gia_projects` (`id`, `name`, `year`, `required_files`, `uploaded_files`, `status`) VALUES
(1, 'gia test project', '2024', 0, 0, 'For Deployment'),
(2, 'gia testing', '2022', 0, 0, 'For Deployment');

-- --------------------------------------------------------

--
-- Table structure for table `gia_users`
--

CREATE TABLE `gia_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gia_users`
--

INSERT INTO `gia_users` (`id`, `username`, `password`, `full_name`, `role`, `created_at`) VALUES
(1, 'gia_admin', '$2y$10$hpCUFpyLKhzijq1eLEw1t.rEJgVVLqIxaINcYVHNXIfK6dBqM6xcS', 'GIA Admin', 'admin', '2025-02-24 06:28:10'),
(2, 'gia123', '$2y$10$qVMYLpsLIS/PaMxsF6pgcutn/.RILQ2WjBNKcaVEn3SMTDHxMT56i', NULL, 'user', '2025-02-24 07:07:27');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` year(4) NOT NULL,
  `required_files` int(11) NOT NULL,
  `uploaded_files` int(11) DEFAULT 0,
  `status` varchar(50) NOT NULL DEFAULT 'For Deployment'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `year`, `required_files`, `uploaded_files`, `status`) VALUES
(39, 'Project Powe23', '2022', 0, 0, 'For Deployment'),
(47, 'testtestq43243', '2024', 0, 0, 'For Deployment'),
(53, 'testing 21thh', '2024', 0, 0, 'For Deployment'),
(54, 'test 123', '2025', 0, 0, 'For Deployment'),
(56, 'test 212345678', '2025', 0, 0, 'For Deployment');

-- --------------------------------------------------------

--
-- Table structure for table `setup_users`
--

CREATE TABLE `setup_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `setup_users`
--

INSERT INTO `setup_users` (`id`, `username`, `password`, `full_name`, `role`, `created_at`) VALUES
(1, 'setup_admin', '$2y$10$hpCUFpyLKhzijq1eLEw1t.rEJgVVLqIxaINcYVHNXIfK6dBqM6xcS', 'SETUP Admin', 'admin', '2025-02-24 06:28:10'),
(2, 'setupes', '$2y$10$tss9.P2kkOttbuJPnZ5Aoev81B1DRI1L03d8kTdrgeviPhdmamRnC', NULL, 'user', '2025-02-24 06:49:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cest_users`
--
ALTER TABLE `cest_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `gia_files`
--
ALTER TABLE `gia_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gia_projects`
--
ALTER TABLE `gia_projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gia_users`
--
ALTER TABLE `gia_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setup_users`
--
ALTER TABLE `setup_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cest_users`
--
ALTER TABLE `cest_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT for table `gia_files`
--
ALTER TABLE `gia_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `gia_projects`
--
ALTER TABLE `gia_projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `gia_users`
--
ALTER TABLE `gia_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `setup_users`
--
ALTER TABLE `setup_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
