const passport=require('passport');
const googleStrategy=require('passport-google-oauth20').Strategy;
const User=require('../models/user');

module.exports=()=>{
	passport.use(new googleStrategy({
		clientID:process.env.GOOGLE_clientID,
		clientSecret:process.env.GOOGLE_clientSecret,
		callbackURL:'/auth/google/callback',
	},async(accessToken,refreshToken,profile,done)=>{
		console.log('google profile',profile);
		try{
			const exUser=await User.findOne({
				where:{snsId:profile.id,provider:'google'},
			});
			if(exUser){
				done(null,exUser);
			}else{
				const newUser=await User.create({
					snsId:profile.id,
					provider:'google',
				});
				done(null,newUser);
			}
		}catch(err){
			console.error(err);
			done(err);
		}
	}));
};
