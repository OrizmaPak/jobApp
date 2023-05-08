const express = require('express');
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors');

const auth =(req, res, next)=>{
    console.log(req.headers)
    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
        throw new UnauthenticatedError('invalid credential')
    }
    const token = req.headers.authorization.split(' ')[1] 
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId:payload.userID, name: payload.name}
        next()
    }catch(err){
        throw new UnauthenticatedError('invalid credential')
    }
}

module.exports = auth