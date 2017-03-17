var express = require('express');
var app=express();

app.get('/', function(req, res){
	res.send(req.headers)
})

app.listen(process.env.PORT||5000, function(req, res){
	console.log('listening to port 5000 or special port')
});