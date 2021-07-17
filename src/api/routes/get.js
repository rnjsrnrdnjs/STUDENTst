const express=require('express');
const router=express.Router();

const { User,Comment,Like,Memo,Note,Post,Study } = require('../../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op; 
const {isLoggedIn,isNotLoggedIn}=require('../middlewares');
const passport=require('passport');
const moment = require('moment');

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
				include:[{
					model:User,
				},{
					model:Like,
				}],
				where:{
					category:"talk",
				},
				order: [['createdAt', 'DESC']],
			});
			for(let i in talk){
				talk[i].tof="false";
				let cnt=0;
				for(let j in talk[i].Likes){
					if(talk[i].Likes[j].UserId==req.user.id && talk[i].Likes[j].toggle=="true"){
						talk[i].tof="true";
					}
					if(talk[i].Likes[j].toggle=="true"){
					   cnt++;
					}
				}
				talk[i].cnt=cnt;
			}
			const pass=await Post.findAll({
				include:[{
					model:User,
				},{
					model:Like,
				}],
				where:{
					category:"pass",
				},
				order: [['createdAt', 'DESC']],
			});
			for(let i in pass){
				pass[i].tof="false";
				let cnt=0;
				for(let j in pass[i].Likes){
					if(pass[i].Likes[j].UserId==req.user.id && pass[i].Likes[j].toggle=="true"){
						pass[i].tof="true";
					}
					if(pass[i].Likes[j].toggle=="true"){
					   cnt++;
					}
				}
				pass[i].cnt=cnt;
			}
			res.render('board',{
				talk,pass,
			});
		}catch(err){
			console.error(err);
		}
	});
	router.get('/timer',isLoggedIn,async(req,res,next)=>{
		try{
			const year = moment().format('YYYY');
      		const month = moment().format('YYYY/MM');
        	const day = moment().format('YYYY/MM/DD');

			const dayMe=await Study.findOne({
				include:{
					model:User,
				},
				where:{
					duration:day,
					UserId:req.user.id,
				}
			});
			const dayList=await Study.findAll({
				include:{
					model:User,
				},
				where:{
					duration:day,
				},
				order: [['time', 'DESC']],
			});
			const monthMe=await Study.findOne({
				include:{
					model:User,
				},
				where:{
					duration:month,
					UserId:req.user.id,
				}
			});
			const monthList=await Study.findAll({
				include:{
					model:User,
				},
				where:{
					duration:month,
				},
				order: [['time', 'DESC']],
			});
			const yearMe=await Study.findOne({
				include:{
					model:User,
				},
				where:{
					duration:year,
					UserId:req.user.id,
				}
			});
			const yearList=await Study.findAll({
				include:{
					model:User,
				},
				where:{
					duration:year,
				},
				order: [['time', 'DESC']],
			});
			let dayIdx=1,monthIdx=1,yearIdx=1;
			if(dayMe){
			for(let list in dayList){
				if(dayMe.time<list.time){
					await dayIdx++;
				}
				else break;
			}
			}
			dayIdx=(dayIdx/dayList.length).toFixed(2) *100;
			if(monthMe){
			for(let list in monthList){
				if(monthMe.time<list.time){
					await monthIdx++;
				}
				else break;
			}
			}
			monthIdx=(monthIdx/monthList.length).toFixed(2) *100;
			if(yearMe){
			for(let list in yearList){
				if(yearMe.time<list.time){
					await yearIdx++;
				}
				else break;
			}
			}
			yearIdx=(yearIdx/yearList.length).toFixed(2) *100;
			
			res.render('timer',{
				dayMe,monthMe,yearMe,
				dayList,monthList,yearList,
				dayIdx,monthIdx,yearIdx,
			});
		}catch(err){
			console.error(err);
		}
	});
	router.get('/room',isLoggedIn,async(req,res,next)=>{
		try{
			const memo=await Memo.findAll({
				where:{
					UserId:req.user.id,
				},
				order: [['createdAt', 'DESC']],
			});
			const note=await Note.findAll({
				where:{
					UserId:req.user.id,
				},
				order: [['createdAt', 'DESC']],
			});
			console.log(memo,note);
			res.render('room',{
				memo,note
			});
		}catch(err){
			console.error(err);
		}
	});
	router.get('/setting',isLoggedIn,async(req,res,next)=>{
		try{
      		const month = moment().format('YYYY/MM');
			const findDay={};

			const monthStudy=[];
			for(let i=1;i<=31;i++){
				if(i<10)
					findDay[i]=month+"/0"+i;
				else
					findDay[i]=month+"/"+i;
			}
			for(let d in findDay){
				const myStudy=await Study.findOne({
					where:{	
						UserId:req.user.id,
						duration:findDay[d],
					},
				});
				if(myStudy)await monthStudy.push( (myStudy.time/3600).toFixed(4));
				else{
					await monthStudy.push(0)
				}
			}
			res.render('setting',{
				monthStudy,
			});
		}catch(err){
			console.error(err);
		}
	});
	router.get('/mypost',isLoggedIn,async(req,res,next)=>{
		try{
			const mypost=await Post.findAll({
				include:[{
					model:User,
				},{
					model:Like,
				}],
				where:{
					UserId:req.user.id,
				},
				order: [['createdAt', 'DESC']],
			});
			for(let i in mypost){
				mypost[i].tof="false";
				let cnt=0;
				for(let j in mypost[i].Likes){
					if(mypost[i].Likes[j].UserId==req.user.id && mypost[i].Likes[j].toggle=="true"){
						mypost[i].tof="true";
					}
					if(mypost[i].Likes[j].toggle=="true"){
					   cnt++;
					}
				}
				mypost[i].cnt=cnt;
			}
			console.log(mypost);
			res.render('mypost',{
				mypost
			});
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
	router.get('/delete/real090lear',isLoggedIn,async(req,res)=>{
		await Comment.destroy({
			where:{
				UserId:req.user.id,
			},
		});
		await Like.destroy({
			where:{
				UserId:req.user.id,
			},
		});
		await Memo.destroy({
			where:{
				UserId:req.user.id,
			},
		});
		await Post.destroy({
			where:{
				UserId:req.user.id,
			},
		});
		await Study.destroy({
			where:{
				UserId:req.user.id,
			},
		});
		await User.destroy({
			where:{
				id:req.user.id,
			},
		});
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
	
	router.get('/naver',passport.authenticate('naver'));
	router.get('/auth/naver/callback',passport.authenticate('naver',{
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
	router.get('/google',passport.authenticate('google',{ scope: ['profile','email'] }));
	router.get('/auth/google/callback',passport.authenticate('google',{
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

