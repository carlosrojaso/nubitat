angular.module('starter')
.controller('profileCtrl', function($scope, $rootScope, $ionicModal, $timeout, $log, $localStorage) {

    $log.log("email: " + $localStorage.email);
    $rootScope.email = $localStorage.email;

})
;
