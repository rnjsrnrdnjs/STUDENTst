const express=require('express');
const router=express.Router();

const { User } = require('../../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op; 
const {isLoggedIn,isNotLoggedIn}=require('../middlewares');
const passport=require('passport');

module.exports=(app)=>{
	app.use('/',router);
	router.use((req,res,next)=>{
	/* res.locals 값추가 가능*/
		res.locals.user=req.user;
		console.log(req.user);
		next();
	});
	router.get('/',isNotLoggedIn,(req,res,next)=>{
		res.render('first');
	});
	router.get('/board',isLoggedIn,async(req,res,next)=>{
		try{
			
			res.render('board');
		}catch(err){
			console.error(err);
		}
	});
	router.get('/timer',isLoggedIn,async(req,res,next)=>{
		try{
			
			res.render('timer');
		}catch(err){
			console.error(err);
		}
	});
	router.get('/room',isLoggedIn,async(req,res,next)=>{
		try{
			
			res.render('room');
		}catch(err){
			console.error(err);
		}
	});
	router.get('/setting',isLoggedIn,async(req,res,next)=>{
		try{
			
			res.render('setting');
		}catch(err){
			console.error(err);
		}
	});
	router.get('/logout',isLoggedIn,(req,res)=>{
		req.logout();
		req.session.destroy();
		res.redirect('/');
	});
	router.get('/kakao',passport.authenticate('kakao'));
	router.get('/auth/kakao/callback',passport.authenticate('kakao',{
		failureRedirect:'/',
	}),(req,res)=>{
		console.log(123);
		res.redirect('/board');
	});
}

