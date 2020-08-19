const winston = require('winston');
const mongoose= require('mongoose');
const config=require('config');

module.exports= function(){
	//const db=config.get('db');
	mongoose.connect('mongodb+srv://vidlyuser:conqueror53@cluster0.jjv7i.mongodb.net/vidlydb?retryWrites=true&w=majority',
	{useNewUrlParser: true})
	.then(()=>{ winston.info('connected to '+ db);
	console.log('connected to '+ db);});
	
}