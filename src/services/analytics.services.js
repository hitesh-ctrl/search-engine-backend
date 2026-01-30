
const Analytics = require('../models/analytics.model')

const trackSearchQuery = async(query) =>{
    if(!query)
        return
    try{
        await Analytics.updateOne(
            {query},
            {$inc:{count:1}},
            {upsert:true}
        )
    }catch(err){
        console.error('Analytics tracking failed', err.message)
    }
}

module.exports = {trackSearchQuery}