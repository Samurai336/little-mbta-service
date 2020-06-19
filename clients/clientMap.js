const mbtaClient = require("./mbtaClient.js"); 

// express middleware for setting up our clients. 
/**
 * 
 * @param {*} app express app object 
 * @param {*} config object from our config.json file containing configuration settings for the service. 
 */
module.exports = ({ app, config:{selfUrl,port,clients} }) => {
    // set up a self url for self links ease
    // it probably should not include the port in a production version 
    app.selfUrl = `http://${selfUrl}:${port}`; 

    app.use((req, res, next) => { 
        // go into our config and grab the right url configuration and set up our client
        res.locals[`${mbtaClient.name}`] = 
            new mbtaClient({mbtaApiEndpointUrl: clients[`${mbtaClient.name}`].url}); 
        return next();
    });
}