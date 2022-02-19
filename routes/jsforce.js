var jsforce = require('jsforce');
var express = require('express');
var router = express.Router();
const {CLIENT_ID, CLIENT_SECRET} = require('../config')
// OAuth2 client information can be shared with multiple connections.
//
var oauth2 = new jsforce.OAuth2({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl : 'https://test.salesforce.com',
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  redirectUri : `${process.env.CALLBACK_URL}/oauth2/success`,
  response_type: 'code'
});
//
// Get authorization url and redirect to it.
//

router.get('/', function(req, res, next) {
  res.redirect(oauth2.getAuthorizationUrl({ scope : 'full refresh_token offline_access' }));
});

module.exports = router;
