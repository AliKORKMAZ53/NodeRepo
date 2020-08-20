const winston = require('winston');
const mongoose= require('mongoose');
const config=require('config');

module.exports= function(){
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useUnifiedTopology', true);
	const db=config.get('db');
	mongoose.connect(db,{ useNewUrlParser: true })
	.then(()=>{ winston.info('connected to '+ db);
	console.log('connected to '+ db);});
	
	
}