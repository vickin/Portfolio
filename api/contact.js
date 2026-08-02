const RECIPIENT = 'nvignesh20@gmail.com';

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

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from:     'Portfolio <onboarding@resend.dev>',
        to:       [RECIPIENT],
        reply_to: safeEmail,
        subject:  'New Problem Submission \u2014 vigneshnagarajan.com',
        text:     `From: ${safeEmail}\n\n${safeProblem}`,
        html:     `<p><strong>From:</strong> ${safeEmail}</p><hr><p>${safeProblem.replace(/\n/g, '<br>')}</p>`,
      }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.message || r.status);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[contact] email send error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
