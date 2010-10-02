var sys = require('sys');
var fs = require('fs');
var express = require('express');

var params = require('./arguments').parse();

var app = express.createServer();
app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyDecoder());
    app.use(app.router);
    app.use(express.staticProvider(params.path));
});

app.error(function(err, req, res, next){
	console.log('here is an error :');
	console.log(err);
	next(err);
});

app.listen(params.port);

console.log('Sharing files from directory "' + params.path + '"');
console.log('Listening to port ' + params.port + '...');
