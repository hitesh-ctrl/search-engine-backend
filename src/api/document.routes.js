const express = require('express');

const {createDocument} = require('../services/document.services')

const router = express.Router()

router.post('/',async (req,res)=>{
    const {title,content} = req.body;

    if(!title || !content){
        return res.status(400).json({
            error: 'title and content are required'
        })
    }

    try {
        const document = await createDocument({title, content})

        res.status(201).json({
            id:document._id,
            title: document.title,
            createdAt: document.createdAt

        })

    }catch(err){
        console.error(err)
        res.status(500).json({error: 'internal server error'})
    }
})

module.exports = router;