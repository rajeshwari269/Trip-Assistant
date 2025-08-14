-- Create database if not exists
CREATE DATABASE IF NOT EXISTS tripPlannerDB;
USE tripPlannerDB;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  mobileNo VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  host_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  max_guests INT NOT NULL DEFAULT 1,
  bedrooms INT NOT NULL DEFAULT 1,
  bathrooms INT NOT NULL DEFAULT 1,
  property_type ENUM('apartment', 'house', 'hotel', 'villa', 'resort') DEFAULT 'apartment',
  status ENUM('available', 'booked', 'maintenance') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (host_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create property_images table
CREATE TABLE IF NOT EXISTS property_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Insert a test user (for testing properties)
-- Using ON DUPLICATE KEY UPDATE to avoid errors if user already exists
INSERT INTO users (userName, email, password, mobileNo)
VALUES ('Test User', 'test@example.com', 'password123', '1234567890')
ON DUPLICATE KEY UPDATE 
  userName = VALUES(userName),
  mobileNo = VALUES(mobileNo);

-- Insert additional demo users for testing
INSERT INTO users (userName, email, password, mobileNo)
VALUES 
  ('Demo User', 'demo@tripassistant.com', 'demo123', '9876543210'),
  ('Admin User', 'admin@tripassistant.com', 'admin123', '5555555555')
ON DUPLICATE KEY UPDATE 
  userName = VALUES(userName),
  mobileNo = VALUES(mobileNo);

-- Verify users were created
SELECT id, userName, email, mobileNo, created_at FROM users;

-- Show tables
SHOW TABLES;
