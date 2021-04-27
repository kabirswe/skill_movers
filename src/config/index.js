const aws = require('./aws');
const baseLocation = require('./base_location');

module.exports = {
  host: 'localhost',
  port: 3000,
  DEFAULT_LANGUAGE: 'en', // for english en and for japanese use ja
  JSON_API_URL: process.env.REACT_APP_JSON_API_URL,
  API_URL: process.env.REACT_APP_API_URL,
  aws: aws,
  baseLocation: baseLocation,
  GOOGLE_SEARCH_CONSOLE_SITE_URL:
    process.env.REACT_APP_GOOGLE_SEARCH_CONSOLE_SITE_URL
};
