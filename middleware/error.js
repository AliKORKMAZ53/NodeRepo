const winston=require('winston');

module.exports=function(err, req, res, next){
    winston.error(err.message,err);
	//log levels:
	//error
	//warn
	//info    example: if you choose info level; error, warn and info will be logged 
	//verbose
	//debug
	//silly
    res.status(500).send('something failed');
    }