function initialize(){

	//United States bounding box coords
	var myCoords =  new google.maps.LatLng(37.09024, -95.712891);

	var mapOptions = {
		//North America
		center: myCoords,
		zoom: 4
		}

	var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

     
	 if(io !== undefined) {
       // Storage for WebSocket connections
       var socket = io.connect('/');

   }
   var liveTweets = new google.maps.MVCArray();
   heatmap = new google.maps.visualization.HeatmapLayer({
     data: liveTweets,
     radius: 25
   });
   heatmap.setMap(map);

     
	//listens on stream channel
   socket.on('stream', function(tweet) {
   
   //longitude and latitutde are reveresed in place object
   	var tweetLocation = new google.maps.LatLng(tweet.coordinates.coordinates[1], tweet.coordinates.coordinates[0]);
    liveTweets.push(tweetLocation);
	
 	var image = 'public/images/small-dot-icon.png';
     var marker = new google.maps.Marker({
       position: tweetLocation,
		 map: map,
		icon: image
	      });
 
     setTimeout(function(){
       marker.setMap(null);
     }, 700);
 	


});


}

