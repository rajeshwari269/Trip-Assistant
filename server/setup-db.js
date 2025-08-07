const mysql = require('mysql2');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123', // Update this to match your MySQL password
  multipleStatements: true
};

async function setupDatabase() {
  const connection = mysql.createConnection(dbConfig);

  try {
    console.log('🔗 Connecting to MySQL...');
    
    // Create database and tables
    const setupSQL = `
      CREATE DATABASE IF NOT EXISTS tripPlannerDB;
      USE tripPlannerDB;

      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userName VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        mobileNo VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

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

      CREATE TABLE IF NOT EXISTS property_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        property_id INT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
      );

      INSERT INTO users (userName, email, password, mobileNo)
      VALUES 
        ('Test User', 'test@example.com', 'password123', '1234567890'),
        ('Demo User', 'demo@tripassistant.com', 'demo123', '9876543210'),
        ('Admin User', 'admin@tripassistant.com', 'admin123', '5555555555')
      ON DUPLICATE KEY UPDATE 
        userName = VALUES(userName),
        mobileNo = VALUES(mobileNo);
    `;

    await new Promise((resolve, reject) => {
      connection.query(setupSQL, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    console.log('✅ Database and tables created successfully!');

    // Verify demo users
    const verifySQL = 'SELECT id, userName, email, mobileNo FROM users';
    const users = await new Promise((resolve, reject) => {
      connection.query(verifySQL, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    console.log('👥 Demo users created:');
    users.forEach(user => {
      console.log(`   - ${user.userName} (${user.email})`);
    });

    console.log('\n🚀 You can now login with these credentials:');
    console.log('   Email: test@example.com');
    console.log('   Password: password123');
    console.log('\n   Alternative demo accounts:');
    console.log('   Email: demo@tripassistant.com');
    console.log('   Password: demo123');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure MySQL server is running');
    console.log('2. Check your MySQL username and password in this script');
    console.log('3. Ensure you have MySQL installed');
  } finally {
    connection.end();
  }
}

// Run the setup
setupDatabase();
