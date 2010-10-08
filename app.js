var sys = require('sys');
var fs = require('fs');
var express = require('express');

var params = require('./arguments').parse();

var app = express.createServer();
app.configure(function(){
	app.use(express.logger({ format: ':date :status :method :url' }));
	app.use(express.methodOverride());
	app.use(express.bodyDecoder());
	app.use(app.router);
	app.use(express.staticProvider(params.path));
	app.use(require('./fileIndex')(params.path));
});

app.error(function(err, req, res, next){
	console.log('here is an error :');
	console.log(err);
	next(err);
});

app.set('view options', {
	layout: false
});

app.listen(params.port);

console.log('Sharing files from directory "' + params.path + '"');
console.log('Listening to port ' + params.port + '...');
