const express = require('express') 
const { getAlljobs, getAJob, updateJob, deleteJob, createJob } = require('../controllers/jobs')
const router = express.Router();
const auth = require('../middleware/authentication') 

router.route('/').get(auth, getAlljobs).post(auth, createJob)
router.route('/:id').get(auth, getAJob).post(auth, updateJob).delete(auth, deleteJob)

module.exports = router