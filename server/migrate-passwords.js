const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123', // Update this to match your MySQL password
  database: 'tripPlannerDB'
};

async function migratePasswords() {
  const connection = mysql.createConnection(dbConfig);

  try {
    console.log('🔗 Connecting to database...');
    
    // Get all users with plain text passwords
    const users = await new Promise((resolve, reject) => {
      connection.query('SELECT id, email, password FROM users', (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    console.log(`📋 Found ${users.length} users to migrate`);

    // Migrate each user's password
    for (const user of users) {
      // Check if password is already hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
      if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$') || user.password.startsWith('$2y$')) {
        console.log(`✅ User ${user.email} already has hashed password, skipping...`);
        continue;
      }

      // Hash the plain text password
      const hashedPassword = await bcrypt.hash(user.password, 12);
      
      // Update the user's password in database
      await new Promise((resolve, reject) => {
        connection.query(
          'UPDATE users SET password = ? WHERE id = ?',
          [hashedPassword, user.id],
          (err, results) => {
            if (err) reject(err);
            else resolve(results);
          }
        );
      });

      console.log(`🔒 Migrated password for user: ${user.email}`);
    }

    console.log('✅ Password migration completed successfully!');
    console.log('🔒 All passwords are now securely hashed with bcrypt');
    console.log('\n📝 Note: Test credentials remain the same:');
    console.log('   Email: test@example.com, Password: password123');
    console.log('   Email: demo@tripassistant.com, Password: demo123');
    console.log('   Email: admin@tripassistant.com, Password: admin123');

  } catch (error) {
    console.error('❌ Password migration failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure MySQL server is running');
    console.log('2. Check your database credentials');
    console.log('3. Ensure the tripPlannerDB database exists');
  } finally {
    connection.end();
  }
}

// Run the migration
console.log('🔐 Starting password migration...');
console.log('⚠️  This will hash all plain text passwords in the database');
migratePasswords();
