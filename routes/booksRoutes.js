const express = require('express')
const booksController = require('../controllers/booksControllers')
const Routeur = express.Router()
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')


Routeur.post('/', auth, multer, booksController.CreerBook) 

Routeur.get('/', booksController.RecupererBooks)

Routeur.get('/bestrating', booksController.MieuxNotes)

Routeur.get('/:id', booksController.RecupererSingleBook)


Routeur.put('/:id', auth, booksController.ModifierBook)

Routeur.delete('/:id', auth, booksController.SupprimerBook)



module.exports = Routeur  