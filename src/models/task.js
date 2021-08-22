const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        minlength:10
    },
    completed: {
        type: Boolean,
        default: false
    },
    title:{
        type:String,
        trim:true,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task