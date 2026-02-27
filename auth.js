// ═══════════════════════════════════════════════════════════════
//  UniGuide — Auth & Cloud Data Layer
//  Firebase Authentication + Firestore + localStorage fallback
// ═══════════════════════════════════════════════════════════════

// ┌──────────────────────────────────────────────────────────────┐
// │  FIREBASE CONFIG — PASTE YOUR VALUES HERE                    │
// │                                                              │
// │  1. Go to https://firebase.google.com → create a project     │
// │  2. Enable Authentication → Email/Password                   │
// │  3. Enable Firestore → start in test mode                    │
// │  4. Project Settings → Your apps → Web (</>)                 │
// │  5. Copy the config values below                             │
// └──────────────────────────────────────────────────────────────┘
const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY_HERE",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// ── Firebase SDK (loaded dynamically from CDN) ─────────────────
let _fb = null;       // firebase app
let _auth = null;     // firebase auth instance
let _db = null;       // firestore instance
let _user = null;     // current user object
let _ready = false;   // true once auth state is resolved
let _readyCallbacks = [];

function _onReady(cb) {
  if (_ready) cb();
  else _readyCallbacks.push(cb);
}

// Load Firebase SDK modules from CDN
(function loadFirebase() {
  const ver = '10.12.0';
  const base = `https://www.gstatic.com/firebasejs/${ver}`;
  const mods = ['firebase-app-compat.js','firebase-auth-compat.js','firebase-firestore-compat.js'];
  let loaded = 0;
  mods.forEach((mod, i) => {
    const s = document.createElement('script');
    s.src = `${base}/${mod}`;
    s.onload = () => {
      loaded++;
      if (loaded === mods.length) _initFirebase();
    };
    s.onerror = () => console.warn('UniGuide: Failed to load Firebase module', mod);
    document.head.appendChild(s);
  });
})();

function _initFirebase() {
  try {
    if (FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY_HERE') {
      console.warn('UniGuide: Firebase not configured — running in localStorage-only mode.');
      _ready = true;
      _readyCallbacks.forEach(cb => cb());
      _readyCallbacks = [];
      _updateNavUI();
      return;
    }
    _fb = firebase.initializeApp(FIREBASE_CONFIG);
    _auth = firebase.auth();
    _db = firebase.firestore();
    // Enable offline persistence
    _db.enablePersistence({ synchronizeTabs: true }).catch(() => {});
    _auth.onAuthStateChanged(user => {
      _user = user || null;
      _ready = true;
      _readyCallbacks.forEach(cb => cb());
      _readyCallbacks = [];
      _updateNavUI();
      // On first login, migrate localStorage to Firestore
      if (_user) _migrateLocalToCloud();
    });
  } catch(e) {
    console.warn('UniGuide: Firebase init failed —', e.message);
    _ready = true;
    _readyCallbacks.forEach(cb => cb());
    _readyCallbacks = [];
    _updateNavUI();
  }
}

// ── Auth Functions ─────────────────────────────────────────────

