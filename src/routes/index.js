require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const { registerController } = require('../controllers/registerController');
const { loginController } = require('../controllers/loginController');
const { getAllUsers } = require('../controllers/getAllUsers');
const { verifyAuth } = require('../middlewares/verifyAuth');
const { getUser } = require('../controllers/getUser');
const { deleteUser } = require('../controllers/deleteUser');
const { updateUser } = require('../controllers/updateUser');

const PORT = process.env.API_PORT || 3000;

const app = express();

app.use(bodyParser.json())

app.post('/register', registerController);

app.post('/login', loginController);

app.get('/users', getAllUsers)

app.get('/users/:id', verifyAuth, getUser)

app.delete('/users/:id', verifyAuth, deleteUser)

app.put('/users/:id', verifyAuth, updateUser)

app.listen(3001, () => console.log('Servidor rodando na porta', PORT))

