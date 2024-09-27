const express = require("express");
const UsersController = require("../controllers/UsersControllers");
const Routeur = express.Router();
const auth = require("../middleware/auth");

Routeur.post("/signup", UsersController.SignUp);

Routeur.post("/login", UsersController.Login);

module.exports = Routeur;
