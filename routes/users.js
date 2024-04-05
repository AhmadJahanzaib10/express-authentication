const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/crud");

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    contact:{
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(plm);

module.exports = mongoose.model('users', userSchema);
