let i=0;

self.onmessage=function(e){
	plusCnt();
	console.log("gngn");
}

function plusCnt(){
	postMessage(++i);
	setTimeout(()=>{
		plusCnt();
	},1000);
}