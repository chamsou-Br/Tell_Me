const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const UserRoute = express.Router();
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

UserRoute.use(bodyparser.json())

const HandleError = (err) => {
    let errors = { email: null, password: null,username : null };
    console.log(err);
    if (err.code === 11000) {
        if (err.keyValue.email) {
            errors.email = 'that email is already registered';
        }
        else {
            errors.username = 'that Username is already registered';
        }
        return errors;
      } 
    if (err.message.includes('usermodel validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
          // console.log(val);
          // console.log(properties);
          errors[properties.path] = properties.message;
        });
    }
    if (err.message === 'incorrect Email') {
        errors.email = 'that Email is not registred !'
      }
      if (err.message === 'incorrect Password') {
        errors.password = 'that password is incorrect'
      }
    
    return errors
}

UserRoute.post('/signin' , async  (req , res ) => {
    const user = {
        userName : req.body.userName ,
        email : req.body.email,
        password : req.body.password,
        sexe : req.body.sexe 
       }
       const salt = await bcrypt.genSalt();
        
    user.password = await bcrypt.hash(user.password, salt);
    try {
       const newuser = await UserModel.create({
            username : user.userName ,
            email : user.email,
            password : user.password,
            sexe : user.sexe
        })
        console.log(newuser)
        res.status(201).json({user : newuser});
    }catch(err) {
      const error = HandleError(err)
      console.log(error);
      res.json( {error} );
    }
})

UserRoute.post('/login' , async (req , res ) => {
    const user = {
        email : req.body.email,
        password : req.body.password,
        username : req.body.userName,
        image : req.body.image,
        type : req.body.type,
        sexe : req.body.sexe ,
        token : req.body.token
    }
    console.log(user);
    
    if (user.type === 'with email') {
        try{
            const newuser = await  UserModel.login(user.email,user.password);
            res.status(201).json({user : newuser})
        }catch(err) {
            const error = HandleError(err)
            console.log(error);
            res.json( {error} );
        }
    }else {
        try{
            console.log('google');
            const newuser = await UserModel.signinSocialMedia(user)
            console.log(user);
            res.json({user : newuser})
        }catch(err) {
            const error = HandleError(err)
            console.log(error)
            res.json(err)
        }
        
    }
})
module.exports = UserRoute
