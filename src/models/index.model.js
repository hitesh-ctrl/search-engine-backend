const mongoose = require('mongoose')

const postingSchema = new mongoose.Schema({
    documentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true
    },
        frequency: {
            type:Number,
            required: true,
            min: 1

        }
    },
    {_id: false}
)

const indexSchema = new mongoose.Schema({
    term:{
        type: String,
        required: true,
        unique: true
    },
    postings:{
        type:[postingSchema],
        default: []
    }
    }
)

module.exports = mongoose.model('index', indexSchema)