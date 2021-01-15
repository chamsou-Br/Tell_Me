const mongoose = require('mongoose')



const SarahaSheama = new mongoose.Schema({
    date : String ,
    RecieverName : String , 
    RecieverEmail : String ,
    senderName : String ,
    title : String , 
    message : String
},{
    timestamps : true
})

const SarahaModele = mongoose.model('SarahaModel' , SarahaSheama) ;
module.exports = SarahaModele 