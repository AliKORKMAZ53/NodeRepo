const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const validateObjectId=require('../middleware/validateObjectId');
const {Genre, validate} = require('../models/genre');
const mongoose= require('mongoose');
const express= require('express');
const router=express.Router();
const Joi=require('joi');


	
router.get('/', async(req,res,next)=>{
	//throw new Error('couldnt get the genres');
		const genres= await Genre.find().sort('name');
		res.send(genres);	
});

router.get('/q', async(req,res,next)=>{
	
		let genres=await Genre.find({name: req.query.name},function(err,genre){
			if(genre.length==0) return res.status(404).send("not found");
			//this fucker never return error so this is the solution...
			
			res.send(genre);
		});
		
		
		
	
});

router.get('/:id', validateObjectId, async(req,res)=>{
	
	const genre= await Genre.findById(req.params.id);
	if(!genre) return res.status(404).send("The genre not found with that id");
	res.send(genre);
	
});

router.post('/',auth ,async(req,res)=>{
	

	const {error} =validate(req.body);
	
	if(error) return res.status(400).send(error.details[0].message);
		
	
	
	let genre= new Genre({
		name:req.body.name
	});
	genre= await genre.save();
	res.send(genre);
});

router.put('/:id', async(req,res)=>{ //auth, validateObjectId, eklenip denenecek
	const { error }= validate(req.body);
	if(error) return res.status(400).send(error.details[0].message);
	
	
	const genre=await Genre.findOneAndUpdate(req.params.id,{name:req.body.name},
		{new:true}
	);
	
	if(!genre) return res.status(404).send("The genre not found with that id");
	
    res.send(genre);
});

router.delete('/:id',[auth,admin], async(req,res)=>{
		const genre = await Genre.findByIdAndRemove(req.params.id);
	
		if(!genre) return res.status(404).send("The genre not found with that id");

		res.send(genre);
});



module.exports =router;