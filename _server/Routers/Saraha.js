const express = require('express');
const bodyparser = require('body-parser');
const SarahaRouter = express.Router();
const SarahaModele = require('../models/Saraha') ;

SarahaRouter.use(bodyparser.json())

SarahaRouter.post('/sendSaraha' , async (req , res) => {
  const saraha = await  SarahaModele.create({
    date :req.body.date,
    RecieverName : req.body.reciever , 
    RecieverEmail : req.body.email ,
    senderName : req.body.sender ,
    title : req.body.title , 
    message : req.body.message
    })
})

SarahaRouter.post('/getSaraha' , (req , res ) => {
  SarahaModele.find({
    RecieverName : req.body.username , 
    RecieverEmail : req.body.email
  }).then(saraha => {
    res.send(saraha)
  })
})

SarahaRouter.post('/deleteSaraha' , (req , res ) => {
  console.log(req.body)
  SarahaModele.findOne({
    RecieverName : req.body.username , 
    RecieverEmail : req.body.email,
    _id : req.body._id
  }).then(saraha => {
    if (saraha) { saraha.remove() }
   })
})
module.exports = SarahaRouter