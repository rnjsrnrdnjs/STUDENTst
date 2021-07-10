const express=require('express');
const router=express.Router();

module.exports=(app)=>{
	app.use('/',router);
	router.use((req,res,next)=>{
	/* res.locals 값추가 가능*/
		next();
	});
	router.get('/',(req,res,next)=>{
		res.render('first');
	});
	router.get('/board',async(req,res,next)=>{
		try{
			
			res.render('board');
		}catch(err){
			console.error(err);
		}
	});
	router.get('/timer',async(req,res,next)=>{
		try{
			
			res.render('timer');
		}catch(err){
			console.error(err);
		}
	});
	router.get('/room',async(req,res,next)=>{
		try{
			
			res.render('room');
		}catch(err){
			console.error(err);
		}
	});
	router.get('/setting',async(req,res,next)=>{
		try{
			
			res.render('setting');
		}catch(err){
			console.error(err);
		}
	});
	
}

