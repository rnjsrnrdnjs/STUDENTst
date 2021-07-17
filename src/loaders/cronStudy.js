const {CronJob} = require('cron');
const timezone = 'Asia/Seoul';
const {User}=require('../models');


module.exports =async() => {
	
	async function cmd() {
		await User.increment({ studystart: 1 });
	}
	async function cmd2() {
		await User.increment({ nth: 1 });
	}
	
	const cronfnDay = new CronJob('0 0 0 * * *',cmd,null,false,timezone);
	cronfnDay.start(); // 크론 실행
	

	const cronfnYear = new CronJob('0 0 0 1 0 *',cmd2,null,false,timezone);
	cronfnYear.start(); // 크론 실행
};