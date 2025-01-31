const express= require('express');
const routes= express.Router();
const { isLoggedIn } = require('../middleware/cheackAuth');
const homescreenController = require('../controllers/homescreenController');


routes.get('/homescreen',isLoggedIn, homescreenController.homescreen);


routes.get('/homescreen/item/:id', isLoggedIn, homescreenController.homescreenViewJournal);
routes.post('/homescreen/item/:id', isLoggedIn, homescreenController.homescreenUpdateJournal);
routes.post('/homescreen/item-delete/:id', isLoggedIn, homescreenController.homescreenDeleteJournal);
routes.get('/homescreen/add', isLoggedIn, homescreenController.homescreenAddJournal);
routes.post('/homescreen/add', isLoggedIn, homescreenController.homescreenAddJournalSubmit);
routes.get('/homescreen/search', isLoggedIn, homescreenController.homescreenSearch);
routes.post('/homescreen/search', isLoggedIn, homescreenController.homescreenSearchSubmit);





module.exports = routes;
