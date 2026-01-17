const express = require('express')
const {search} = require('../services/search.services')

const router = express.Router()

router.get('/',async(req,res)=>{
    const {q} = req.query

    if(!q){
        return res.status(400).json({error:'query parameter q is required'})
    }

    try{
        const reults = await search(q)
        res.json({reults})

    }catch(err){
        console.error(err)
        res.status(500).json({error:'internal server error'})
    }
})

module.exports = router