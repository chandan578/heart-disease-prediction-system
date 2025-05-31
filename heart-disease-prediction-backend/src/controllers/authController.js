const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register a New User
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(req.body.password)
        req.body.password = hashedPassword;
        user = await User.create(req.body);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
exports.login = async (req, res) => {
    const { email, password, role } = req.body;
    
    try {
        // Find user with email and role
        const user = await User.findOne({ 
            where: { 
                email,
                role
            } 
        });
        
        if (!user) {
            return res.status(400).json({ 
                message: 'Invalid Credentials or Role' 
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                message: 'Invalid Credentials' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user.id,
                role: user.role
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // Convert Sequelize instance to plain object
        const userData = user.get({ plain: true });
        
        // Remove sensitive data (password) before sending
        delete userData.password;

        res.json({ 
            token, 
            user: userData // Returns all user attributes except password
        });
        
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ 
            message: 'Server Error', 
            error: error.message 
        });
    }
};