const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: "Name is required",
        minLength: [2,'Too short'],
        maxLength: [32, 'To long']
    },
    slug:{
        type: String,
        unique: true,
        lowercase: true,
        index: true
    }
},
    { timestamps: true }
    )

module.exports = mongoose.model('Categories', categorySchema)