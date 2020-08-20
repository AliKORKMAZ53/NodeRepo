const winston = require('winston');
const mongoose= require('mongoose');
const config=require('config');

module.exports= function(){
	
	const db=config.get('db');
	mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true, useMongoClient: true })
	.then(()=>{ winston.info('connected to '+ db)
	.catch(error=>console.log(error));
	console.log('connected to '+ db);});
	
	
}