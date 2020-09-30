const winston = require('winston');
const mongoose= require('mongoose');
const config=require('config');

module.exports= function(){
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	//const db=config.get('db');
	mongoose.connect(config.db) // if you want local use 'mongodb://localhost'
	.then( () => {
    console.log('Connection to the Atlas Cluster is successful!')
    })
	.catch(error=>console.log(error));
	console.log('connection to database failed');
	
	
}