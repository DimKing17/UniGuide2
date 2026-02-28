// ═══════════════════════════════════════════════════════════════
//  UniGuide — Auth & Data Layer  (API-backed, no Firebase)
// ═══════════════════════════════════════════════════════════════

let _currentUser = null;    // { id, email, displayName, ... }
let _token = null;          // JWT stored in localStorage
let _ready = false;
let _readyCallbacks = [];

// ── Bootstrap ────────────────────────────────────────────────────
(async function bootstrap() {
  _token = localStorage.getItem('ug_token');
  if (_token) {
    try {
      const res = await _api('GET', '/api/auth/me');
      _currentUser = res;
    } catch (e) {
      // Invalid / expired token
      _token = null;
      localStorage.removeItem('ug_token');
    }
  }
  _ready = true;
  _readyCallbacks.forEach(cb => cb());
  _readyCallbacks = [];
  _updateNavUI();
})();

function _onReady(cb) {
  if (_ready) cb();
  else _readyCallbacks.push(cb);
}

// ── Internal fetch helper ────────────────────────────────────────
async function _api(method, path, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (_token) opts.headers['Authorization'] = 'Bearer ' + _token;
  if (body !== undefined) opts.body = JSON.stringify(body);
  const res = await fetch(path, opts);
  const data = await res.json();
  if (!res.ok) throw Object.assign(new Error(data.error || 'Server error'), { status: res.status, serverError: data.error });
  return data;
}

// ── Auth Functions ───────────────────────────────────────────────
async function ugSignUp(email, password, displayName, extras) {
  const data = await _api('POST', '/api/auth/signup', { email, password, displayName, ...extras });
  _token = data.token;
  _currentUser = data.user;
  localStorage.setItem('ug_token', _token);
  _updateNavUI();
  return data.user;
}

async function ugLogIn(email, password) {
  const data = await _api('POST', '/api/auth/login', { email, password });
  _token = data.token;
  _currentUser = data.user;
  localStorage.setItem('ug_token', _token);
  _updateNavUI();
  return data.user;
}

function ugLogOut() {
  _token = null;
  _currentUser = null;
  localStorage.removeItem('ug_token');
  _updateNavUI();
}

async function ugResetPassword(email) {
  const data = await _api('POST', '/api/auth/reset-request', { email });
  return data; // { success, resetUrl, message }
}

async function ugUpdateProfile(fields) {
  await _api('PUT', '/api/auth/profile', fields);
  if (_currentUser) Object.assign(_currentUser, fields);
}

function ugCurrentUser() { return _currentUser; }
function ugIsLoggedIn()  { return !!_currentUser; }
function ugIsConfigured() { return true; }

// ── Dual-Mode Data Layer ─────────────────────────────────────────
async function ugSave(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch(e) {}
  if (_currentUser && _token) {
    try { await _api('PUT', '/api/data/' + encodeURIComponent(key), { value: data }); } catch(e) {}
  }
}

async function ugLoad(key, fallback) {
  if (_currentUser && _token) {
    try {
      const res = await _api('GET', '/api/data/' + encodeURIComponent(key));
      if (res.value !== null && res.value !== undefined) {
        try { localStorage.setItem(key, JSON.stringify(res.value)); } catch(e) {}
        return res.value;
      }
    } catch(e) {}
  }
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) return JSON.parse(raw);
  } catch(e) {}
  return fallback !== undefined ? fallback : null;
}

async function ugRemove(key) {
  try { localStorage.removeItem(key); } catch(e) {}
  if (_currentUser && _token) {
    try { await _api('DELETE', '/api/data/' + encodeURIComponent(key)); } catch(e) {}
  }
}

// ── Nav UI ───────────────────────────────────────────────────────
function _updateNavUI() {
  const loggedOut = document.getElementById('nav-logged-out');
  const loggedIn  = document.getElementById('nav-logged-in');
  const userName  = document.getElementById('nav-user-name');
  const navAvatar = document.getElementById('nav-avatar');
  if (!loggedOut || !loggedIn) return;
  if (_currentUser) {
    loggedOut.style.display = 'none';
    loggedIn.style.display  = 'flex';
    const name = _currentUser.displayName || _currentUser.email.split('@')[0];
    if (userName) userName.textContent = name;
    if (navAvatar) navAvatar.textContent = name[0].toUpperCase();
  } else {
    loggedOut.style.display = 'flex';
    loggedIn.style.display  = 'none';
  }
}

