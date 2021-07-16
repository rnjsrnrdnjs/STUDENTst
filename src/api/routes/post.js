const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const moment = require('moment');

const { User, Comment, Like, Memo, Note, Post, Study } = require('../../models');

const { isLoggedIn } = require('../middlewares');

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const uploads = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = (app) => {
    app.use('/post', router);

    router.post('/img', isLoggedIn, uploads.single('img'), (req, res) => {
        console.log(req.file);
        res.json({ url: `/img/${req.file.filename}` });
    });
	router.post('/profile/img', isLoggedIn,uploads.single('img'), async (req, res) => {
		try{
		await User.update(
            {
                profile: `/img/${req.file.filename}`,
            },
            {
                where: {
                    id: req.user.id,
                },
            }
        );
		res.json({ url: `/img/${req.file.filename}` });
		}catch(err){
			console.error(err);
		}
    });
    router.post('/profile', isLoggedIn, async (req, res) => {
        const user = await User.findOne({
            where: {
                id: req.user.id,
            },
        });
        await User.update(
            {
                nick: req.body.nick,
                nth: req.body.nth,
                profile: req.body.profile,
                studystart: 1,
            },
            {
                where: {
                    id: req.user.id,
                },
            }
        );

        res.redirect('/board');
    });
	
	router.post('/memo', isLoggedIn, async (req, res) => {
		try{
			await Memo.create({
				UserId:req.user.id,
				content:req.body.content,
			});
			res.json('ok');
		}catch(err){
			console.error(err);
		}
	});
    
    router.post('/write', isLoggedIn, async (req, res) => {
        const post = await Post.create({
            UserId: req.user.id,
            title: req.body.title,
            category: req.body.category,
            content: req.body.content,
            img: req.body.img,
        });
        res.redirect('/board');
    });
    router.post('/timer', isLoggedIn, async (req, res) => {
        const year = moment().format('YYYY');
        const month = moment().format('YYYY/MM');
        const day = moment().format('YYYY/MM/DD');

        const dayTimer = await Study.findOne({
            where: {
                UserId: req.user.id,
                duration: day,
            },
        });
        const monthTimer = await Study.findOne({
            where: {
                UserId: req.user.id,
                duration: month,
            },
        });
        const yearTimer = await Study.findOne({
            where: {
                UserId: req.user.id,
                duration: year,
            },
        });
        if (dayTimer) {
            const a=await Study.increment(
                {
                    time: req.body.time,
                },
                {
                    where: {
                        UserId: req.user.id,
						duration:day
                    },
                }
            );
        } else {
            await Study.create({
                UserId: req.user.id,
                time: req.body.time,
                duration: day,
            });
        }
        if (monthTimer) {
            await Study.increment(
                {
                    time: req.body.time,
                },
                {
                    where: {
                        UserId: req.user.id,
						duration:month
                    },
                }
            );
        } else {
            await Study.create({
                UserId: req.user.id,
                time: req.body.time,
                duration: month,
            });
        }
        if (yearTimer) {
            await Study.increment(
                {
                    time: req.body.time,
                },
                {
                    where: {
                        UserId: req.user.id,
						duration:year
                    },
                }
            );
        } else {
            await Study.create({
                UserId: req.user.id,
                time: req.body.time,
                duration: year,
            });
        }
		
        res.json('ok');
    });
};