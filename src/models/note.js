const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'   
  }, 
  sharedWith: [{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Note = mongoose.model('Note', noteSchema)
module.exports = Note