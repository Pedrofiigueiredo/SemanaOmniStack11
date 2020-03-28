const express = require('express');
const routes = express.Router();

const OngControler = require('./controllers/OngControler');
const IncidentsControler = require('./controllers/IncidentsControler');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// Login
routes.post('/sessions', SessionController.create);

// Controle de ONGs (adicionar, listar todas e deletar)
routes.get('/ongs', OngControler.index);
routes.post('/ongs', OngControler.create);
routes.delete('/ongs/:id', OngControler.delete);

// Listar casos específicos de uma ONG
routes.get('/profile', ProfileController.index);

// Controle de casos (adicionar, listar todos e deletar)
routes.get('/incidents', IncidentsControler.index);
routes.post('/incidents', IncidentsControler.create);
routes.delete('/incidents/:id', IncidentsControler.delete);


module.exports = routes;

