const express = require('express');
const path = require('path');
const redis = require('redis');
const socketIO = require('socket.io');
const http = require('http');
const redisAdapter = require('socket.io-redis');

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
  const server = http.Server(app);
  const io = socketIO(server);
  io.adapter(redisAdapter(redisURL));

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

  io.on('connection', socket => {
    io.emit('new', podIndex);

    socket.on('msg', msg => {
      io.emit('msg', msg);
    });
  });

  const port = 3000;
  server.listen(port, () => console.log(`App listening on port ${port}`));
};

init();