async function ugSignUp(email, password, displayName) {
  if (!_auth) throw new Error('Firebase not configured');
  const cred = await _auth.createUserWithEmailAndPassword(email, password);
  await cred.user.updateProfile({ displayName });
  // Create Firestore profile doc
  await _db.collection('users').doc(cred.user.uid).set({
    displayName,
    email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
  return cred.user;
}

async function ugLogIn(email, password) {
  if (!_auth) throw new Error('Firebase not configured');
  const cred = await _auth.signInWithEmailAndPassword(email, password);
  return cred.user;
}

async function ugLogOut() {
  if (!_auth) return;
  await _auth.signOut();
  _user = null;
  _updateNavUI();
}

async function ugResetPassword(email) {
  if (!_auth) throw new Error('Firebase not configured');
  await _auth.sendPasswordResetEmail(email);
}

function ugCurrentUser() {
  return _user;
}

function ugIsLoggedIn() {
  return !!_user;
}

function ugIsConfigured() {
  return FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY_HERE';
}

// ── Dual-Mode Data Layer ───────────────────────────────────────
// ugSave / ugLoad transparently use Firestore (logged in) or localStorage (guest)

async function ugSave(key, data) {
  // Always save to localStorage as cache
  try { localStorage.setItem(key, JSON.stringify(data)); } catch(e) {}
  // If logged in, also save to Firestore
  if (_user && _db) {
    try {
      await _db.collection('users').doc(_user.uid)
        .collection('data').doc(key)
        .set({ value: JSON.stringify(data), updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    } catch(e) { console.warn('ugSave Firestore error:', e.message); }
  }
}

async function ugLoad(key, fallback) {
  // If logged in, try Firestore first
  if (_user && _db) {
    try {
      const doc = await _db.collection('users').doc(_user.uid)
        .collection('data').doc(key).get();
      if (doc.exists) {
        const val = JSON.parse(doc.data().value);
        // Also update localStorage cache
        try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
        return val;
      }
    } catch(e) { console.warn('ugLoad Firestore error:', e.message); }
  }
  // Fall back to localStorage
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) return JSON.parse(raw);
  } catch(e) {}
  return fallback !== undefined ? fallback : null;
}

async function ugRemove(key) {
  try { localStorage.removeItem(key); } catch(e) {}
  if (_user && _db) {
    try {
      await _db.collection('users').doc(_user.uid)
        .collection('data').doc(key).delete();
    } catch(e) {}
  }
}

// ── One-time localStorage → Firestore migration ───────────────
async function _migrateLocalToCloud() {
  if (!_user || !_db) return;
  const migKey = 'ug_migrated_' + _user.uid;
  if (localStorage.getItem(migKey)) return; // already migrated
  const keys = ['savedPrograms','ugProfile','selectedMajors','essay_index'];
  // Also find dynamic keys
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && (k.startsWith('essay_') || k.startsWith('cl_') || k.startsWith('mc_'))) {
      if (!keys.includes(k)) keys.push(k);
    }
  }
  for (const key of keys) {
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        await _db.collection('users').doc(_user.uid)
          .collection('data').doc(key)
          .set({ value: raw, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
      } catch(e) {}
    }
  }
  localStorage.setItem(migKey, '1');
}

// ── Nav UI Updates ─────────────────────────────────────────────
function _updateNavUI() {
  const loggedOut = document.getElementById('nav-logged-out');
  const loggedIn = document.getElementById('nav-logged-in');
  const userName = document.getElementById('nav-user-name');
  if (!loggedOut || !loggedIn) return;
  if (_user) {
    loggedOut.style.display = 'none';
    loggedIn.style.display = 'flex';
    if (userName) userName.textContent = _user.displayName || _user.email.split('@')[0];
  } else {
    loggedOut.style.display = 'flex';
    loggedIn.style.display = 'none';
  }
}

// ── Auth Modal ─────────────────────────────────────────────────
function ugOpenAuth(tab) {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  _switchAuthTab(tab || 'login');
  // Clear previous errors/messages
  document.getElementById('authError').textContent = '';
  document.getElementById('authSuccess').textContent = '';
}

