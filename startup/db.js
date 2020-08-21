const winston = require('winston');
const mongoose= require('mongoose');
const config=require('config');

module.exports= function(){
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	//const db=config.get('db');
	mongoose.connect(process.env.MONGODB_URI, { dbName: vidlydb })
	.then( () => {
    console.log('Connection to the Atlas Cluster is successful!')
    })
	.catch(error=>console.log(error));
	console.log('connected to '+ process.env.MONGODB_URI);
	
	
}