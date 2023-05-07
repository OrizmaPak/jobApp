const express = require('express');
const { Mongoose } = require('mongoose');


const UserSchema = new Mongoose.Schema({
    name:{
        type: String,
        maxLength: [42, 'maximum name length exceeded'],
        required: [true, 'please provide name']
    },
    email:{
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide a valid email'
        ],
        required: [true, 'please provide and email']
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minLength: [5, 'less than minimum password length']
    }
})

module.exports = Mongoose.model('User', UserSchema)