const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db');

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
      res.send('Hello from our server!')
})

app.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
      }
  
      const password_hash = await bcrypt.hash(password, 10);
  
      const [result] = await pool.query(
        `INSERT INTO users (username, email, password_hash)
         VALUES (?, ?, ?)`,
        [username, email, password_hash]
      );
  
      // return the new user's ID
      res.status(201).json({ userId: result.insertId });
  
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Username or email already exists' });
      }
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
});
  

app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body || {};
      if (!username || !password) {
        return res.status(400).json({ message: 'Missing fields' });
      }
  
      const [rows] = await pool.query(
        'SELECT id, username, password_hash FROM users WHERE username = ?',
        [username]
      );
  
      if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
  
      const user = rows[0];
      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  
      return res.json({ userId: user.id });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.get('/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
  
      const [rows] = await pool.query(
        'SELECT id, username, email, first_name, last_name, weight, age, gender, created_at FROM users WHERE id = ?',
        [userId]
      );
  
      if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
  
      return res.json(rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  
app.listen(8080, () => {
    console.log('server listening on port 8080');
});