// ── Friendly error messages ──────────────────────────────────────
function _friendlyError(serverMsg) {
  if (!serverMsg) return 'Something went wrong. Please try again.';
  return serverMsg;
}

// ── Auth Modal HTML ──────────────────────────────────────────────
(function injectAuthModal() {
  if (document.getElementById('authModal')) return;
  const el = document.createElement('div');
  el.innerHTML = `
<style>
.auth-modal-overlay {
  position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9000;
  display:none;align-items:center;justify-content:center;padding:16px;
}
.auth-modal-overlay.open { display:flex; }
.auth-modal {
  background:#fff;border-radius:18px;padding:32px 28px;
  width:100%;max-width:490px;max-height:90vh;overflow-y:auto;
  position:relative;box-shadow:0 16px 64px rgba(0,0,0,.25);
}
@media(max-width:500px){ .auth-modal { padding:24px 18px; border-radius:14px; } }
.auth-close {
  position:absolute;top:14px;right:16px;background:none;border:none;
  font-size:1.3rem;cursor:pointer;color:#666;line-height:1;
}
.auth-logo { font-size:1.2rem;font-weight:900;margin-bottom:16px;color:#1a2a4a; }
.auth-logo span { color:#e63946; }
.auth-tabs { display:flex;gap:6px;margin-bottom:20px;border-bottom:2px solid #e8edf5;padding-bottom:0; }
.auth-tab {
  flex:1;padding:9px 6px;font-size:.87rem;font-weight:700;cursor:pointer;
  background:none;border:none;color:#6b7280;border-bottom:3px solid transparent;
  margin-bottom:-2px;transition:all .15s;
}
.auth-tab.active { color:#1a2a4a;border-bottom-color:#e63946; }
.auth-error   { color:#dc2626;font-size:.85rem;margin-bottom:10px;min-height:18px;font-weight:600; }
.auth-success { color:#059669;font-size:.85rem;margin-bottom:10px;min-height:18px;font-weight:600; }
.auth-label   { display:block;font-size:.80rem;font-weight:700;color:#374151;margin-bottom:5px;margin-top:12px; }
.auth-label-opt { display:block;font-size:.80rem;font-weight:700;color:#374151;margin-bottom:4px;margin-top:12px; }
.auth-label-opt::after { content:" — Optional";font-weight:400;color:#9ca3af;font-size:.75rem; }
.auth-hint-block {
  background:#f0f4ff;border:1px solid #c7d2fe;border-radius:8px;
  padding:10px 13px;margin-bottom:14px;font-size:.82rem;color:#3730a3;
}
.auth-input {
  width:100%;padding:10px 13px;border:1.5px solid #d1d5db;border-radius:9px;
  font-size:.92rem;outline:none;box-sizing:border-box;transition:border-color .15s;
  font-family:inherit;
}
.auth-input:focus { border-color:#1a2a4a; }
.auth-select {
  width:100%;padding:10px 13px;border:1.5px solid #d1d5db;border-radius:9px;
  font-size:.92rem;background:#fff;outline:none;box-sizing:border-box;
  cursor:pointer;font-family:inherit;
}
.auth-select:focus { border-color:#1a2a4a; }
.auth-btn {
  width:100%;margin-top:18px;padding:12px;background:#e63946;color:#fff;
  border:none;border-radius:9px;font-size:.95rem;font-weight:800;
  cursor:pointer;transition:background .15s;
}
.auth-btn:hover { background:#c8303d; }
.auth-btn:disabled { background:#d1d5db;cursor:not-allowed; }
.auth-footer { font-size:.80rem;color:#6b7280;text-align:center;margin-top:14px; }
.auth-footer a { color:#e63946;font-weight:700;text-decoration:none; }
.auth-section-title {
  font-size:.70rem;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;
  color:#9ca3af;margin:18px 0 6px;padding-top:14px;border-top:1px solid #e8edf5;
}
.auth-row { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
@media(max-width:420px){ .auth-row { grid-template-columns:1fr; } }
.auth-reset-link {
  display:block;margin-top:14px;padding:12px 14px;background:#f0fdf4;
  border:1.5px solid #86efac;border-radius:9px;font-size:.80rem;color:#166534;
  word-break:break-all;line-height:1.5;
}
.auth-reset-link strong { display:block;margin-bottom:4px;font-size:.75rem;text-transform:uppercase;letter-spacing:.5px; }
</style>

<div id="authModal" class="auth-modal-overlay" onclick="if(event.target===this)ugCloseAuth()">
  <div class="auth-modal">
    <button class="auth-close" onclick="ugCloseAuth()">&#x2715;</button>
    <div class="auth-logo">Uni<span>Guide</span> 🍁</div>

    <div class="auth-tabs">
      <button id="auth-tab-login"  class="auth-tab active" onclick="_switchAuthTab('login')">Sign In</button>
      <button id="auth-tab-signup" class="auth-tab"        onclick="_switchAuthTab('signup')">Create Account</button>
      <button id="auth-tab-reset"  class="auth-tab"        onclick="_switchAuthTab('reset')">Reset Password</button>
    </div>

    <div id="authError"   class="auth-error"></div>
    <div id="authSuccess" class="auth-success"></div>

    <!-- ── SIGN IN ── -->
    <div id="auth-panel-login">
      <form onsubmit="_handleLogin(event)">
        <label class="auth-label">Email</label>
        <input type="email" id="auth-login-email" class="auth-input" placeholder="you@example.com" autocomplete="email" required/>
        <label class="auth-label">Password</label>
        <input type="password" id="auth-login-pass" class="auth-input" placeholder="Your password" autocomplete="current-password" required/>
        <button type="submit" id="auth-login-btn" class="auth-btn">Sign In</button>
      </form>
      <p class="auth-footer">
        No account? <a href="#" onclick="_switchAuthTab('signup');return false;">Create one free</a>
        &nbsp;·&nbsp;
        <a href="#" onclick="_switchAuthTab('reset');return false;">Forgot password?</a>
      </p>
    </div>

    <!-- ── SIGN UP ── -->
    <div id="auth-panel-signup" style="display:none;">
      <form onsubmit="_handleSignup(event)">

        <label class="auth-label">Email *</label>
        <input type="email" id="auth-signup-email" class="auth-input" placeholder="you@example.com" autocomplete="email" required/>

        <label class="auth-label">Password * <span style="font-weight:400;color:#9ca3af;font-size:.75rem;">(min. 6 characters)</span></label>
        <input type="password" id="auth-signup-pass" class="auth-input" placeholder="At least 6 characters" autocomplete="new-password" required/>

        <div class="auth-section-title">Personal Info</div>
        <div class="auth-hint-block">The fields below are optional and help personalise your university matches. You can skip any or all of them — you can always fill them in later from your profile.</div>

        <label class="auth-label-opt">Full Name</label>
        <input type="text" id="auth-signup-name" class="auth-input" placeholder="e.g. Alex Smith" autocomplete="name"/>

        <div class="auth-row">
          <div>
            <label class="auth-label-opt">Current Grade</label>
            <select id="auth-signup-grade" class="auth-select">
              <option value="">Select…</option>
              <option>9</option><option>10</option><option>11</option><option>12</option>
            </select>
          </div>
          <div>
            <label class="auth-label-opt">Province</label>
            <select id="auth-signup-province" class="auth-select">
              <option value="">Select…</option>
              <option>Ontario</option><option>British Columbia</option><option>Alberta</option>
              <option>Quebec</option><option>Nova Scotia</option><option>New Brunswick</option>
              <option>Manitoba</option><option>Saskatchewan</option>
              <option>Newfoundland and Labrador</option><option>Prince Edward Island</option>
              <option>Northwest Territories</option><option>Yukon</option><option>Nunavut</option>
            </select>
          </div>
        </div>

        <label class="auth-label-opt">City / Town</label>
        <input type="text" id="auth-signup-city" class="auth-input" placeholder="e.g. Mississauga"/>

        <div class="auth-section-title">Academic Background</div>

        <div class="auth-row">
          <div>
            <label class="auth-label-opt">Institution</label>
            <input type="text" id="auth-signup-institution" class="auth-input" placeholder="Current school"/>
          </div>
          <div>
            <label class="auth-label-opt">Year of Study</label>
            <input type="text" id="auth-signup-year" class="auth-input" placeholder="e.g. Grade 11"/>
          </div>
        </div>

        <label class="auth-label-opt">Major / Field of Interest</label>
        <input type="text" id="auth-signup-major" class="auth-input" placeholder="e.g. Computer Science"/>

        <div class="auth-section-title">Demographics</div>
        <label class="auth-label-opt">Race / Ethnicity <span style="font-weight:400;color:#9ca3af;font-size:.74rem;">(helps find targeted scholarships)</span></label>
        <select id="auth-signup-ethnicity" class="auth-select">
          <option value="">Prefer not to say</option>
          <option>Asian / South Asian</option>
          <option>Black / African Canadian</option>
          <option>East Asian</option>
          <option>Filipino</option>
          <option>Hispanic / Latin American</option>
          <option>Indigenous / First Nations / Métis / Inuit</option>
          <option>Middle Eastern / North African</option>
          <option>Southeast Asian</option>
          <option>White / European</option>
          <option>Mixed / Multi-racial</option>
          <option>Other</option>
        </select>

        <button type="submit" id="auth-signup-btn" class="auth-btn">Create My Account</button>
      </form>
      <p class="auth-footer">Already have an account? <a href="#" onclick="_switchAuthTab('login');return false;">Sign in</a></p>
    </div>

    <!-- ── RESET PASSWORD ── -->
    <div id="auth-panel-reset" style="display:none;">
      <form onsubmit="_handleReset(event)" id="auth-reset-form">
        <p style="font-size:.87rem;color:#6b7280;margin-bottom:14px;line-height:1.5;">Enter your email and we'll generate a secure password reset link.</p>
        <label class="auth-label">Email</label>
        <input type="email" id="auth-reset-email" class="auth-input" placeholder="you@example.com" autocomplete="email" required/>
        <button type="submit" id="auth-reset-btn" class="auth-btn">Generate Reset Link</button>
      </form>
      <div id="auth-reset-link-display" style="display:none;"></div>
      <p class="auth-footer" style="margin-top:14px;"><a href="#" onclick="_switchAuthTab('login');return false;">Back to sign in</a></p>
    </div>

  </div>
</div>`;
  document.body.appendChild(el.firstElementChild);
})();

