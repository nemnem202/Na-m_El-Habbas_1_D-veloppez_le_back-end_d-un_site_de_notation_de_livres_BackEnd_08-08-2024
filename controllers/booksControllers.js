const books = require('../models/books')

exports.CreerBook = (req, res)=>{

    console.log('fonction CreerBook')

    try {
        const BookObject = JSON.parse(req.body.book)
        
        console.log('req.file.filename:',req.file.filename)

        delete BookObject.id
        delete BookObject._userId
    
        const Book = new books({
            ...BookObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
    
        Book.save()
        .then(() => {
            console.log('livre enregistré')
            res.status(201).json({ message: 'Objet enregistré !' })
        }
    )
        .catch(error => {
            console.log('erreur d\'enregistrement')
            res.status(400).json({error})})
    } 
    catch(error) {
        console.log('erreur de creation')
        res.status(400).json({error})
    }
    }


exports.RecupererBooks = (req,res)=>{
    books.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({error})) 
}

exports.RecupererSingleBook = (req, res) => {
    const bookId = req.params.id

    books.findById(bookId)
    .then(book => {
        if (!book) {
            return res.status(404).json({message:'Livre non trouvé'})
        }
        else {res.status(200).json(book)}
    })
    .catch(error => res.status(500).json({error}))
}