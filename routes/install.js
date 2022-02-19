const express = require('express');
const router = express.Router();
const bitbucket = require('../api/bitbucket')

router.get(
    '/', async (req,res)=>{
      req.session.status = 'Started';
      let response = await bitbucket.gitClone();
      res.json({
          status: response.code
      })
    });

module.exports = router;
