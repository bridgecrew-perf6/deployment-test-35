const express = require('express');
const router = express.Router();
const login = require('../api/login')

router.get(
    '/', async (req,res)=>{
      let user = 'No org authorized.';
      if(req.session.userid){
        user = await login.loginSFDX('logout');
      }
      req.session.destroy();
      if(user.code == 1){
        user = user.stderr;
      }
      res.render('login', {
        user: user
      })
    });

module.exports = router;