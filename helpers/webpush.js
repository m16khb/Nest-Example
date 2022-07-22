
const webpush = require('web-push');

webpush.setVapidDetails(
  `mailto:${config.pushKeys.email}`,
  config.pushKeys.publicKey,
  config.pushKeys.privateKey,
);

module.exports = webpush;
