const express= require('express');
const routes= express.Router();
const mainController = require('../controllers/mainController');

routes.get('/', mainController.homepage);
routes.get('/about', mainController.about);

module.exports = routes;
