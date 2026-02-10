// Initialize Express
const express = require('express');
const router = express.Router();

// Initialize dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Initialize database
const db = require('../db');

// Initialize token constants
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_EXPIRES = '1h';
const REFRESH_EXPIRES_SECONDS = 60 * 60 * 24 * 30; // 30 days

//
// Functions
//

// Authentication function
const authenticate = async (req, res, next) => {
  // Get token from Authorization header and verify existence.
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing token' });

  // Parse and verify token.
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const [rows] = await db.query(
      'SELECT id, username FROM users WHERE id = ?',
      [payload.sub]
    );

    // Handle errors and return to client.
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = user;
    next();

  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

//
// Endpoints
//

// Register endpoint
router.post('/register', async (req, res) => {
  // Recieve data and turn into variables
  const { username, email, password } = req.body;

  // Basic validation of recieved data
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // Hash password and store user in database. Handle errors and return to client.
  try {
    const hash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hash]
    );

    return res.json({ user: { id: result.insertId, username } });

  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Username or email already exists' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  // Recieve data and turn into variables
  const { username, password } = req.body;

  // Lookup data in database.
  const [rows] = await db.query(
    'SELECT id, username, password_hash FROM users WHERE username = ?',
    [username]
  );

  // Handle errors and return to client.
  const user = rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  // Create access token.
  const accessToken = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });

  // Create refresh token.
  const refreshToken = require('crypto').randomBytes(40).toString('hex');
  const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_SECONDS * 1000);

  // Store refresh token in database.
  await db.query(
    'INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES (?, ?, ?)',
    [refreshToken, user.id, expiresAt]
  );

  // Return tokens and user info to client.
  res.json({
    accessToken,
    refreshToken,
    user: { id: user.id, username: user.username }
  });
});

// Refresh endpoint
router.post('/refresh', async (req, res) => {
  // Recieve token and turn into variable.
  const { refreshToken } = req.body;

  // Handle errors and return to client.
  if (!refreshToken) return res.status(400).json({ error: 'Missing token' });

  // Lookup token in database.
  const [rows] = await db.query(
    'SELECT user_id, expires_at FROM refresh_tokens WHERE token = ?',
    [refreshToken]
  );

  // Parse token into const variable.
  const tokenRow = rows[0];

  // Handle errors and return to client.
  if (!tokenRow) return res.status(401).json({ error: 'Invalid refresh token' });

  if (new Date(tokenRow.expires_at) < new Date()) {
    return res.status(401).json({ error: 'Expired refresh token' });
  }

  // Create new access token from found refresh token.
  const accessToken = jwt.sign({ sub: tokenRow.user_id }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
  res.json({ accessToken });
});

// Verify endpoint
router.get('/verify', authenticate, (req, res) => {
  res.json({ user: req.user });
});


module.exports = router;
