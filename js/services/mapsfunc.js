angular.module('starter')
.factory('MapsFunc', function() {
	var MapsFunc = {
    lat: '',
		lon: ''
	};

	return { 
		getCurrentPosition: function(){
			return MapsFunc;
		},
    setCurrentPosition: function(lat,lon){
       angular.copy(lat, MapsFunc.lat);
			 angular.copy(lon, MapsFunc.lon);
    },
    toRad: function(Value) {
      return Value * Math.PI / 180;
    },
    calcDistance: function(lat1, lon1, lat2, lon2) {
          var R = 6371; // km
	      var dLat = this.toRad(lat2-lat1);
	      var dLon = this.toRad(lon2-lon1);
	      var lat1 = this.toRad(lat1);
	      var lat2 = this.toRad(lat2);

	      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	      var d = R * c;
	      return d.toFixed(1);
    }
	};

});
