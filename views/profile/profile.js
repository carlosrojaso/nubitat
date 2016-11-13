angular.module('starter')
.controller('profileCtrl', function($scope, $rootScope, $ionicModal, $timeout, $log, $localStorage, $firebaseObject, Auth, FURL) {
    $log.log("Profile Controller");
    $log.log("email: " + $localStorage.email);
    $rootScope.email = $localStorage.email;

    var ref = firebase.database().ref("users");

    $scope.getUser = function(){ 
    ref.orderByChild('email')
    .startAt($localStorage.email)
    .endAt($localStorage.email)
    .once('value', function(snap){
        var foundUser = snap.val();
        angular.forEach(foundUser, function(value) {
            $rootScope.user = value;
            $log.log(value);
            });
        //$log.log(foundUser);
    });
    }
    

})
;
