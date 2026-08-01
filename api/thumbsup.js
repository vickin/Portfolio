const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const KEY = 'portfolio:thumbsup';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://vigneshnagarajan.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'GET') {
    const count = (await redis.get(KEY)) || 0;
    return res.status(200).json({ count: Number(count) });
  }

  if (req.method === 'POST') {
    const count = await redis.incr(KEY);
    return res.status(200).json({ count });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
