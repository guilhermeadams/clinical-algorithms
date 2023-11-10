CREATE TABLE `algorithms` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `version` varchar(10) NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `algorithms_graphs` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `algorithm_id` int(11) NOT NULL,
  `graph` text DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  FOREIGN KEY (algorithm_id) REFERENCES algorithms(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;