// ── Auth Modal Controls ──────────────────────────────────────────
function ugOpenAuth(tab) {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  _switchAuthTab(tab || 'login');
  document.getElementById('authError').textContent   = '';
  document.getElementById('authSuccess').textContent = '';
  document.getElementById('auth-reset-link-display').style.display = 'none';
  const form = document.getElementById('auth-reset-form');
  if (form) form.style.display = '';
}

function ugCloseAuth() {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function _switchAuthTab(tab) {
  ['login','signup','reset'].forEach(t => {
    const panel = document.getElementById('auth-panel-' + t);
    const btn   = document.getElementById('auth-tab-'   + t);
    if (panel) panel.style.display = t === tab ? 'block' : 'none';
    if (btn)   btn.classList.toggle('active', t === tab);
  });
  document.getElementById('authError').textContent   = '';
  document.getElementById('authSuccess').textContent = '';
}

// ── Handlers ─────────────────────────────────────────────────────
async function _handleLogin(e) {
  e.preventDefault();
  const errEl = document.getElementById('authError');
  const succEl = document.getElementById('authSuccess');
  const btn = document.getElementById('auth-login-btn');
  errEl.textContent = ''; succEl.textContent = '';

  const email = document.getElementById('auth-login-email').value.trim();
  const pass  = document.getElementById('auth-login-pass').value;
  if (!email || !pass) { errEl.textContent = 'Please enter your email and password.'; return; }

  btn.disabled = true; btn.textContent = 'Signing in…';
  try {
    const user = await ugLogIn(email, pass);
    succEl.textContent = 'Welcome back, ' + (user.displayName || email.split('@')[0]) + '!';
    setTimeout(() => { ugCloseAuth(); }, 1000);
  } catch(err) {
    errEl.textContent = err.serverError || err.message || 'Could not sign in. Please try again.';
  }
  btn.disabled = false; btn.textContent = 'Sign In';
}

async function _handleSignup(e) {
  e.preventDefault();
  const errEl = document.getElementById('authError');
  const succEl = document.getElementById('authSuccess');
  const btn = document.getElementById('auth-signup-btn');
  errEl.textContent = ''; succEl.textContent = '';

  const email = document.getElementById('auth-signup-email').value.trim();
  const pass  = document.getElementById('auth-signup-pass').value;
  if (!email || !pass) { errEl.textContent = 'Email and password are required.'; return; }
  if (pass.length < 6) { errEl.textContent = 'Password must be at least 6 characters.'; return; }

  const extras = {
    displayName:  document.getElementById('auth-signup-name').value.trim() || null,
    grade:        document.getElementById('auth-signup-grade').value || null,
    province:     document.getElementById('auth-signup-province').value || null,
    city:         document.getElementById('auth-signup-city').value.trim() || null,
    institution:  document.getElementById('auth-signup-institution').value.trim() || null,
    yearOfStudy:  document.getElementById('auth-signup-year').value.trim() || null,
    major:        document.getElementById('auth-signup-major').value.trim() || null,
    ethnicity:    document.getElementById('auth-signup-ethnicity').value || null,
  };

  btn.disabled = true; btn.textContent = 'Creating account…';
  try {
    const user = await ugSignUp(email, pass, extras.displayName, extras);
    succEl.textContent = '🎉 Account created! Welcome, ' + (user.displayName || email.split('@')[0]) + '!';
    setTimeout(() => { ugCloseAuth(); }, 1200);
  } catch(err) {
    errEl.textContent = err.serverError || err.message || 'Could not create account. Please try again.';
  }
  btn.disabled = false; btn.textContent = 'Create My Account';
}

async function _handleReset(e) {
  e.preventDefault();
  const errEl  = document.getElementById('authError');
  const succEl = document.getElementById('authSuccess');
  const btn    = document.getElementById('auth-reset-btn');
  const linkDisplay = document.getElementById('auth-reset-link-display');
  errEl.textContent = ''; succEl.textContent = '';

  const email = document.getElementById('auth-reset-email').value.trim();
  if (!email) { errEl.textContent = 'Please enter your email.'; return; }

  btn.disabled = true; btn.textContent = 'Sending…';
  try {
    const data = await ugResetPassword(email);
    document.getElementById('auth-reset-form').style.display = 'none';
    succEl.textContent = data.message || 'Reset link generated.';
    if (data.resetUrl) {
      linkDisplay.style.display = 'block';
      linkDisplay.innerHTML = `<a class="auth-reset-link" href="${data.resetUrl}" target="_blank"><strong>Your password reset link</strong>${data.resetUrl}</a><p style="font-size:.76rem;color:#6b7280;margin-top:8px;">Click the link above to set a new password. It expires in 1 hour.</p>`;
    }
  } catch(err) {
    errEl.textContent = err.serverError || err.message || 'Could not process request. Try again.';
    btn.disabled = false; btn.textContent = 'Generate Reset Link';
  }
}

// ── Profile Modal (view/edit after login) ────────────────────────
function ugOpenProfile() {
  const u = _currentUser;
  if (!u) { ugOpenAuth('login'); return; }

  let existing = document.getElementById('ugProfileModal');
  if (existing) { existing.classList.add('open'); document.body.style.overflow = 'hidden'; _populateProfileModal(u); return; }

  const el = document.createElement('div');
  el.innerHTML = `
<div id="ugProfileModal" class="auth-modal-overlay open" onclick="if(event.target===this)ugCloseProfile()">
  <div class="auth-modal">
    <button class="auth-close" onclick="ugCloseProfile()">&#x2715;</button>
    <div class="auth-logo">My Profile</div>
    <div id="ugProfileError"   class="auth-error"></div>
    <div id="ugProfileSuccess" class="auth-success"></div>
    <form onsubmit="_handleProfileSave(event)">
      <label class="auth-label">Email</label>
      <input type="email" id="pp-email" class="auth-input" disabled style="background:#f9fafb;color:#6b7280;"/>
      <label class="auth-label-opt">Full Name</label>
      <input type="text" id="pp-name" class="auth-input" placeholder="Your name"/>
      <div class="auth-row">
        <div>
          <label class="auth-label-opt">Grade</label>
          <select id="pp-grade" class="auth-select">
            <option value="">—</option>
            <option>9</option><option>10</option><option>11</option><option>12</option>
          </select>
        </div>
        <div>
          <label class="auth-label-opt">Province</label>
          <select id="pp-province" class="auth-select">
            <option value="">—</option>
            <option>Ontario</option><option>British Columbia</option><option>Alberta</option>
            <option>Quebec</option><option>Nova Scotia</option><option>New Brunswick</option>
            <option>Manitoba</option><option>Saskatchewan</option>
            <option>Newfoundland and Labrador</option><option>Prince Edward Island</option>
            <option>Northwest Territories</option><option>Yukon</option><option>Nunavut</option>
          </select>
        </div>
      </div>
      <label class="auth-label-opt">City / Town</label>
      <input type="text" id="pp-city" class="auth-input" placeholder="e.g. Mississauga"/>
      <div class="auth-section-title">Academic Background</div>
      <div class="auth-row">
        <div>
          <label class="auth-label-opt">Institution</label>
          <input type="text" id="pp-institution" class="auth-input" placeholder="Current school"/>
        </div>
        <div>
          <label class="auth-label-opt">Year of Study</label>
          <input type="text" id="pp-year" class="auth-input" placeholder="e.g. Grade 11"/>
        </div>
      </div>
      <label class="auth-label-opt">Major / Field of Interest</label>
      <input type="text" id="pp-major" class="auth-input" placeholder="e.g. Computer Science"/>
      <div class="auth-section-title">Demographics</div>
      <label class="auth-label-opt">Race / Ethnicity</label>
      <select id="pp-ethnicity" class="auth-select">
        <option value="">Prefer not to say</option>
        <option>Asian / South Asian</option><option>Black / African Canadian</option>
        <option>East Asian</option><option>Filipino</option>
        <option>Hispanic / Latin American</option>
        <option>Indigenous / First Nations / Métis / Inuit</option>
        <option>Middle Eastern / North African</option><option>Southeast Asian</option>
        <option>White / European</option><option>Mixed / Multi-racial</option><option>Other</option>
      </select>
      <button type="submit" id="pp-save-btn" class="auth-btn" style="margin-top:20px;">Save Profile</button>
    </form>
    <p class="auth-footer" style="margin-top:14px;">
      <a href="#" onclick="ugCloseProfile();ugLogOut();location.reload();return false;" style="color:#6b7280;">Sign out</a>
    </p>
  </div>
</div>`;
  document.body.appendChild(el.firstElementChild);
  document.body.style.overflow = 'hidden';
  _populateProfileModal(u);
}

function _populateProfileModal(u) {
  _setVal('pp-email', u.email);
  _setVal('pp-name', u.displayName || '');
  _setVal('pp-grade', u.grade || '');
  _setVal('pp-province', u.province || '');
  _setVal('pp-city', u.city || '');
  _setVal('pp-institution', u.institution || '');
  _setVal('pp-year', u.yearOfStudy || '');
  _setVal('pp-major', u.major || '');
  _setVal('pp-ethnicity', u.ethnicity || '');
  const errEl = document.getElementById('ugProfileError');
  const succEl = document.getElementById('ugProfileSuccess');
  if (errEl) errEl.textContent = '';
  if (succEl) succEl.textContent = '';
}
function _setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val || ''; }
function ugCloseProfile() {
  const modal = document.getElementById('ugProfileModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

async function _handleProfileSave(e) {
  e.preventDefault();
  const errEl  = document.getElementById('ugProfileError');
  const succEl = document.getElementById('ugProfileSuccess');
  const btn    = document.getElementById('pp-save-btn');
  errEl.textContent = ''; succEl.textContent = '';
  btn.disabled = true; btn.textContent = 'Saving…';
  try {
    const fields = {
      displayName:  document.getElementById('pp-name').value.trim() || null,
      grade:        document.getElementById('pp-grade').value || null,
      province:     document.getElementById('pp-province').value || null,
      city:         document.getElementById('pp-city').value.trim() || null,
      institution:  document.getElementById('pp-institution').value.trim() || null,
      yearOfStudy:  document.getElementById('pp-year').value.trim() || null,
      major:        document.getElementById('pp-major').value.trim() || null,
      ethnicity:    document.getElementById('pp-ethnicity').value || null,
    };
    await ugUpdateProfile(fields);
    // Fetch fresh profile
    _currentUser = await _api('GET', '/api/auth/me');
    _updateNavUI();
    succEl.textContent = '✓ Profile saved successfully.';
  } catch(err) {
    errEl.textContent = err.serverError || err.message || 'Could not save. Try again.';
  }
  btn.disabled = false; btn.textContent = 'Save Profile';
}

// ── Keyboard close ───────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { ugCloseAuth(); ugCloseProfile(); }
});
