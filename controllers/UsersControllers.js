const User = require("../models/Users");
const bcrypt = require("bcrypt");
const WebToken = require("jsonwebtoken");

exports.SignUp = (req, res, next) => {
  const secret = process.env.SECRET_KEY;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "Utilisateur créé !" });
        })
        .catch((error) => {
          if (error.code === 11000) {
            return res
              .status(409)
              .json({ message: "Cet email est déjà utilisé." });
          }
          return res.status(400).json({ error });
        });
    })
    .catch((error) => {
      console.error("Erreur lors du hashage du mot de passe:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la création de l'utilisateur." });
    });
};

exports.Login = (req, res, next) => {
  const secret = process.env.SECRET_KEY;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: "Paire id-mdp incorrecte" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({ message: "Paire id-mdp incorrecte" });
            } else {
              res.status(200).json({
                userId: user.id,
                token: WebToken.sign({ userId: user._id }, secret, {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => {
            console.log(secret);
            console.log("process.env", process.env.SECRET_KEY);
            console.log("erreur 500");
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
