var jsforce = require("jsforce");
var express = require("express");
var router = express.Router();
const login = require("../api/login");
//
// OAuth2 client information can be shared with multiple connections.
//
var oauth2 = new jsforce.OAuth2({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl: "https://test.salesforce.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: `${process.env.CALLBACK_URL}/oauth2/success`,
});

router.get("/", function(req, res) {
  console.log("here");
  var conn = new jsforce.Connection({ oauth2: oauth2 });
  var code = req.query.code;
  conn.authorize(code, async function(err, userInfo) {
    if (err) {
      return console.error(err);
    }
    // Now you can get the access token, refresh token, and instance URL information.
    // Save them to establish connection next time.
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    console.log("RefreshToken: " + conn.refreshToken);

    let renderString = "home";
    let user = "";
    if (req.session.userid) {
      renderString = "home";
      user = `Already logged in. ${req.session.userid}`;
    } else {
      user = await login.loginUsingRefreshToken(
        conn.refreshToken,
        conn.instanceUrl
      );
    }
    if (user.code && user.code == 1) {
      renderString = `login`;
      user = `Please try again. ${user.stderr}`;
    }
    if (user.code == 0) {
      req.session.userid = user;
    }
    res.render(renderString, {
      user: user,
    });
  });
});

module.exports = router;
