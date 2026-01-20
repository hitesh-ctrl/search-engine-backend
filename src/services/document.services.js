const Document = require('../models/document.model.js');
const {indexDocument} = require('./index.services.js')

const createDocument = async ({title,content}) => {
    const document = new Document({title,content})
    await document.save()

    await indexDocument(document)

    return document

}

module.exports = { createDocument}