const KEY = 'portfolio:thumbsup';
const OWNER_COOKIE = 'portfolio_owner';
const BASE = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisCmd(path) {
  const r = await fetch(`${BASE}/${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const { result } = await r.json();
  return result;
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  return header.split(';').reduce((acc, pair) => {
    const [rawKey, ...rawValue] = pair.trim().split('=');
    if (!rawKey) return acc;
    acc[rawKey] = decodeURIComponent(rawValue.join('='));
    return acc;
  }, {});
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (!BASE || !TOKEN) {
      return res.status(500).json({ error: 'Missing env vars', hasBase: !!BASE, hasToken: !!TOKEN });
    }

    const cookies = parseCookies(req);
    const isOwner = cookies[OWNER_COOKIE] === '1';

    if (req.method === 'GET') {
      const val = await redisCmd(`get/${KEY}`);
      return res.status(200).json({ count: Number(val) || 0, isOwner });
    }

    if (req.method === 'POST') {
      if (isOwner) {
        const val = await redisCmd(`get/${KEY}`);
        return res.status(200).json({ count: Number(val) || 0, isOwner: true, ignored: true });
      }

      const count = await redisCmd(`incr/${KEY}`);
      return res.status(200).json({ count: Number(count), isOwner: false, ignored: false });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message || String(err) });
  }
};
