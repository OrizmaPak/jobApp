const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    maxlength: 50,
    required: [true, 'please provide company']
  },
  position: {
    type: String,
    maxlength: 40,
    required: true
  },
  status: {
    type: String,
    enum: ['interview', 'decline', 'pending'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    require: [true, 'please provide user']
  }
},
{
  timestamps: true
}
)

module.exports = mongoose.model('Jobs', JobSchema)