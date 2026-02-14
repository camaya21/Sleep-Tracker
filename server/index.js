const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
      res.send('Hello from our server!')
})

app.post('/login', (req, res) => {
    const { username, password } = req.body || {};
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Missing username or password' });
    }
  
    // TODO: replace this with real auth (DB, etc.)
    if (username === 'admin' && password === 'pass') {
      return res.json({ token: 'abc123' });
    }
  
    return res.status(401).json({ message: 'Invalid credentials' });
  });
  
  app.listen(8080, () => {
    console.log('server listening on port 8080');
  });
