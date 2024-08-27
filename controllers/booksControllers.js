const { copy } = require('../App')
const books = require('../models/books')

exports.CreerBook = (req, res)=>{

    try {
        const BookObject = JSON.parse(req.body.book)

        delete BookObject.id
        delete BookObject._userId
    
        const Book = new books({
            ...BookObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
    
        Book.save()
        .then(() => {

            res.status(201).json({ message: 'Objet enregistré !' }) 
        }
    )
        .catch(error => {

            res.status(400).json({error})})
    } 
    catch(error) {
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

exports.ModifierBook = (req, res) => {

    const bookId = req.params.id

    const updatedBook = { ...req.body }

    books.findById(bookId)
    .then(book => {
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' })
        }
        if (book.userId !== req.auth.userId) {
            return res.status(403).json({ message: 'Requête non autorisée' })
        }
        books.updateOne({ _id: bookId }, { ...updatedBook, _id: bookId })
            .then(() => 
            {
                res.status(200).json({ message: 'Livre supprimé avec succès' })
            })
            .catch(error => {
                res.status(400).json({ error })
            })
    })
    .catch(error => {
        res.status(500).json({ error })
    })
    
}

exports.SupprimerBook = (req, res) => {

    const bookId = req.params.id

    books.findById(bookId)
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: 'Livre non trouvé' })
            }
            if (book.userId !== req.auth.userId) {
                return res.status(403).json({ message: 'Requête non autorisée' })
            }


            books.deleteOne({ _id: bookId })
                .then(() => 
                {
                    res.status(200).json({ message: 'Livre supprimé avec succès' })
                })
                .catch(error => {
                    res.status(400).json({ error })
                })
        })
        .catch(error => {
            res.status(500).json({ error })
        })
}

exports.MieuxNotes = (req, res) => {

    books.find()
        .sort({ averageRating: -1 })
        .limit(3)
        .then(books => {
            res.status(200).json(books)
        })
        .catch(error => {
            res.status(500).json({ error })
        })
};

exports.MettreUneNote = (req, res) => {

    const note = req.body.rating
    
    const userId = req.auth.userId

    const bookId = req.params.id

    books.findById(bookId)
    .then(book => {
        
        const existingRating = book.ratings.find(rating => rating.userId === userId)

        if (existingRating) {

            existingRating.grade = note;
        } else {
            book.ratings.push({ userId, grade: note })
        }

        const totalRatings = book.ratings.length;
        const averageRating = book.ratings.reduce((sum, rating) => sum + rating.grade, 0) / totalRatings;

        book.averageRating = averageRating;

        return book.save()
    })

}