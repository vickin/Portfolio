const KEY = 'portfolio:thumbsup';
const BASE = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisCmd(path) {
  const r = await fetch(`${BASE}/${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const { result } = await r.json();
  return result;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'GET') {
    const val = await redisCmd(`get/${KEY}`);
    return res.status(200).json({ count: Number(val) || 0 });
  }

  if (req.method === 'POST') {
    const count = await redisCmd(`incr/${KEY}`);
    return res.status(200).json({ count: Number(count) });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
