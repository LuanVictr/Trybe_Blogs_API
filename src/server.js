require('dotenv').config();
const app = require('./app');
const loginController = require('./controllers/login.controller');
const userController = require('./controllers/user.controller');
const authenticate = require('./middleware/auth.middleware');
const categoriesController = require('./controllers/categories.controller');

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

app.post('/categories', authenticate, categoriesController.createCategory);

app.get('/categories', authenticate, categoriesController.getCategories);

app.listen(port, () => console.log('ouvindo porta', port));
