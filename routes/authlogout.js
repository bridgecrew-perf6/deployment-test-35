const express = require('express');
const router = express.Router();
const login = require('../api/login')

router.get(
    '/', async (req,res)=>{
      const user = await login.loginSFDX('logout');
      res.render('login', {
        user: user
      })
    });

module.exports = router;