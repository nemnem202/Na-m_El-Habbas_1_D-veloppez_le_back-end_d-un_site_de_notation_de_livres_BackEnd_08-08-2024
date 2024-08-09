const books = require('../models/books')

exports.CreerBook = (req, res)=>{

    delete req.body._id

    const book = new books({
        ...req.body
    })

    books.save()
        .then(()=> res.status(201).json({message:'objet rec'}))
        .catch(error => res.status(400).json({error}))
}

exports.RecupererBooks = (req,res)=>{
    books.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({error}))
}