module.exports = {
  '/sumarios-back/*': {
    target: 'http://localhost:80',
    secure: false,
    logLevel: 'debug',
    changeOrigin: false,
    
  },
};
