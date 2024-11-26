const express= require('express');
const routes= require('./routes/operations.route');
require('dotenv').config();
const bodyParser = require('body-parser')
//Port Number
const port=process.env.PORT||8000;

const app=express();
app.use(bodyParser.json());
app.use('/api',routes);

//Server listening
app.listen(port,()=>{
    console.log('Server is started at port no:',port);
})

