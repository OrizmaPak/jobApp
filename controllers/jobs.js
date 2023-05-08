const Job = require("../models/Job");
const {StatusCodes} = require('http-status-codes')

const getAlljobs =async(req, res)=>{
    const job = await Job.find({createdBy: req.user.userId})
    res.status(StatusCodes.OK).json({job})
}

const getAJob =async(req, res)=>{
    const job = await Job.findOne({_id: req.params.id, createdBy: req.user.userId})
    res.status(StatusCodes.OK).json({job})
}


const createJob =async(req, res)=>{
    req.body.createdBy = req.user.userId
    const job = await Job.create({...req.body})   
    res.status(StatusCodes.CREATED).json({job})
}
 

const updateJob =async(req, res)=>{
    // const job = await Job.
}


const deleteJob =async(req, res)=>{
    res.send('omo na delete a Jobs oo')
}


module.exports = {
    getAlljobs,
    getAJob,
    createJob,
    updateJob,
    deleteJob
}