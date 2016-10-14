angular.module('starter')
.controller('prodviewCtrl', function($scope, $ionicModal, $timeout, $log,  $http, $stateParams) {
    $log.log("id: " + $stateParams.productId)
    $scope.product = {};
    $log.log("Product View Controller");
    
    $http.get('https://api.mercadolibre.com/items/'+ $stateParams.productId).then(function(response){
    console.log(response.data);
    $scope.product = response.data;
    }, function(error){
        
    });
    

})
;
