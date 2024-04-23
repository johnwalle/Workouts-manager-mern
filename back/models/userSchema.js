const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({

    name: {
        type: String,
        required: [true, "please fill the name field"]
    },
    email: {
        type: String,
        required: [true, "please fill the email field"],
        unique: [true, "The email has to be unique"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "please fill the password field"]
    }


}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);

