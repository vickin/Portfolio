const OWNER_COOKIE = 'portfolio_owner';
const OWNER_TOKEN = process.env.OWNER_KUDO_TOKEN;

function setOwnerCookie(res, enabled) {
  const parts = [
    `${OWNER_COOKIE}=${enabled ? '1' : ''}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    enabled ? 'Max-Age=31536000' : 'Max-Age=0',
    'Secure',
  ];

  res.setHeader('Set-Cookie', parts.join('; '));
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'DELETE') {
    setOwnerCookie(res, false);
    return res.status(200).json({ success: true, isOwner: false });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!OWNER_TOKEN) {
    return res.status(500).json({ error: 'Missing owner token configuration' });
  }

  const { token } = req.body || {};

  if (!token || token !== OWNER_TOKEN) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  setOwnerCookie(res, true);
  return res.status(200).json({ success: true, isOwner: true });
};