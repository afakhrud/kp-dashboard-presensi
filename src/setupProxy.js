const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/vision',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/vision': ''
      }
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:80',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/kp-rest-api/api'
      }
    })
  );
};