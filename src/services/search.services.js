const Index = require('../models/index.model')
const Document = require('../models/document.model')
const {tokenize} = require('../utils/tokenizer')
const {paginate} = require('../utils/pagination')
const search = async(query,page = 1, limit = 10) => {
    const terms = tokenize(query)

    if (terms.length == 0)
        return[]

    const scoreMap = {}

    for( const term of terms){
        const indexEntry = await Index.findOne({term})
        if(!indexEntry)
            continue
        for (const posting of indexEntry.postings){
            const docId = posting.documentId.toString()
            scoreMap[docId] = (scoreMap[docId] || 0 ) + posting.frequency
        }
    }
    const sortedResults = Object.entries(scoreMap).sort((a,b) => b[1] - a[1])

    const totalResults = sortedResults.length

    const paginatedResults = paginate(sortedResults, page, limit)

    const documentIds = paginatedResults.map(([docId])=>docId)

    const documents = await Document.find({
        _id:{$in:documentIds}
    })

    const documentMap = {}
    for(const doc of documents){
        documentMap[doc._id.toString()] = doc
    }

    const results =  paginatedResults.map(([docId,score]) => {
        const doc = documentMap[docId].title;
        if(!doc) return null;
        return {
        id: docId,
        title: documentMap[docId].title,
        score
        }
}).filter(Boolean)

    return {totalResults, results}
}

module.exports = {search}