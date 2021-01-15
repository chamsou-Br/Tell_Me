const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const UserRoute = require('./Routers/User')
const bodyparser = require('body-parser');
const CompteRouter = require('./Routers/compte');
const RechercheRouter = require('./Routers/recherche');
const SarahaRouter = require('./Routers/Saraha');


app.use(bodyparser.json({limit: '25mb'}));
app.use(bodyparser.urlencoded({limit: '25mb'}));

app.use(cors());

mongoose.connect('mongodb://localhost/TellMe', {useUnifiedTopology : true , useNewUrlParser : true});
mongoose.connection.once('open' , () => console.log('connection with mongoose with successful')).on('error' , (err) => console.log(err));

app.get('/',(req , res ) => {
    res.json({email  :'chamsou' , Age : 19 });
})

app.use(UserRoute);
app.use(RechercheRouter);
app.use(CompteRouter)
app.use(SarahaRouter)

app.listen(4000);