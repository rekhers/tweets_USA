$(document).ready(function(){ 
	
			clearWidth = $("#tw").innerWidth();
			$('#clear').css('width', clearWidth);
	
	
			windHeight = $(window).innerHeight();

			$('#tweet-deck').css('height', windHeight);
			
			$('#map_canvas').css('height', windHeight);
			

			var tweet_arr = [];

			var socket = io.connect();
			initialize();
			socket.on('stream', function(tweet){
			tweet_arr.push(tweet);
			});		
				
			
			start_tweets();
			
			
			
			$("#clear").click(function(){
				$("#tw").empty();
			})
				
				
				function start_tweets(){
				setInterval(function(){ 
				var top_tweet = tweet_arr.shift();
				if(top_tweet){
					$('#tw').prepend('<h4>' + top_tweet.user.screen_name + ": " + top_tweet.text + '</h4>' + top_tweet.user.location  + '</br>' + '</br>');
				}
				}, 1200);		
			}
			
			
			
				});
