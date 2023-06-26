const PROXY_CONFIG = {
  "/api/*": {
    target: "http://127.0.0.1:8080",
    secure: false,
    changeOrigin: true,
  },
};

module.exports = PROXY_CONFIG;
