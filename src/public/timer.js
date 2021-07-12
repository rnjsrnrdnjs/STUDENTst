const time=1;
self.onmessage=function(e){
	plusCnt();
}

function plusCnt(){
	postMessage({time:time});
	setTimeout(()=>{
		plusCnt();
	},1000);
}