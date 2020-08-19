const express= require('express');
const genresjs= require('../routes/genres.js');
const customers= require('../routes/customers.js');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const auth=require('../routes/auth');
const users=require('../routes/users');
const error= require('../middleware/error');
const returns=require('../routes/returns');

module.exports=function(app){
	
	app.use(express.json());
	app.use('/genres',genresjs);
	app.use('/customers', customers);
	app.use('/auth',auth);
	app.use('/movies', movies);
	app.use('/rentals', rentals);
	app.use('/users',users);
	app.use('/returns',returns);
	app.use(error);
}