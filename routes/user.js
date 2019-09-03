var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

/* Users listeleme işlemi */
router.get('/', (req, res) =>{
 const promise = Users.find({ })
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});
/* Users detay işlemi */
router.get('/:user_id', (req, res,next) =>{
    if (!mongoose.Types.ObjectId.isValid(req.params.user_id)){
      return res.status(404).send('Geçersiz ID.');
    }
    else{
      const promise = Users.findById(req.params.user_id);
      promise.then((user)=>{
      res.json(user);
      }).catch((err)=>{
      res.json(err);
      })
    }
});
/* USers delete işlemi */
router.delete('/:user_id', (req, res,next) =>{
  const promise = Users.findByIdAndRemove(req.params.user_id);
    promise.then((user)=>{
      res.json(user);
    }).catch((err)=>{
      res.json(err);
    })
});

/*PUT ile user güncelleme işlemi */
router.put('/:user_id', (req, res,next) =>{
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);//Encrypt işlemi
  req.body.password = hash;
  const promise = Users.findByIdAndUpdate(req.params.user_id,req.body,{new:true});
    promise.then((user)=>{
      res.json(user);
    }).catch((err)=>{
      res.json(err);
    })
});
/*Post ile user kayıt işlemi*/
router.post('/', (req, res,next) => {
  const {username,password,position,departmant,birthday,phone} = req.body;

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt); //Encrypt işlemi

    const user = new Users({
      username,
      password:hash,
      position,
      departmant,
      birthday,
      phone
    });

    const promise = user.save();

    promise.then((data) => {
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    });

});
 



module.exports = router;
