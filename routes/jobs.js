const express = require('express')
const { getAlljobs, getAJob, updateJob, deleteJob, createJob } = require('../controllers/jobs')
const router = express.router()

router.route('/').get(getAlljobs, getAJob)
router.route('/:id').post(updateJob, deleteJob, createJob)