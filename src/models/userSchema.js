const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true,
    //     minlength: 3
    // },
    phonenumber: {
        type: Number,
        required: true,
        min: 10,
        unique: [true, 'phone number already exist']
    },
    // language: {
    //     type: String,
    //     required: true,

    // },
    // country: {
    //     type: String,
    //     required: true,

    // },
    // address: {
    //     type: String,
    //     required: true,
    // },
    // houseno: {
    //     type: String,
    //     required: true,
    // },
    // state: {
    //     type: String,
    //     required: true,
    // },
    // city: {
    //     type: String,
    //     required: true,
    // },
    // street: {
    //     type: String,
    //     required: true,
    // },
    // zipcode: {
    //     type: String,
    //     required: true,
    // },
    // country: {
    //     type: String,
    //     required: true,
    // }
})


const User = new mongoose.model('User', userSchema);

module.exports = User;