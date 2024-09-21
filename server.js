/* eslint-disable @typescript-eslint/no-require-imports */
// server.js

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Custom route example
  server.get('/testRoute', (req, res) => {
    return res.send('Hello from custom route!');
  });

  // Handle all other requests with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server is running on http://localhost:3000');
  });
});
