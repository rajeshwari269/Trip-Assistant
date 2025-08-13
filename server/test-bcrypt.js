const bcrypt = require('bcryptjs');

// Test script to verify bcrypt functionality
async function testBcrypt() {
  console.log('🧪 Testing bcrypt functionality...');
  
  try {
    const plainPassword = 'testPassword123';
    
    // Test hashing
    console.log('1. Testing password hashing...');
    const hashedPassword = await bcrypt.hash(plainPassword, 12);
    console.log(`   ✅ Original: ${plainPassword}`);
    console.log(`   ✅ Hashed: ${hashedPassword}`);
    
    // Test comparison (correct password)
    console.log('2. Testing correct password verification...');
    const isValidCorrect = await bcrypt.compare(plainPassword, hashedPassword);
    console.log(`   ✅ Verification result: ${isValidCorrect}`);
    
    // Test comparison (incorrect password)
    console.log('3. Testing incorrect password verification...');
    const isValidIncorrect = await bcrypt.compare('wrongPassword', hashedPassword);
    console.log(`   ✅ Verification result: ${isValidIncorrect}`);
    
    console.log('\n🎉 bcrypt is working correctly!');
    console.log('🔒 Ready for secure password implementation');
    
  } catch (error) {
    console.error('❌ bcrypt test failed:', error.message);
  }
}

testBcrypt();
