const express = require('express');
const path = require('path');
const redis = require('redis');
const client = redis.createClient();

const init = async () => {
  const app = express();
  app.use(express.static(path.join(__dirname, '/public')));

  client.incr('pod_index');
  const podIndex = await new Promise(resolve => {
    client.get('pod_index', (err, reply) => {
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
