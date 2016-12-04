angular.module('starter')
.controller('MapCtrl', function ($scope, $http, $ionicLoading, $ionicSideMenuDelegate, $log, $cordovaGeolocation) {
 $log.log("MapCtrl Controller");
  var options = {timeout: 10000, enableHighAccuracy: true};
  var _resultsNum = 100;
  var shopId = "MLC"; //TODO - choose country from user settings.
  var _URLSearch = "https://api.mercadolibre.com/sites/" + shopId + "/search";
  var myPosition = [];


 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    myPosition = position;

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
    
      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });      
    
      var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
      });
    
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });

    //$log.log("Mapa: ", $scope.map);
    $scope.searching();
    });

    
 
  }, function(error){
    console.log("Could not get location");
  });

  $scope.showInMap = function(data){

    angular.forEach(data, function(result, i)
    {
    $log.log("Marker: " + i);
    var latLng = new google.maps.LatLng(result.lat, result.long);
    $log.log("Lat: " + result.lat + "Long: " + result.long);
    var contentString = '<div id="content">'+
      '<div id="bodyContent">' +
      '<img src="' + result.thumbnail + '"/> <br/>' + 
      '<img src="https://image.freepik.com/free-icon/pins-maps-school_318-27232.jpg" width="20px"/>:' + " 3 " + 
      '<img src="http://icons.iconarchive.com/icons/icons8/windows-8/512/City-Market-Square-icon.png" width="20px"/>:' + " 10" + 
      '<img src="http://image.freepik.com/free-icon/pins-hospital_318-27146.png" width="20px"/>:' + " 5" +
      '<img src="http://image.freepik.com/darmowe-ikony/kawiarnia-szpilki_318-27160.png" width="20px"/>:' + " 15" +
      '<p><b>Distancia: </b>' + Math.round(result.distance/1000) + 'km <br/>' + 
      '<a href="#/productsview/'+ result.id + '">' + result.title + '</a>' + 
      '</p>'+
      '</div>'+
      '</div>';
    var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });      
    
      var infoWindow = new google.maps.InfoWindow({
          content: contentString
      });
    
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });
    }
    );
  };

  // Search function
  $scope.searching = function(){
		
		var categories = "MLC1459";
    var n=0;
    var totalResults= _resultsNum;

    $log.log("My position:" + angular.toJson(myPosition));

		var results = [];

    _URLSearch = _URLSearch + "?item_location=lat:" + myPosition.coords.latitude + ",lon:" + myPosition.coords.latitude + "&category=" + categories + "&limit=" + _resultsNum ;
		
		$log.log("URL:" + _URLSearch);

    $http.get(_URLSearch).then(function(response){
    $log.log(response.data.results);
    $scope.products = response.data.results;

    angular.forEach($scope.products, function(result, i)
    {
      if(result.seller_address.latitude!=undefined &&result.seller_address.longitude!=undefined && result.thumbnail!=undefined){
					
					var distance = $scope.calcDistance(myPosition.coords.latitude,myPosition.coords.latitude,result.seller_address.latitude,result.seller_address.longitude);
					
					var r = {	id:result.id,
								title:result.title,
								price:result.price,
                lat:result.seller_address.latitude,
                long:result.seller_address.longitude,
								thumbnail:result.thumbnail,
								distance: parseFloat(distance),
								permalink:result.permalink,
								place: result.address.city_name,
								all:JSON.stringify(result)
							};
					results.push(r);
				}

				n++;

				// When finish read all data...
				if(n==totalResults){
					// Order function for arrays
					function compare(a,b) {
						  if (a.distance < b.distance)
						    return -1;
						  if (a.distance > b.distance)
						    return 1;
						  return 0;
					}
					// Order the data by distance
					results.sort(compare);
					
          //TODO Hide loading
					
          
					// Show data result
          $log.log("Resultados");
					$log.log(results);
          $scope.showInMap(results);
				}
			});	
    }, function(error){
        //there was an error fetching from the server
    });

    
	};

  $scope.toRad = function(Value){
	        return Value * Math.PI / 180;
    };
  
  $scope.calcDistance = function(lat1, lon1, lat2, lon2){
	      var R = 6371; // km
	      var dLat = $scope.toRad(lat2-lat1);
	      var dLon = $scope.toRad(lon2-lon1);
	      var lat1 = $scope.toRad(lat1);
	      var lat2 = $scope.toRad(lat2);

	      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	      var d = R * c;
	      return d.toFixed(1);
	    }

  $scope.nearbyPoints = function(){

  };

  

});
