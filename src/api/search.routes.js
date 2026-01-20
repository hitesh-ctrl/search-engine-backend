const express = require('express')
const {search} = require('../services/search.services')
const {trackSearchQuery} = require('../services/analytics.services')
const router = express.Router()

router.get('/',async(req,res)=>{
    const {q, page = 1, limit = 10} = req.query
    const pageNum = Math.max(parseInt(page), 1)
    const limitNum = Math.min(parseInt(limit), 50)

    if(!q){
        return res.status(400).json({error:'query parameter q is required'})
    }

    try{
        const {totalResults, results} = await search(q, pageNum, limitNum)

        trackSearchQuery(q)

        res.json({query: q,
            page: pageNum,
            limit: limitNum,
            totalResults,
            results
        })

    }catch(err){
        console.error(err)
        res.status(500).json({error:'internal server error'})
    }
})

module.exports = router