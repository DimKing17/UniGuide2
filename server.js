const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');

const db = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ── JWT helpers ──────────────────────────────────────────────────
function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }
}

// ── POST /api/auth/signup ────────────────────────────────────────
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, displayName, grade, province, city, distancePref,
            institution, yearOfStudy, major, ethnicity } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    const emailLower = email.toLowerCase().trim();
    const existing = await db.query('SELECT id FROM ug_users WHERE email = $1', [emailLower]);
    if (existing.rows.length) return res.status(409).json({ error: 'An account with this email already exists.' });

    const hash = await bcrypt.hash(password, 12);
    const result = await db.query(
      `INSERT INTO ug_users (email, password_hash, display_name, grade, province, city, distance_pref, institution, year_of_study, major, ethnicity)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id, email, display_name`,
      [emailLower, hash, displayName || emailLower.split('@')[0], grade || null, province || null,
       city || null, distancePref || null, institution || null, yearOfStudy || null, major || null, ethnicity || null]
    );
    const user = result.rows[0];
    const token = signToken(user.id);
    res.json({ token, user: { id: user.id, email: user.email, displayName: user.display_name } });
  } catch (e) {
    console.error('Signup error:', e.message);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// ── POST /api/auth/login ─────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const emailLower = email.toLowerCase().trim();
    const result = await db.query('SELECT * FROM ug_users WHERE email = $1', [emailLower]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'No account found with this email.' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Incorrect password. Try again or reset it.' });

    const token = signToken(user.id);
    res.json({ token, user: { id: user.id, email: user.email, displayName: user.display_name } });
  } catch (e) {
    console.error('Login error:', e.message);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// ── GET /api/auth/me ─────────────────────────────────────────────
app.get('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, email, display_name, grade, province, city, distance_pref,
              institution, year_of_study, major, ethnicity, created_at
       FROM ug_users WHERE id = $1`,
      [req.userId]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'User not found' });
    const u = result.rows[0];
    res.json({
      id: u.id, email: u.email, displayName: u.display_name,
      grade: u.grade, province: u.province, city: u.city,
      distancePref: u.distance_pref, institution: u.institution,
      yearOfStudy: u.year_of_study, major: u.major, ethnicity: u.ethnicity,
      createdAt: u.created_at
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PUT /api/auth/profile ────────────────────────────────────────
app.put('/api/auth/profile', requireAuth, async (req, res) => {
  try {
    const { displayName, grade, province, city, distancePref, institution, yearOfStudy, major, ethnicity } = req.body;
    await db.query(
      `UPDATE ug_users SET display_name=$1, grade=$2, province=$3, city=$4, distance_pref=$5,
       institution=$6, year_of_study=$7, major=$8, ethnicity=$9, updated_at=NOW()
       WHERE id=$10`,
      [displayName || null, grade || null, province || null, city || null, distancePref || null,
       institution || null, yearOfStudy || null, major || null, ethnicity || null, req.userId]
    );
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── POST /api/auth/reset-request ────────────────────────────────
app.post('/api/auth/reset-request', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const emailLower = email.toLowerCase().trim();
    const result = await db.query('SELECT id FROM ug_users WHERE email = $1', [emailLower]);
    if (!result.rows.length) {
      return res.json({ success: true, message: 'If that email is registered, a reset link has been sent.' });
    }
    const userId = result.rows[0].id;
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000);

    await db.query('DELETE FROM ug_reset_tokens WHERE user_id=$1', [userId]);
    await db.query(
      'INSERT INTO ug_reset_tokens (user_id, token, expires_at) VALUES ($1,$2,$3)',
      [userId, token, expiresAt]
    );

    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password.html?token=${token}`;
    res.json({ success: true, resetUrl, message: 'Reset link generated. Use the link below to set a new password.' });
  } catch (e) {
    console.error('Reset request error:', e.message);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// ── POST /api/auth/reset-confirm ────────────────────────────────
app.post('/api/auth/reset-confirm', async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ error: 'Token and new password are required.' });
    if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    const result = await db.query(
      'SELECT * FROM ug_reset_tokens WHERE token=$1 AND used=FALSE AND expires_at > NOW()',
      [token]
    );
    if (!result.rows.length) return res.status(400).json({ error: 'Reset link is invalid or has expired.' });

    const { user_id } = result.rows[0];
    const hash = await bcrypt.hash(password, 12);
    await db.query('UPDATE ug_users SET password_hash=$1, updated_at=NOW() WHERE id=$2', [hash, user_id]);
    await db.query('UPDATE ug_reset_tokens SET used=TRUE WHERE token=$1', [token]);

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// ── GET /api/data/:key ───────────────────────────────────────────
app.get('/api/data/:key', requireAuth, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT data_value FROM ug_user_data WHERE user_id=$1 AND data_key=$2',
      [req.userId, req.params.key]
    );
    if (!result.rows.length) return res.json({ value: null });
    res.json({ value: JSON.parse(result.rows[0].data_value) });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PUT /api/data/:key ───────────────────────────────────────────
app.put('/api/data/:key', requireAuth, async (req, res) => {
  try {
    const { value } = req.body;
    await db.query(
      `INSERT INTO ug_user_data (user_id, data_key, data_value, updated_at)
       VALUES ($1,$2,$3,NOW())
       ON CONFLICT (user_id, data_key) DO UPDATE SET data_value=$3, updated_at=NOW()`,
      [req.userId, req.params.key, JSON.stringify(value)]
    );
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── DELETE /api/data/:key ────────────────────────────────────────
app.delete('/api/data/:key', requireAuth, async (req, res) => {
  try {
    await db.query('DELETE FROM ug_user_data WHERE user_id=$1 AND data_key=$2', [req.userId, req.params.key]);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ── Serve index for all unknown routes ───────────────────────────
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, req.path === '/' ? 'index.html' : req.path), err => {
      if (err) res.sendFile(path.join(__dirname, 'index.html'));
    });
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.listen(PORT, '0.0.0.0', () => console.log(`UniGuide server running on port ${PORT}`));
