// keys.js - deciding what set of credentials to use PROD or DEV
if (process.env.NODE_ENV === 'production'){
    // heroku - PROD
    module.exports = require('./production');
}
else{
    // local machine - DEV
    module.exports = require('./dev');
}