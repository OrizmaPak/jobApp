const getAlljobs =(req, res)=>{
    res.send('omo na get all Jobs oo')
}

const getAJob =(req, res)=>{
    res.send('omo na get a Jobs oo')
}


const createJob =(req, res)=>{
    res.send('omo na create a Jobs oo')
}


const updateJob =(req, res)=>{
    res.send('omo na update a Jobs oo')
}


const deleteJob =(req, res)=>{
    res.send('omo na delete a Jobs oo')
}


module.exports = {
    getAlljobs,
    getAJob,
    createJob,
    updateJob,
    deleteJob
}