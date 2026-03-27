const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use(cors());

// Proxy configuration
const proxyOptions = {
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    // Optionally log proxied requests
    console.log(`[API Gateway] Proxied ${req.method} request to ${proxyReq.path}`);
  }
};

app.use('/api/books', createProxyMiddleware({ ...proxyOptions, target: 'http://localhost:3001' }));
app.use('/api/reviews', createProxyMiddleware({ ...proxyOptions, target: 'http://localhost:3002' }));
app.use('/api/search', createProxyMiddleware({ ...proxyOptions, target: 'http://localhost:3003' }));
app.use('/api/categories', createProxyMiddleware({ ...proxyOptions, target: 'http://localhost:3004' }));

app.get('/', (req, res) => {
  res.json({ message: 'Zen Readify API Gateway is running' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
