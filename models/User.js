const express = require('express');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { env } = require('process');

const UserSchema = new mongoose.Schema({
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
        required: [true, 'please provide and email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minLength: [5, 'less than minimum password length']
    }
})
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.createJWT = function(){
    return jwt.sign({userID:this._id,name:this.name}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
}
UserSchema.methods.checkPassword = async function(passwordData){
    const isMatch = await bcrypt.compare(passwordData, this.password)
    return isMatch
}


module.exports = mongoose.model('User', UserSchema);