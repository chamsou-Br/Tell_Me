const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const CompteRouter = express.Router();
const UserModel = require('../models/user')
const fs = require('fs')
const path = require('path');
const { profile } = require('console');

CompteRouter.use(bodyparser.json())

CompteRouter.post('/selectImage' ,(req , res) => {
    fs.writeFile('./Routers/profile/profile.png', req.body.imgsource, 'base64', (err) => {
		if (err) throw err
    })
    UserModel.findOne({email : req.body.email}).then(user => {
        user.img.data = fs.readFileSync(path.join(__dirname + '/profile/' + 'profile.png'))
        user.img.ContenttType = 'png/jpeg'
        user.isImageSocial = false ;
        user.isImageBuffer = true;
        user.save()
    })
  })

  CompteRouter.post('/getImage' , (req , res)=> {

    UserModel.findOne({email : req.body.email}).then(user => {
      res.send(user);
    })
  })


  CompteRouter.post('/info', (req,res) => {
    
    UserModel.findOne({email : req.body.email}).then(user => {

        user.information = req.body.info;
        user.save()
        if (user.username != req.body.username) {
          UserModel.findOne({username : req.body.username}).then(user2=> {
            if (user2) {
              res.send({ubdate : false})
            }else {
              res.send({ubdate : true});
            }
          }) 
          
        } else res.send({ubdate : true});
        
    })
})

CompteRouter.post('/username' , (req , res) => {
  UserModel.findOne({email : req.body.email}).then(user => {
    user.username = req.body.username ;
    user.save();
  })
})
 

  module.exports = CompteRouter
