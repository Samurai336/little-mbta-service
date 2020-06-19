const express = require('express'); 
const bodyParser = require('body-parser'); 
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes.js');
const clients = require('./clients/clientMap.js');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const config = require('./config.json');
const app = express(); 


// Off the shelf Middleware for express. 
// parses incoming JSON. 
app.use(bodyParser.json());

// Helps express host a swagger documentation page. 
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// custom middleware to make my life easier.
// sets up clients we will need. 
clients({app, config});
// sets up the routes we will need. 
routes({app, config});

// start the application and print a message saying it started successfully 
app.listen (config.port, () => {
    console.log(`hello there, I am listening on ${app.selfUrl}`);
    console.log(`swagger page available at ${app.selfUrl}/swagger`);
    }); 