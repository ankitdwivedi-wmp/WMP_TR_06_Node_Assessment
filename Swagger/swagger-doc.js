const swaggerJSDoc=require('swagger-jsdoc')
const options ={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Node js API Project',
            version:'1.0.0'
        },
        servers:[
            {
                url: 'http://localhost:8000/api'
            }
        ]
    },
    apis:['./routes/operations.route.js']

}
const swaggerSpec=swaggerJSDoc(options);
module.exports = swaggerSpec;