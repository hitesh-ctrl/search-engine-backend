const index = require('../models/index.model')
const {tokenize} = require('../utils/tokenizer.js')

const indexDocument = async(document) => {
    const text = `${document.title} ${document.content}`
    const tokens = tokenize(text)

    const frequencyMap = {};

    for (const token of tokens) {
        frequencyMap[token] = (frequencyMap[token] || 0) +1; 
    }

    for(const [term, frequency] of Object.entries(frequencyMap)){
        await index,updateOne(
            {term},
            {
                $push:{
                    postings:{
                        documentId:document._id,
                        frequency
                    }
                }
            },
            {upsert:true}
        )
    }
}

module.exports = {indexDocument};
