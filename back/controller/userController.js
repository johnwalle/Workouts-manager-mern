const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')
const bcrypt = require("bcryptjs")

// Creating users

const creatingUsers = async (req, res) => {

    const { name, email, password } = req.body

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "The user already registerd" })
        }


        /// hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(200).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error while creating user" });
    }

}

// login user 


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        const match = await bcrypt.compare(password, user.password);
       
        if (user && match) {


            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Login failed' });
    }
}



/// getting all users 

const gettingUsers = async (rep, res) => {

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "error while getting users" })
    }
}

/// Getting users by id 

const gettingEachUsers = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(400).json({ message: "No user found" })
        }
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "error while getting user" })
    }
}


/// Deleting user

const deletingUser = async (req, res) => {
    const { id } = req.params
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {

            res.status(404).json({ message: "User not found" });

        }
        res.status(200).json({ message: "Successfully deleted", deletedUser })

    } catch (error) {
        console.error(error)
        res.status(400).json({ message: "Error while deleting the user" })
    }
}



// updating the user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Successfully updated!", updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Error while updating the user" });
    }
};

/// GENERATE JWT_TOKEN

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    creatingUsers,
    gettingUsers,
    gettingEachUsers,
    updateUser,
    deletingUser,
    loginUser
}