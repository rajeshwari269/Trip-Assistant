const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

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
    `;

    await new Promise((resolve, reject) => {
      connection.query(setupSQL, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    console.log('✅ Database and tables created successfully!');

    // Create demo users with securely hashed passwords
    console.log('🔒 Creating demo users with secure passwords...');
    
    const demoUsers = [
      { userName: 'Test User', email: 'test@example.com', password: 'password123', mobileNo: '1234567890' },
      { userName: 'Demo User', email: 'demo@tripassistant.com', password: 'demo123', mobileNo: '9876543210' },
      { userName: 'Admin User', email: 'admin@tripassistant.com', password: 'admin123', mobileNo: '5555555555' }
    ];

    for (const user of demoUsers) {
      // Check if user already exists
      const existingUser = await new Promise((resolve, reject) => {
        connection.query('SELECT id FROM users WHERE email = ?', [user.email], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      if (existingUser.length === 0) {
        // Hash password before storing with salt rounds of 12 for high security
        const hashedPassword = await bcrypt.hash(user.password, 12);
        
        // Insert new user with hashed password
        await new Promise((resolve, reject) => {
          connection.query(
            'INSERT INTO users (userName, email, password, mobileNo) VALUES (?, ?, ?, ?)',
            [user.userName, user.email, hashedPassword, user.mobileNo],
            (err, results) => {
              if (err) reject(err);
              else resolve(results);
            }
          );
        });
        
        console.log(`   ✅ Created secure user: ${user.email}`);
      } else {
        console.log(`   ⚠️  User already exists: ${user.email}`);
      }
    }

    // Verify demo users
    const verifySQL = 'SELECT id, userName, email, mobileNo FROM users';
    const users = await new Promise((resolve, reject) => {
      connection.query(verifySQL, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    console.log('\n👥 Demo users available:');
    users.forEach(user => {
      console.log(`   - ${user.userName} (${user.email})`);
    });

    console.log('\n🚀 You can now login with these credentials:');
    console.log('   Email: test@example.com');
    console.log('   Password: password123');
    console.log('\n   Alternative demo accounts:');
    console.log('   Email: demo@tripassistant.com');
    console.log('   Password: demo123');
    console.log('\n🔒 All passwords are securely hashed with bcrypt (salt rounds: 12)');

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
