const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register user
const  register = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// login user
const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            res.status(400).json({ success: false, message: "User not found"});
        }
        const passMatch = await bcrypt.compare(password, user.password);

        if(!passMatch){
            res.status(400).json({ success: false, message: "Invalid credentials"})
        }

        const token = jwt.sign(
           { userId: user._id},
             process.env.JWT_SECRET,
             { expiresIn: '7d'}
        )
        res.json({ success: true, token });
    }catch(error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    register,
    login
}