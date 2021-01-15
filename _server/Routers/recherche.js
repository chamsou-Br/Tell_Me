const express = require('express');
const bodyparser = require('body-parser');
const RechercheRouter = express.Router();
const UserModel = require('../models/user')
const fs = require('fs')
const path = require('path');

RechercheRouter.use(bodyparser.json())

RechercheRouter.post('/recherche' , (req , res) => {
    console.log(req.body.username);
    UserModel.findOne({username : req.body.username}).then(user => {
        if (user) {
            console.log(true)
            res.json({
                user : user , 
                existe : true 
            })
        }else {
            console.log(false);
            res.send({
                user : user ,
                existe : false
            })
        }
    }) 
})

module.exports = RechercheRouter