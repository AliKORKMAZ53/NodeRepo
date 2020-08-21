const winston = require('winston');
const mongoose= require('mongoose');
const config=require('config');

module.exports= function(){
	
	//const db=config.get('db');
	mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true,useUnifiedTopology: true})
	.catch(error=>console.log(error));
	console.log('connected to '+ process.env.MONGODB_URI);
	
	
}