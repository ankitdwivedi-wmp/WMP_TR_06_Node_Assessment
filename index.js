const express= require('express');
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger-output.json');
const routes= require('./routes/operations.route');
require('dotenv').config();
const bodyParser = require('body-parser');
const swaggerSpec  = require('./Swagger/swagger-doc.js');
//Port Number
const port=process.env.PORT||8000;

const app=express();
app.use(bodyParser.json());
app.use('/api',routes);




//swagger jsdocs
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
//swagger route
// app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//Server listening
app.listen(port,()=>{
    console.log('Server is started at port no:',port);
})

