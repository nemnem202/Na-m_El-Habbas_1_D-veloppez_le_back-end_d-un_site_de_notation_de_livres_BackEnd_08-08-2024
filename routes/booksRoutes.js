const express = require('express')
const booksController = require('../controllers/booksControllers')
const Routeur = express.Router()
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')


Routeur.post('/books', auth, multer, booksController.CreerBook) 

Routeur.get('/books', booksController.RecupererBooks)

Routeur.get('/books/:id', booksController.RecupererSingleBook)

module.exports = Routeur  