const PROXY_CONFIG = {
  "/api/*": {
    target: "http://127.0.0.1:8080",
    secure: false,
    changeOrigin: true,
  },
  "/login": {
    target: "http://127.0.0.1:8080",
    secure: false,
    changeOrigin: false,
  },
  "/callback": {
    target: "http://127.0.0.1:8080",
    secure: false,
    changeOrigin: true,
  },
  "/logout": {
    target: "http://127.0.0.1:8080",
    secure: false,
    changeOrigin: false,
  },
};

module.exports = PROXY_CONFIG;
