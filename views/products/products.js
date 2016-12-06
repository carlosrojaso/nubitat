angular.module('starter')
.controller('prodCtrl', function($scope, $ionicModal, $timeout, $log,  $http, $cordovaGeolocation, MLAPI, Utils) {
    
    $scope.products = {};
    $log.log("Product Controller");
    Utils.show();
    var options = {timeout: 3000, enableHighAccuracy: false};
    var _resultsNum = 100;
    var shopId = "MLC"; //TODO - choose country from user settings.
    var _URLSearch = MLAPI.url + "/sites/" + shopId + "/search";
    var categories = "MLC1459";
    var n=0;
    var totalResults= _resultsNum;
    var myPosition = '';

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var lat  = position.coords.latitude;
    var long = position.coords.longitude;
    $log.log("Mi pos:" + lat + "long: " + long);
    myPosition = position;
    var results = [];

    _URLSearch = _URLSearch + "?item_location=lat:" + myPosition.coords.latitude + ",lon:" + myPosition.coords.latitude + "&category=" + categories + "&limit=" + _resultsNum ;
		
	$log.log("URL:" + _URLSearch);

    $http.get(_URLSearch).then(function(response){
    $log.log(response.data.results);
    $scope.products = response.data.results;
    Utils.hide();
    }, function(error){
        //there was an error fetching from the server
        Utils.hide();
    });
     }, function(error){
    console.log("Could not get location");
    Utils.hide();
     });

	

})
;
