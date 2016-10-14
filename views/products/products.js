angular.module('starter')
.controller('prodCtrl', function($scope, $ionicModal, $timeout, $log,  $http) {
    
    $scope.products = {};
    $log.log("Product Controller");
    $http.get('https://api.mercadolibre.com/sites/MLA/search?item_location=lat:-37.987148_-30.987148,lon:-57.5483864_-50.5483864&category=MLA1459&limit=100').then(function(response){
    console.log(response.data.results);
    $scope.products = response.data.results;
    }, function(error){
        //there was an error fetching from the server
    });

})
;
