import express from 'express';
import cors from 'cors';
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Allow cookies
}));
app.use(cookieParser());
app.use(express.json());

// Generate CSRF token
app.get('/api/csrf-token', (req, res) => {
  const token = crypto.randomBytes(32).toString('hex');
  res.cookie('csrf-token', token, {
    httpOnly: false, // Must be accessible to JavaScript
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });
  res.json({ csrfToken: token });
});

// Verify CSRF token middleware
function verifyCsrfToken(req, res, next) {
  const token = req.headers['x-csrf-token'];
  const cookieToken = req.cookies['csrf-token'];

  if (!token || !cookieToken || token !== cookieToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  next();
}

app.post('/login', verifyCsrfToken, (req, res) => {
  // Login logic here
  res.json({ token: 'test123' });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080'));
