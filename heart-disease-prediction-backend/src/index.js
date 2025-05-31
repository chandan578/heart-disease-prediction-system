require("dotenv").config();
const express = require("express");
const cors = require('cors');
const userRoute = require("./routes/userroutes"); 
const predictRouter = require("./routes/mlRoutes");
const authRoutes = require('./routes/authRoutes');
const patient = require('./routes/patientsRoutes');

const { connectDB, sequelize } = require('./config/database');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/", userRoute);
// app.use("/api/", patientRoute);
app.use("/api/", predictRouter);
app.use('/api/auth', authRoutes);
app.use('/api/', patient)


// Connect to the database
connectDB();
sequelize.sync()
    .then(() => console.log("✅ Database Synced"))
    .catch(err => console.error("❌ Error syncing database:", err));

module.exports = app;