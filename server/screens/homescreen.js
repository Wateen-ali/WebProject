const express= require('express');
const routes= express.Router();
const { isLoggedIn } = require('../middleware/cheackAuth');
const homescreenController = require('../controllers/homescreenController');

routes.get('/homescreen',isLoggedIn, homescreenController.homescreen);
module.exports = routes;