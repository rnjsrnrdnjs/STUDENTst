const express=require('express');
const router=express.Router();
const path=require('path');
const fs=require('fs');

const {isLoggedIn}=require('./middlewares');

try{
	fs.readdirSync('uploads');
}catch(error){
	console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
	fs.mkdirSync('uploads');
}
const uploads=multer({
	storage:multer.diskStorage({
		destination(req,file,cb){
			cb(null,'uploads/');
		},
		filename(req,file,cb){
			const ext=path.extname(file.originalname);
			cb(null,path.basename(file.originalname,ext)+Data.now()+ext);
		},
	}),
	limits:{fileSize:5*1024*1024},
});



module.exports=(app)=>{
	app.use('/post',router);
	
	router.post('/img',isLoggedIn,upload.single('img'),(req,res)=>{
		console.log(req.file);
		res.json({url:`/img/${req.file.filename}`});
	});
	
}
