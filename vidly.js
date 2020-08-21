const express= require('express');
const app= express();
const winston = require('winston');
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

/*const p=Promise.reject(new Error('smthng went wrong'));
p.then(()=>console.log('done')); unhandled rejection error trial */

const port= process.env.PORT|| 4000;
const server=app.listen(port, ()=> winston.info('listening port '+port+'...'));
console.log('LISTENING PORT:'+port);

module.exports=server;