// Environment validation utility for Trip Assistant
// This ensures all required environment variables are set before starting the server

const chalk = require('chalk');

/**
 * Required environment variables for the server
 */
const requiredEnvVars = [
  {
    name: 'JWT_SECRET',
    description: 'JWT secret key for token signing',
    critical: true,
    minLength: 32
  },
  {
    name: 'MONGO_DB_URI',
    description: 'MongoDB connection string',
    critical: true
  }
];

/**
 * Optional but recommended environment variables
 */
const recommendedEnvVars = [
  {
    name: 'PEXELS_API_KEY',
    description: 'Pexels API key for place images',
    feature: 'Places functionality'
  },
  {
    name: 'NODE_ENV',
    description: 'Application environment',
    default: 'development'
  },
  {
    name: 'PORT',
    description: 'Server port',
    default: '5000'
  }
];

/**
 * Validates all environment variables
 * @returns {Object} validation result
 */
function validateEnvironment() {
  const errors = [];
  const warnings = [];
  
  console.log(chalk.blue('\n🔍 Validating environment configuration...\n'));
  
  // Check required variables
  for (const envVar of requiredEnvVars) {
    const value = process.env[envVar.name];
    
    if (!value) {
      errors.push({
        name: envVar.name,
        message: `${envVar.description} is required`,
        critical: envVar.critical
      });
    } else if (envVar.minLength && value.length < envVar.minLength) {
      errors.push({
        name: envVar.name,
        message: `${envVar.description} must be at least ${envVar.minLength} characters long`,
        critical: envVar.critical
      });
    } else {
      console.log(chalk.green(`✅ ${envVar.name}: Configured`));
    }
  }
  
  // Check recommended variables
  for (const envVar of recommendedEnvVars) {
    const value = process.env[envVar.name];
    
    if (!value) {
      warnings.push({
        name: envVar.name,
        message: `${envVar.description} is not set${envVar.feature ? ` - ${envVar.feature} may not work` : ''}`,
        default: envVar.default
      });
    } else {
      console.log(chalk.green(`✅ ${envVar.name}: Configured`));
    }
  }
  
  // Display warnings
  if (warnings.length > 0) {
    console.log(chalk.yellow('\n⚠️  WARNINGS:'));
    warnings.forEach(warning => {
      console.log(chalk.yellow(`   • ${warning.name}: ${warning.message}`));
      if (warning.default) {
        console.log(chalk.gray(`     Using default: ${warning.default}`));
      }
    });
  }
  
  // Display errors
  if (errors.length > 0) {
    console.log(chalk.red('\n❌ ERRORS:'));
    errors.forEach(error => {
      console.log(chalk.red(`   • ${error.name}: ${error.message}`));
    });
    
    console.log(chalk.red('\n🔧 To fix these issues:'));
    console.log(chalk.white('   1. Copy server/.env.sample to server/.env'));
    console.log(chalk.white('   2. Fill in the required values in server/.env'));
    console.log(chalk.white('   3. Restart the server\n'));
    
    const criticalErrors = errors.filter(e => e.critical);
    if (criticalErrors.length > 0) {
      console.log(chalk.red('🚨 CRITICAL: Cannot start server with missing critical environment variables\n'));
      return { success: false, errors, warnings };
    }
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log(chalk.green('\n🎉 All environment variables are properly configured!\n'));
  } else if (errors.length === 0) {
    console.log(chalk.yellow('\n✅ Environment validation passed with warnings\n'));
  }
  
  return { success: errors.length === 0, errors, warnings };
}

/**
 * Validates specific environment variable
 * @param {string} varName - Environment variable name
 * @returns {boolean} Is valid
 */
function validateEnvVar(varName) {
  const value = process.env[varName];
  const required = requiredEnvVars.find(v => v.name === varName);
  
  if (!value) return false;
  if (required && required.minLength && value.length < required.minLength) return false;
  
  return true;
}

/**
 * Gets environment variable with validation
 * @param {string} varName - Environment variable name
 * @param {string} defaultValue - Default value if not set
 * @returns {string} Environment variable value
 */
function getEnvVar(varName, defaultValue = null) {
  const value = process.env[varName];
  
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${varName} is required but not set`);
  }
  
  return value || defaultValue;
}

module.exports = {
  validateEnvironment,
  validateEnvVar,
  getEnvVar,
  requiredEnvVars,
  recommendedEnvVars
};
