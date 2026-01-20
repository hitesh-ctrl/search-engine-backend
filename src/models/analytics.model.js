const mongoose = require('mongoose')

const analyticsSchema = new mongoose.Schema(
    {
        query:{
            type:String,
            required:true,
            unique:true,
            index:true
        },
        count:{
            type: Number,
            default: 1
        },
    },
    {
        timestamps:true
    }
    
)

module .exports = mongoose.model('Analytics',analyticsSchema)