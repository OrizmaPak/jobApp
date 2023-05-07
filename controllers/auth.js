const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register =async(req, res)=>{
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:user.name,token})
}

const login =async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        throw new BadRequestError('please provide email and password')
        // return res.status(StatusCodes.BAD_REQUEST).json({msg: 'please provide email and password'}) 
    }
    const user = await User.findOne({email:req.body.email})
    if(!user){
        throw new UnauthenticatedError('invalid credentials [username]')
    }
    const checkThepassword = await user.checkPassword(password);
    if(!checkThepassword){
        throw new UnauthenticatedError('invalid credentials [password]');
    }
    const token = await user.createJWT();
    res.status(200).json({user, token})
}

module.exports ={
    register,
    login
}