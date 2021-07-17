const passport=require('passport');
const naverStrategy=require('passport-naver').Strategy;
const User=require('../models/user');

module.exports=()=>{
	passport.use(new naverStrategy({
		clientID:process.env.NAVER_clientID,
		clientSecret:process.env.NAVER_clientSecret,
		callbackURL:'/auth/naver/callback',
	},async(accessToken,refreshToken,profile,done)=>{
		console.log('naver profile',profile);
		try{
			const exUser=await User.findOne({
				where:{snsId:profile.id,provider:'naver'},
			});
			if(exUser){
				done(null,exUser);
			}else{
				const newUser=await User.create({
					snsId:profile.id,
					provider:'naver',
				});
				done(null,newUser);
			}
		}catch(err){
			console.error(err);
			done(err);
		}
	}));
};
