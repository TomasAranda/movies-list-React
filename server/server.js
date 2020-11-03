const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const express = require('express');
const app = express();
const buildPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://movies-lists-server-ta.herokuapp.com',
    changeOrigin: true,
  })
);

// app.get("/*", (req, res) => {
//   let url = path.join(buildPath, 'index.html');
//   if (!url.startsWith('/app/')) // since we're on local windows
//     url = url.substring(1);
//   res.sendFile(url);
// });

app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});
