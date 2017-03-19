var express = require('express');
const path =  require('path');
var request = require('request');
var bodyParser = require('body-parser');
var useragent = require('useragent');

var app=express();

//Variables to display
var language;
var ipAddress;
var location;
var result;
var OS

app.use( bodyParser.json() );    
app.use(bodyParser.urlencoded({extended: false})); 

app.get('/', function(req, res){
	var agent = useragent.parse(req.headers['user-agent'])

console.log(agent.os.toString());
	// res.sendFile(__dirname + '/index.html')
	language = 'accept-language';
	language=req.headers[language];
	ipAddress ="x-forwarded-for";
	ipAddress = req.headers[ipAddress];
	OS = useragent.parse(req.headers['user-agent']).os.toString();
	console.log(ipAddress)

	var options ={
		url: 'http://freegeoip.net/json/'+ ipAddress
	}
	request(options, function(err, response, body){
		if(!err && response.statusCode==200){
			var body = JSON.parse(body);
			location = {'region': body.region_name, 'city':body.city_name, 'zipcode':body.zip_code};
			console.log('Got location')
			result={'language':language, 'IP Address': ipAddress, 'region': location.region, 'zipcode': location.zipcode, 'OS':OS};
			res.json(result);
		}
		if(err){
			console.log('erro')
		}		
	})
});

//Make a post request from the browser to get the OS info from the page itself
// app.post('/', function(req, res){
// 	OS=Object.keys(req.body)[0];
// 	result={'language':language, 'IP Address': ipAddress, 'region': location.region, 'zipcode': location.zipcode, 'OS':OS}
// 	console.log(result);
// 	console.log('post');
// 	// res.writeHead(200, {'Content-Type': 'text/plain'});
// 	res.json(result);
// 	res.end();
// 	// res.json({name: 'toby'})

// 	});

app.listen(process.env.PORT||5000, function(req, res){
	console.log('listening to port 5000 or special port')
});
