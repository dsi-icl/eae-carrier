let express = require('express');
let os = require('os');
let app = express();

let config = require('../config/eae.carrier.config.js');
let EaeCarrier = require('./eaeCarrier.js');

//Remove unwanted express headers
app.set('x-powered-by', false);

let options = Object.assign({}, config);
let carrier = new EaeCarrier(options);

carrier.start().then(function(carrier_router) {
    app.use(carrier_router);
    app.listen(config.port, function (error) {
        if (error) {
            console.error(error); // eslint-disable-line no-console
            return;
        }
        console.log(`Listening at http://${os.hostname()}:${config.port}/`); // eslint-disable-line no-console
    });
}, function(error) {
    console.error(error); // eslint-disable-line no-console
});