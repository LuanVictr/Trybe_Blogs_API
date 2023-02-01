require('dotenv').config();
const app = require('./app');
const loginController = require('./controllers/login.controller');
const userController = require('./controllers/user.controller');
const authenticate = require('./middleware/auth.middleware');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', loginController.getLogin);

app.post('/user', userController.createUser);

app.get('/user', authenticate, userController.getAllUsers);

app.get('/user/:id', authenticate, userController.getUserById);

app.listen(port, () => console.log('ouvindo porta', port));
