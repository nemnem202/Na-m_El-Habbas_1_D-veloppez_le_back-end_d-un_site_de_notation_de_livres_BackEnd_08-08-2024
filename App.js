const express = require('express')
const mongoose = require('mongoose')
const BooksRoutes = require('./routes/booksRoutes')


mongoose.connect('mongodb+srv://naimelhabbas:ZRiSmb22aR-J.Jy@cluster0.p5x96.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    { useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => {
        console.log('Connexion à MongoDB réussie !') 
    })
    .catch(() => {
        console.log('Connexion à MongoDB échouée !')
    })

const app = express()

app.use((express.json()))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')

    console.log('acces créés')
    next()
  })

app.use('/api',BooksRoutes)



module.exports = app 