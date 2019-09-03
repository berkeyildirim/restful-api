var express = require('express');
var router = express.Router();
var User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// Token Oluşturma
router.post('/token',(req,res) => {
    const { username,password } = req.body;
    User.findOne({
      username
    },(err,user) => {
      if(err)
        throw err;
      if(!user){
        res.json({error : 'bulunamadi'});
      }
      else{
        bcrypt.compare(password,user.password).then((result) => {
          if(!result)
            res.send('şifre hatali');
          else{
            const payload ={
              username,
              yetki:'user'
            }
            const token = jwt.sign(payload,req.app.get('api_secret_key'),{
              expiresIn: 7200
            });
            res.json({
              token
            });
          }
        });
      }
  });
});

module.exports = router;
