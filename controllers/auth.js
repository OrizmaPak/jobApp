const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register =async(req, res)=>{
    const user = await User.create({...req.body})
    const token
    res.status(StatusCodes.CREATED).json({user:user.name,token})
}

const login =async(req, res)=>{
    const {email, password} = req.body;
    res.status(StatusCodes.CREATED).json({msg:'the user has been created', email, password})
}

module.exports ={
    register,
    login
}