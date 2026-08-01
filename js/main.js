// Scroll reveal
const revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });

// ── Thumbs-up: load current count on page load ──────────────────────────────
fetch('/api/thumbsup')
  .then(function(r) { return r.ok ? r.json() : null; })
  .then(function(data) {
    if (data && data.count > 0) {
      document.getElementById('kudo-label').textContent =
        data.count + (data.count === 1 ? ' person appreciates' : ' people appreciate') + ' this.';
    }
  })
  .catch(function() { /* fail silently — backend may not be deployed yet */ });

// ── Contact form ─────────────────────────────────────────────────────────────
function submitProblem() {
  var problem = (document.getElementById('problem-input').value || '').trim();
  var email   = (document.getElementById('email-input').value   || '').trim();
  var msg     = document.getElementById('solver-msg');
  var btn     = document.querySelector('.solver-submit');

  if (!problem || !email) {
    alert('Please fill in both fields.');
    return;
  }

  btn.disabled    = true;
  btn.textContent = 'Sending…';

  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problem: problem, email: email })
  })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.success) {
        msg.style.display = 'block';
        document.getElementById('problem-input').value = '';
        document.getElementById('email-input').value   = '';
      } else {
        alert('Something went wrong. Please email nvignesh20@gmail.com directly.');
      }
    })
    .catch(function() {
      alert('Something went wrong. Please email nvignesh20@gmail.com directly.');
    })
    .finally(function() {
      btn.disabled    = false;
      btn.textContent = 'Send it →';
    });
}

// ── Thumbs-up: increment on click ───────────────────────────────────────────
function handleKudo(el) {
  fetch('/api/thumbsup', { method: 'POST' })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      document.getElementById('kudo-icon').textContent  = '🎉';
      document.getElementById('kudo-label').textContent =
        (data.count || '') + (data.count ? ' people appreciate' : 'Thanks!') + (data.count ? ' this. Thanks!' : '');
      el.style.borderColor = 'var(--amber)';
      el.onclick = null;
    })
    .catch(function() {
      document.getElementById('kudo-icon').textContent  = '🎉';
      document.getElementById('kudo-label').textContent = 'Thanks! That means a lot.';
      el.style.borderColor = 'var(--amber)';
      el.onclick = null;
    });
}
