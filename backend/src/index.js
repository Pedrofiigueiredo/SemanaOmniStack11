// Importa o módulo express para dentro da váriável 'express'
const express = require('express');

const cors = require('cors');

// Importa o arquivo de rotas para a váriável 'routes'
const routes = require('./routes');

// Define a variável app com o express
const app = express();

app.use(cors({
   // origin: 'http://meuapp.com'
}));

// Faz o Json (para receber novos dados) algo entendível no JS
app.use(express.json());
app.use(routes);
  

app.listen(3333);