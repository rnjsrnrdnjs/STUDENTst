const express=require('express');
const router=express.Router();

const { User,Comment,Like,Memo,Note,Post,Study } = require('../../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op; 
const {isLoggedIn,isNotLoggedIn}=require('../middlewares');
const passport=require('passport');

module.exports=(app)=>{
	app.use('/',router);
	router.use((req,res,next)=>{
	/* res.locals 값추가 가능*/
		res.locals.user=req.user;
		next();
	});
	router.get('/',isNotLoggedIn,(req,res,next)=>{
		res.render('first');
	});
	router.get('/board',isLoggedIn,async(req,res,next)=>{
		try{
			const talk=await Post.findAll({
				include:{
					model:User,
				},
				where:{
					category:"talk",
				},
				order: [['createdAt', 'DESC']],
			});
			const pass=await Post.findAll({
				include:{
					model:User,
				},
				where:{
					category:"pass",
				},
				order: [['createdAt', 'DESC']],
			});
			res.render('board',{
				talk,pass,
			});
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
	router.get('/profile',isLoggedIn,async(req,res,next)=>{
		try{
			res.render('profile');
		}catch(err){
			console.error(err);
		}
	});
	router.get('/write',isLoggedIn,async(req,res,next)=>{
		try{
			res.render('write');
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
	}),async(req,res)=>{
		// 추가 로그인 화면 으로 리다이렉트
		const user=await User.findOne({
			where:{
				id:req.user.id,
			}
		});
		if(user.nick)res.redirect('/board');
		else	
			res.redirect('/profile');
	});
}

