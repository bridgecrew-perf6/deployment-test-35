const express = require('express');
const router = express.Router();
const login = require('../api/login')

router.get(
    '/', async (req,res)=>{
      let user = await login.loginSFDX('login');
      let renderString = `home`
      if(user.code && user.code == 1){
        renderString = `login`;
        user = `Req Timeout. Please try again`
      }
      res.render(renderString, {
        user: user
      })
    });

router.post(
    '/', async (req,res)=>{
    const sfdxAuthURL = req.body.authURL;
    let user = await login.loginUsingSFDXAuthUrl(sfdxAuthURL);
    let renderString = `home`
    if(user.code && user.code == 1){
        renderString = `login`;
        user = `Req Timeout. Please try again`
      }
      res.render(renderString, {
        user: user
      })
    });

module.exports = router;