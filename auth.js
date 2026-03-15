// ── auth.js — Auth layer + ugLoad/ugSave helpers ─────────────
// localStorage primary, Firebase Firestore cloud sync when signed in.
// Requires firebase-config.js to be loaded first (provides FIREBASE_CONFIG).

(function () {
  /* ── Firebase init (compat SDK loaded from CDN in each page) ── */
  let _app, _auth, _db;
  const _readyQueue = [];
  let _ready = false;

  function _boot() {
    if (typeof firebase === 'undefined') {
      // Firebase SDK not loaded — run in offline/localStorage-only mode
      _ready = true;
      _readyQueue.forEach(fn => fn());
      _readyQueue.length = 0;
      return;
    }
    if (!firebase.apps.length) {
      _app = firebase.initializeApp(FIREBASE_CONFIG);
    } else {
      _app = firebase.app();
    }
    _auth = firebase.auth();
    if (firebase.firestore) {
      _db = firebase.firestore();
    }

    _auth.onAuthStateChanged(function (user) {
      _ready = true;
      _updateNavUI(user);
      _readyQueue.forEach(fn => fn());
      _readyQueue.length = 0;
    });
  }

  /* ── Public: register a callback for when auth state is known ── */
  window._onReady = function (fn) {
    if (_ready) { fn(); } else { _readyQueue.push(fn); }
  };

  /* ── Nav UI toggle ── */
  function _updateNavUI(user) {
    var loggedOut = document.getElementById('nav-logged-out');
    var loggedIn = document.getElementById('nav-logged-in');
    if (!loggedOut || !loggedIn) return;
    if (user) {
      loggedOut.style.display = 'none';
      loggedIn.style.display = '';
      var name = user.displayName || user.email.split('@')[0];
      var avatarEl = document.getElementById('nav-avatar');
      var nameEl = document.getElementById('nav-user-name');
      if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();
      if (nameEl) nameEl.textContent = name;
    } else {
      loggedOut.style.display = '';
      loggedIn.style.display = 'none';
    }
  }

  /* ── Auth helpers ── */
  window.ugCurrentUser = function () {
    return _auth ? _auth.currentUser : null;
  };

  window.ugIsLoggedIn = function () {
    return !!window.ugCurrentUser();
  };

  window.ugLogOut = function () {
    if (_auth) {
      _auth.signOut().then(function () {
        window.location.href = 'index.html';
      });
    }
  };

  window.ugResetPassword = function (email) {
    if (!_auth) return Promise.reject(new Error('Auth not available'));
    return _auth.sendPasswordResetEmail(email);
  };

  /* ── Firestore helpers (localStorage primary, cloud sync) ── */
  function _userDoc() {
    var user = window.ugCurrentUser();
    if (!user || !_db) return null;
    return _db.collection('users').doc(user.uid);
  }

  window.ugSave = async function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    var doc = _userDoc();
    if (doc) {
      var payload = {};
      payload[key] = value;
      try {
        await Promise.race([
          doc.set(payload, { merge: true }),
          new Promise(function(_, reject) { setTimeout(function() { reject(new Error('timeout')); }, 4000); })
        ]);
      } catch (e) { /* cloud save failed — localStorage already written */ }
    }
  };

  window.ugLoad = async function (key, fallback) {
    // Try Firestore first if signed in (with timeout to prevent hanging)
    var doc = _userDoc();
    if (doc) {
      try {
        var snap = await Promise.race([
          doc.get(),
          new Promise(function(_, reject) { setTimeout(function() { reject(new Error('timeout')); }, 4000); })
        ]);
        if (snap.exists && snap.data()[key] !== undefined) {
          var val = snap.data()[key];
          localStorage.setItem(key, JSON.stringify(val));
          return val;
        }
      } catch (e) { /* fall through to localStorage */ }
    }
    try {
      var raw = localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return fallback !== undefined ? fallback : null;
  };

  window.ugRemove = async function (key) {
    localStorage.removeItem(key);
    var doc = _userDoc();
    if (doc && firebase.firestore && firebase.firestore.FieldValue) {
      var payload = {};
      payload[key] = firebase.firestore.FieldValue.delete();
      try { await doc.update(payload); } catch (e) { /* ignore */ }
    }
  };

  window.ugSaveProfile = async function (fields) {
    var doc = _userDoc();
    if (doc) {
      await doc.set(Object.assign({ updatedAt: new Date().toISOString() }, fields), { merge: true });
    }
    // Also keep in localStorage
    var existing = {};
    try { existing = JSON.parse(localStorage.getItem('ugProfile') || '{}'); } catch (e) {}
    Object.assign(existing, fields);
    localStorage.setItem('ugProfile', JSON.stringify(existing));
  };

  window.ugLoadProfile = async function () {
    var doc = _userDoc();
    if (doc) {
      try {
        var snap = await doc.get();
        if (snap.exists) {
          localStorage.setItem('ugProfile', JSON.stringify(snap.data()));
          return snap.data();
        }
      } catch (e) { /* fall through */ }
    }
    try { return JSON.parse(localStorage.getItem('ugProfile') || '{}'); } catch (e) { return {}; }
  };

  /* ── Boot on DOM ready ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _boot);
  } else {
    _boot();
  }
})();
