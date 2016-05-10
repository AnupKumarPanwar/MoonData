var express = require('express'); 
var app = express();
var fs=require('fs');
var SunCalc = require('suncalc');
var getJSON = require('get-json');

app.get('/lat/:la/long/:lon', function(req, res)
{
	var d=new Date();
	console.log(d.toLocaleTimeString());
	console.log(d.getTime());
	var moonData={"azimuth":113.35186446895904,"altitude":11.93800171937128,"distance":403942.5968779815, "age" :0.0, "illumination" : 0.0, "stage" : "wanning", "dfs" : 150444819.46, "fm" :"22 April 2016" , "nm" : "6 May 2016"}

	var result=SunCalc.getMoonPosition(d,req.params.la , req.params.lon);
	moonData.altitude=result.altitude*180.0/3.14;
	moonData.azimuth=180.0+result.azimuth*180.0/3.14;


	getJSON('http://api.burningsoul.in/moon/'+(d.getTime()/1000)+'&callback=?', function(error,response)
	{
		moonData.age=response.age;
		moonData.illumination=response.illumination;
		moonData.stage=response.stage;
		moonData.dfs=response.DFS;
		moonData.fm=response.FM.DT;
		moonData.nm=response.NNM.DT;
		console.log(moonData);
	res.send(moonData);
	});

	

	
})

app.listen(8080);