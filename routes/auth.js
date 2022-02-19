const express = require("express");
const router = express.Router();
const login = require("../api/login");

router.get("/", async (req, res) => {
  let renderString = "home";
  let user = "";
  if (req.session.userid) {
    renderString = "home";
    user = `Already logged in. ${req.session.userid}`;
  } else {
    user = await login.loginSFDX("login");
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

router.post("/", async (req, res) => {
  const sfdxAuthURL = req.body.authURL;

  let renderString = "home";
  let user = "";
  if (req.session.userid) {
    renderString = "home";
    user = `Already logged in. ${req.session.userid}`;
  } else {
    user = await login.loginUsingSFDXAuthUrl(sfdxAuthURL);
    if (user.code && user.code == 1) {
      renderString = `login`;
      user = `Please try again. ${user.stderr}`;
    }
    if (user.code == 0) {
      req.session.userid = user;
    }
  }
  res.render(renderString, {
    user: user,
  });
});

module.exports = router;
