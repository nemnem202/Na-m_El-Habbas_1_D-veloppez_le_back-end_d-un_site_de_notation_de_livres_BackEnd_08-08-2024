const books = require('../models/books')

exports.CreerBook = (req, res)=>{

    const BookObject = JSON.parse(req.body.books)
    delete BookObject._id
    delete BookObject._userId

    const Book = new books({
        ...BookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    Book.save()
    .Then(()=>{res.satus(201).json({message:'objet rec'})})
    .catch(error => {res.status(400).json({error})})
}

exports.RecupererBooks = (req,res)=>{
    books.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({error})) 
}