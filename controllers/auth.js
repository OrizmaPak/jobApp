const {StatusCode} = require('http-status-codes')

const register =async(req, res)=>{
    const {name, email, password} = req.body;
    res.status(StatusCode.CREATED).json({msg:'the user has been created', name, email, password})
}

const login =async(req, res)=>{
    const {email, password} = req.body;
    res.status(StatusCode.CREATED).json({msg:'the user has been created', email, password})
}

module.exports ={
    register,
    login
}