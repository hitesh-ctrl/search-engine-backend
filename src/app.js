require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const documentRoutes = require('./api/document.routes')
const app = express();
const searchRoutes = require('./api/search.routes')
app.use(express.json());
app.use('/documents', documentRoutes)
app.use('/search', searchRoutes)
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected"))
    .catch(err => console.error(err))

app.get('/health',(req,res) => {
    res.json({status:'ok'})
})

module.exports = app;