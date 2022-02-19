// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  BITBUCKET_TOKEN: process.env.BITBUCKET_TOKEN,
  BITBUCKET_USER: process.env.BITBUCKET_USER
};