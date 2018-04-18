/* Google map
            ------------------------------------------------*/
            var map = '';
            var center;
						var ID = "ChIJ8XijDl0ABDQRapr2bytHEHA";

            function initialize() {
                var mapOptions = {
                    zoom: 17,
                    center: new google.maps.LatLng(22.2778769,114.1674263),
                    scrollwheel: true
                };
          		      
                map = new google.maps.Map(document.getElementById('google-map'),  mapOptions);

                google.maps.event.addDomListener(map, 'idle', function() {
                  calculateCenter();
                });
            
                google.maps.event.addDomListener(window, 'resize', function() {
                  map.setCenter(center);
                });
							 var geocoder = new google.maps.Geocoder;
  						 var infowindow = new google.maps.InfoWindow;

   						 geocodePlaceId(geocoder, map, infowindow, ID);
							
            }
																																	
				function geocodePlaceId(geocoder, map, infowindow, ID) {
  				var placeId = ID;
 				  geocoder.geocode({'placeId': placeId}, function(results, status) {
  		    if (status === 'OK') {
   			   if (results[0]) {
      		  map.setZoom(17);
     		    map.setCenter(results[0].geometry.location);
     		    var marker = new google.maps.Marker({
     	      map: map,
      	    position: results[0].geometry.location
       		 });
     	    infowindow.setContent(results[0].formatted_address);
     	    infowindow.open(map, marker);
     		 } else {
        window.alert('No results found');
    	  }
  	   } else {
      window.alert('Geocoder failed due to: ' + status);
      }
 	   });
		}
																																	
            function calculateCenter() {
                center = map.getCenter();
            }

            function loadGoogleMap(){
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyA6EwNgSk2PPgCxwlyX3KkX4zkciXtXoYQ&' + 'callback=initialize';
                document.body.appendChild(script);
            }
        
            // DOM is ready
            $(function() {                
                loadGoogleMap(); // Google Map
            });
					

function change(i){
				switch(parseInt(i)) {
    case 1:
  				ID = "ChIJ8XijDl0ABDQRapr2bytHEHA";
        break;
    case 2:
  				ID = "ChIJy3iyuRtWATQRAhc8kJPQOl4";
        break;
    case 3:
  				ID = "ChIJVVowCNMABDQRz3Z9m6dLcd0";
        break;
    case 4:
  				ID = "ChIJE6gMstwABDQRlG4QcL5wZQc";
        break;
    case 5:
  				ID = "ChIJ9Zs0hU4ABDQRlnVyScLS43I";
        break;
    case 6:
  				ID = "ChIJFfM54rJXATQRNNy9ZSNemzQ";
        break;
    case 7:
  				ID = "ChIJV-5vSnsABDQRV7Nz72iQSgs";
        break;
		case 8:
  				ID = "ChIJHxnqhFwABDQRxGrMSoWakHk";
        break;
		case 9:
  				ID = "ChIJ4ZDyINQGBDQR0sgYx2F3Jbw";
        break;
		case 10:
  				ID = "ChIJm6Dpw08BBDQR9FZJtYIs5Kc";
        break;
		default:
				alert(i);
			  break;
					}
				var select = document.getElementById("SelectedLocation");
				document.getElementById("location_text").innerHTML = select.options[select.selectedIndex].text;
				initialize();
			}