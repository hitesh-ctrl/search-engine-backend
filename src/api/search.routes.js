const express = require('express')
const {search} = require('../services/search.services')
const {trackSearchQuery} = require('../services/analytics.services')
const router = express.Router()

router.get('/',async(req,res)=>{
    const rawQuery = req.query.q;
    const pageNum = req.query.page ?? 1;
    const limitNum = req.query.limit ?? 10;
    if(!rawQuery){
        return res.status(400).json({error:'query parameter q is required'})
    }
    const q = rawQuery.trim().toLowerCase()
    try{
        const {totalResults, results} = await search(q, pageNum, limitNum)

        trackSearchQuery(q)

        res.json({query: q,
            page: pageNum,
            limit: limitNum,
            totalResults,
        })

    }catch(err){
        console.error(err)
        res.status(500).json({error:'internal server error'})
    }
})

module.exports = router