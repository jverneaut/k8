const express = require('express');
const path = require('path');

setTimeout(() => {
  const app = express();
  app.use(express.static(path.join(__dirname, '/public')));

  const random = Math.random();

  app.get('/api', (req, res) => {
    res.json({
      hello: 'World',
      random,
      time: Date.now(),
    });
  });

  setTimeout(() => {
    process.exit(1);
  }, Math.random() * 30000 + 30000);

  const port = 3000;
  app.listen(port, () => console.log(`App listening on port ${port}`));
}, 10000);
