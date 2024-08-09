const express = require('express')
const booksController = require('../controllers/booksControllers')
const Routeur = express.Router()


Routeur.post('/books', booksController.CreerBook) 

Routeur.get('/books', booksController.RecupererBooks)

module.exports = Routeur