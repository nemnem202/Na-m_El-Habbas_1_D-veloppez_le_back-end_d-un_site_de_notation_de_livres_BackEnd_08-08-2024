const multer = require('multer')
const sharp = require('sharp')
const path = require ('path')
const fs = require('fs')


const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

const storage= multer.memoryStorage()

const upload = multer({storage}).single('image')

const resizeImage = async(buffer, filename) => {

    const outputPath = path.resolve('images', filename)
    await sharp(buffer)
    .resize(206, 260)
    .toFile(outputPath)
}

module.exports = (req, res, next) => {

    upload(req, res, async (err)=> {

        const name = req.file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[req.file.mimetype]
        const filename = name + Date.now() + '.' + extension

        try {
            await resizeImage(req.file.buffer, filename)
            req.file.filename = filename
            next()
            
        }
         catch (error) {

            res.status(500).json({ error: 'Erreur lors du redimensionnement de l\'image' });
        }
        
})

}

    



