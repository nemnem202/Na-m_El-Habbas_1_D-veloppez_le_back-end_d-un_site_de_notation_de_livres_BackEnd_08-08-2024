const User = require('../models/Users')
const bcrypt = require('bcrypt')
const WebToken = require('jsonwebtoken')

exports.SignUp = (req,res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash=>{
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(()=> 
        {
            console.log('Utilisateur créé !')
            res.status(201).json({message:'Utilisateur créé !'})
        }
    )
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => {
        console.log('erreur de création')
        res.status(500).json({message:'Erreur'})
    })
}

exports.Login = (req,res,next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user === null) {
            res.status(401).json({message: 'Paire id-mdp incorrecte'})
        }
        else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {

                    res.status(401).json({message: 'Paire id-mdp incorrecte'})
                }
                else {
                    console.log('vous etes connecté !')
                    res.status(200).json({
                        userId: user.id,
                        token: WebToken.sign(
                            { userId: user._id },
                            'Random_Token',
                            { expiresIn: '24h'}
                        )
                    })
                }
            })
            .catch(error => {
                res.status(500).json({error})
            })
        }
    })
    .catch(error => {
        console.log('probleme dans la base de données')
        res.status(500).json({error})
    })
}