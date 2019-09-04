var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Projects = require('../models/Projects');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

/* Projeler için listeleme işlemi */
router.get('/', (req, res) =>{
 const promise = Projects.find({ })
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
});

/*Post ile proje kayıt işlemi*/
router.post('/', (req, res,next) => {
  const {project_name,project_type,project_description,project_start_date,project_status,project_budget} = req.body;

    const project = new Projects({
        project_name,
        project_type,
        project_description,
        project_start_date,
        project_status,
        project_budget
    });

    const promise = project.save();

    promise.then((data) => {
      res.send({status:true,
      code:'200',
      message:'Proje başarıyla kayıt edildi.'
    });
    }).catch((err)=>{
      res.json(err);
    });

});
 /* Proje delete işlemi */
router.delete('/:project_id', (req, res,next) =>{
    const promise = Projects.findByIdAndRemove(req.params.project_id);
      promise.then((proje)=>{
        res.send({status:true,
            code:'200',
            message : 'Proje başarıyla silindi.'});
      }).catch((err)=>{
        res.json(err);
      })
  });
  
/*PUT ile proje güncelleme işlemi */
router.put('/:project_id', (req, res,next) =>{
      promise.then((project)=>{
        res.send({status:true,
            code:'200',
            message : 'Proje başarıyla güncellendi.'});
      }).catch((err)=>{
        res.json(err);
      })
  });


module.exports = router;
