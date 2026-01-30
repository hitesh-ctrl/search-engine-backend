const mongoose = require("mongoose")

const documentSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required: true,
            trim: true,
        },
        content:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Document', documentSchema)