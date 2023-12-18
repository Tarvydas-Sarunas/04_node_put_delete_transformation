const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 3000;

// DATA
let users = [
  {
    id: 1, name: 'Serbentautas', town: 'Vilnius', isDeleted: false,
  },
  {
    id: 2, name: 'Lenteja', town: 'Kaunas', isDeleted: false,
  },
  {
    id: 3, name: 'James', town: 'London', isDeleted: false,
  },
];

// Middleware
app.use(morgan('dev'));
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET /api/users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Get /api/users/1 - get one user
app.get('/api/users/:userId', (req, res) => {
  const userId = +req.params.userId;
  // surasti obj su id === userId
  const found = users.find((uObj) => uObj.id === userId);
  res.json(found);
});

// DELETE /api/users/1 - delete user
app.delete('/api/users/:userId', (req, res) => {
  // atfiltruoti user ir grazinti viska issyrus ta kurio id === userId
  const userId = +req.params.userId;
  users = users.filter((uObj) => uObj.id !== userId);
  // surasti obj su id === userId
  res.json(users);
});

// Run the server
app.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});