function ugCloseAuth() {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function _switchAuthTab(tab) {
  ['login','signup','reset'].forEach(t => {
    const panel = document.getElementById('auth-panel-' + t);
    const btn = document.getElementById('auth-tab-' + t);
    if (panel) panel.style.display = t === tab ? 'block' : 'none';
    if (btn) btn.classList.toggle('active', t === tab);
  });
}

async function _handleSignup(e) {
  e.preventDefault();
  const errEl = document.getElementById('authError');
  const succEl = document.getElementById('authSuccess');
  const btn = document.getElementById('auth-signup-btn');
  errEl.textContent = ''; succEl.textContent = '';
  const name = document.getElementById('auth-signup-name').value.trim();
  const email = document.getElementById('auth-signup-email').value.trim();
  const pass = document.getElementById('auth-signup-pass').value;
  if (!name || !email || !pass) { errEl.textContent = 'Please fill in all fields.'; return; }
  if (pass.length < 6) { errEl.textContent = 'Password must be at least 6 characters.'; return; }
  btn.disabled = true; btn.textContent = 'Creating account...';
  try {
    await ugSignUp(email, pass, name);
    succEl.textContent = 'Account created! Welcome, ' + name + '.';
    setTimeout(() => ugCloseAuth(), 1200);
  } catch(err) {
    errEl.textContent = _friendlyError(err.code);
  }
  btn.disabled = false; btn.textContent = 'Create Account';
}

async function _handleLogin(e) {
  e.preventDefault();
  const errEl = document.getElementById('authError');
  const succEl = document.getElementById('authSuccess');
  const btn = document.getElementById('auth-login-btn');
  errEl.textContent = ''; succEl.textContent = '';
  const email = document.getElementById('auth-login-email').value.trim();
  const pass = document.getElementById('auth-login-pass').value;
  if (!email || !pass) { errEl.textContent = 'Please enter email and password.'; return; }
  btn.disabled = true; btn.textContent = 'Signing in...';
  try {
    await ugLogIn(email, pass);
    succEl.textContent = 'Signed in!';
    setTimeout(() => { ugCloseAuth(); window.location.reload(); }, 800);
  } catch(err) {
    errEl.textContent = _friendlyError(err.code);
  }
  btn.disabled = false; btn.textContent = 'Sign In';
}

async function _handleReset(e) {
  e.preventDefault();
  const errEl = document.getElementById('authError');
  const succEl = document.getElementById('authSuccess');
  errEl.textContent = ''; succEl.textContent = '';
  const email = document.getElementById('auth-reset-email').value.trim();
  if (!email) { errEl.textContent = 'Please enter your email.'; return; }
  try {
    await ugResetPassword(email);
    succEl.textContent = 'Password reset email sent! Check your inbox.';
  } catch(err) {
    errEl.textContent = _friendlyError(err.code);
  }
}

function _friendlyError(code) {
  const map = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Try again or reset it.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}

// ── Inject Auth Modal HTML ─────────────────────────────────────
(function injectAuthModal() {
  if (document.getElementById('authModal')) return;
  const div = document.createElement('div');
  div.innerHTML = `
  <div id="authModal" class="auth-modal-overlay" style="display:none;" onclick="if(event.target===this)ugCloseAuth()">
    <div class="auth-modal">
      <button class="auth-close" onclick="ugCloseAuth()">&times;</button>
      <div class="auth-logo">Uni<span>Guide</span> 🍁</div>
      <div class="auth-tabs">
        <button id="auth-tab-login" class="auth-tab active" onclick="_switchAuthTab('login')">Sign In</button>
        <button id="auth-tab-signup" class="auth-tab" onclick="_switchAuthTab('signup')">Sign Up</button>
        <button id="auth-tab-reset" class="auth-tab" onclick="_switchAuthTab('reset')">Reset</button>
      </div>
      <div id="authError" class="auth-error"></div>
      <div id="authSuccess" class="auth-success"></div>

      <!-- SIGN IN -->
      <div id="auth-panel-login">
        <form onsubmit="_handleLogin(event)">
          <label class="auth-label">Email</label>
          <input type="email" id="auth-login-email" class="auth-input" placeholder="you@example.com" autocomplete="email" required/>
          <label class="auth-label">Password</label>
          <input type="password" id="auth-login-pass" class="auth-input" placeholder="Your password" autocomplete="current-password" required/>
          <button type="submit" id="auth-login-btn" class="auth-btn">Sign In</button>
        </form>
        <p class="auth-footer">Don't have an account? <a href="#" onclick="_switchAuthTab('signup');return false;">Sign up</a> · <a href="#" onclick="_switchAuthTab('reset');return false;">Forgot password?</a></p>
      </div>

      <!-- SIGN UP -->
      <div id="auth-panel-signup" style="display:none;">
        <form onsubmit="_handleSignup(event)">
          <label class="auth-label">Full Name</label>
          <input type="text" id="auth-signup-name" class="auth-input" placeholder="Your name" autocomplete="name" required/>
          <label class="auth-label">Email</label>
          <input type="email" id="auth-signup-email" class="auth-input" placeholder="you@example.com" autocomplete="email" required/>
          <label class="auth-label">Password</label>
          <input type="password" id="auth-signup-pass" class="auth-input" placeholder="At least 6 characters" autocomplete="new-password" required/>
          <button type="submit" id="auth-signup-btn" class="auth-btn">Create Account</button>
        </form>
        <p class="auth-footer">Already have an account? <a href="#" onclick="_switchAuthTab('login');return false;">Sign in</a></p>
      </div>

      <!-- RESET PASSWORD -->
      <div id="auth-panel-reset" style="display:none;">
        <form onsubmit="_handleReset(event)">
          <p class="auth-hint">Enter your email and we'll send you a password reset link.</p>
          <label class="auth-label">Email</label>
          <input type="email" id="auth-reset-email" class="auth-input" placeholder="you@example.com" autocomplete="email" required/>
          <button type="submit" class="auth-btn">Send Reset Link</button>
        </form>
        <p class="auth-footer"><a href="#" onclick="_switchAuthTab('login');return false;">Back to sign in</a></p>
      </div>
    </div>
  </div>`;
  document.body.appendChild(div.firstElementChild);
})();
