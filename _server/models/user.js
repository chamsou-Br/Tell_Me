const mongoose  = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')


const userSheama = new mongoose.Schema({
    username : {
        type : String , 
        required : [true , 'please enter an username']
    }, 
    email : {
        type : String ,
        required : [true,'Please enter an Email'],
        validate : [isEmail ,'Please enter a valid email'],
        unique : true,
        lowercase : true
    },
    password : {
        type :String,
        required :[true,'Please enter an PassWord'],
        minlength : [8,'Minimum password length is 6 characters'],
    },
    sexe : {
        type : String,
    },
    image : {
        type : String,
        default : ''
    },
    isImageSocial : {
        type : Boolean,
        default : false
    },
    token : {
        type : String
    },
    isImageBuffer : {
        type : Boolean,
        default : false
    },
    img : {
        data : Buffer ,
        ContenttType : String
    },
    information : {
        Birthday : {
            type : String ,
            default : ''
        },
        Etude : {
            type : String ,
            default : ''
        } ,
        Work : {
            type : String ,
            default : ''
        },
        live : {
            type : String ,
            default : ''
        },
        Relation : {
            type : String ,
            default : ''
        },
        Hobbies : {
            type : String ,
            default : ''
        },
        Nationality : {
            type : String ,
            default : ''
        } 
    }
})



 
/*userSheama.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });*/

  userSheama.statics.login = async (email,password) => {
      const user = await UserModel.findOne({email : email})
      if (user ) {
         const auth = await bcrypt.compare(password,user.password)
         if (auth) {
            return user;
         }
         throw Error('incorrect Password')
      }
      throw Error('incorrect Email')
  }

  userSheama.statics.signinSocialMedia = async (info) => {
    console.log(info);

      const user = await UserModel.findOne({token : info.token})
      if (user) {
          return user
      }else {
       const user = await UserModel.findOne({email : info.email})
        if (user ) {
            user.token = info.token
            user.save()
            return user
        }else {
            const newuser = await UserModel.create({
              username : info.username ,
              email : info.email,
              password : info.password,
              sexe : info.sexe,
              image : info.image,
              isImageSocial : true ,
              token : info.token
            })
            return  newuser
        }
      }
        
  }
  
const UserModel = mongoose.model('usermodel' , userSheama);
module.exports = UserModel