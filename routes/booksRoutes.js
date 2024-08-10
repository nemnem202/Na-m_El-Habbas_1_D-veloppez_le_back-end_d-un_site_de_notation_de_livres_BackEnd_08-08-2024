const express = require('express')
const booksController = require('../controllers/booksControllers')
const Routeur = express.Router()
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')


Routeur.post('/books', auth, multer, booksController.CreerBook) 

Routeur.get('/books', booksController.RecupererBooks)

Routeur.get('/books/:id', booksController.RecupererSingleBook)

Routeur.put('/books/:id', auth, booksController.ModifierBook)

Routeur.delete('/books/:id', auth, booksController.SupprimerBook)

module.exports = Routeur  