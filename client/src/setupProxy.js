const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		'/api',
		createProxyMiddleware({
			target: '192.168.0.152',
			changeOrigin: true
		})
	);
};
