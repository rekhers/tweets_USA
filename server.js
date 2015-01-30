var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var client = require('./config.js');


app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('pages/index');
	app.use("/public", express.static(__dirname + '/public'));
	
});

var port = process.env.PORT || 5000;

var stream = null;

    
   io.sockets.on("connection", function(socket){
	   console.log('connected');	
	
	
	   if(stream === null){
		var US = ['-125.0011', '24.9493', '-66.9326', '49.5904'];

		stream = client.stream('statuses/filter', {locations: US});
		stream.on('tweet', function(tweet){

		if(tweet.coordinates && tweet.coordinates != null){
				io.sockets.emit('stream', tweet);
		}		
		
		

			 });
		 }

			 });


http.listen(port);

  
