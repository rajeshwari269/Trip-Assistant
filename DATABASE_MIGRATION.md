# Database Migration: MySQL to MongoDB

## Summary
This project has been successfully migrated from MySQL to MongoDB for consistent database usage.

## Changes Made

### 1. Database Configuration
- **Before**: Mixed MySQL and MongoDB configurations
- **After**: Unified MongoDB configuration
- **Files updated**: 
  - `config/db.js` - Now contains MongoDB connection logic
  - `server.js` - Uses centralized MongoDB connection

### 2. Models
- **MongoDB Models Created**:
  - `models/user.js` - User schema with bcrypt integration
  - `models/property.js` - Property schema with image arrays

### 3. Controllers Updated
- **userController.js**: 
  - Migrated from MySQL queries to MongoDB/Mongoose
  - Maintains secure bcrypt password hashing
  - Uses async/await for better error handling
  
- **propertyController.js**:
  - Migrated from MySQL queries to MongoDB/Mongoose
  - Simplified image handling with array storage

### 4. Routes Secured
- **entry-point.js**: 
  - Fixed major security vulnerability (plain text passwords)
  - Now uses secure userController functions with bcrypt

### 5. Dependencies Cleaned
- Removed `mysql2` dependency
- Kept `mongoose` for MongoDB operations

## Setup Instructions

### 1. Environment Configuration
Create a `.env` file in the server directory:
```env
MONGO_DB_URI=mongodb://localhost:27017/tripPlannerDB
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
PORT=5000
```

### 2. MongoDB Setup
Ensure MongoDB is running on your system:
```bash
# Install MongoDB (if not already installed)
# Start MongoDB service
mongod

# Or use MongoDB Atlas for cloud deployment
```

### 3. Install Dependencies
```bash
cd server
npm install
```

### 4. Start Server
```bash
npm run dev  # For development with nodemon
npm start    # For production
```

## Migration Benefits

1. **Consistency**: Single database technology (MongoDB)
2. **Security**: Proper password hashing maintained
3. **Scalability**: MongoDB's flexible schema
4. **Performance**: Better handling of nested data (images array)
5. **Modern**: Mongoose ODM for better development experience

## Database Schema

### User Schema
```javascript
{
  user_name: String (required),
  email: String (required, unique),
  password: String (required, bcrypt hashed),
  mobile_no: String (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Property Schema
```javascript
{
  host_id: String,
  title: String,
  description: String,
  location: String,
  price: Number,
  max_guests: Number,
  bedrooms: Number,
  bathrooms: Number,
  property_type: String,
  status: String,
  images: [String],
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Security Features Maintained

- ✅ bcrypt password hashing (12 salt rounds)
- ✅ JWT token authentication
- ✅ Input validation
- ✅ Error handling
- ✅ CORS configuration
