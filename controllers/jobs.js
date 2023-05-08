const { NotFoundError } = require("../errors");
const notFound = require("../middleware/not-found");
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
    const job = await Job.findOneAndUpdate({_id: req.params.id, createdBy: req.user.userId}, req.body, {new: true, runValidators:true})
    res.status(StatusCodes.OK).json({job})
}


const deleteJob =async(req, res)=>{
    try{
        const job = await Job.findOneAndDelete({_id: req.params.id, createdBy: req.user.userId})
        res.status(StatusCodes.OK).json({msg:'the job below has been successfully deleted',job})
    }catch(err){
        throw new NotFoundError('failed Unable to find item and delete')
    }
}


module.exports = {
    getAlljobs,
    getAJob,
    createJob,
    updateJob,
    deleteJob
}