const express = require('express');
const path = require('path');
const redis = require('redis');

const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';

const connectDb = async () => {
  let success = false;
  let client;

  while (!success) {
    try {
      client = redis.createClient(redisURL);
      success = true;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return client;
};

const init = async () => {
  const db = await connectDb();

  const app = express();
  app.use(express.static(path.join(__dirname, '/public')));

  db.incr('pod_index');
  const podIndex = await new Promise(resolve => {
    db.get('pod_index', (err, reply) => {
      resolve(reply);
    });
  });

  app.get('/api', async (req, res) => {
    res.json({
      hello: 'World',
      time: Date.now(),
      podIndex,
    });
  });

  const port = 3000;
  app.listen(port, () => console.log(`App listening on port ${port}`));
};

init();
