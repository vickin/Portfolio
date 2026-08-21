module.exports = async function handler(req, res) {
  // CORS – allow the portfolio origin only
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { problem, email } = req.body || {};

  // Input validation
  if (!problem || typeof problem !== 'string' || problem.trim().length < 10) {
    return res.status(400).json({ error: 'Problem description is too short (min 10 chars)' });
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Sanitise – cap length to prevent abuse
  const safeProblem = problem.trim().slice(0, 2000);
  const safeEmail   = email.trim().slice(0, 200);

  if (!process.env.WEB3FORMS_ACCESS_KEY) {
    console.error('[contact] WEB3FORMS_ACCESS_KEY is not set');
    return res.status(500).json({ error: 'Server misconfiguration: missing access key' });
  }

  try {
    const r = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject:    'New Problem Submission \u2014 vigneshnagarajan.com',
        from_name:  safeEmail,
        email:      safeEmail,
        message:    safeProblem,
      }),
    });
    const data = await r.json();
    if (!r.ok || !data.success) {
      console.error('[contact] Web3Forms error:', JSON.stringify(data));
      return res.status(500).json({ error: data.message || 'Web3Forms rejected the request' });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[contact] email send error:', err);
    return res.status(500).json({ error: err.message || 'Failed to send email' });
  }
};
