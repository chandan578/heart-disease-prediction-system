const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected');
    } catch (error) {
        console.error('Database Connection Failed:', error);
        process.exit(1);
    }
};

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_DIALECT:", process.env.DB_DIALECT);  // Check if dialect is loaded


module.exports = { sequelize, connectDB };
