'Use Strict';
angular.module('starter').controller('registerController', function ($scope, $state, $localStorage, $location,$http,$ionicPopup, $log, $firebaseObject, Auth, FURL, Utils) {
  $log.log("Register controller");
  $scope.register = function(user) {
    if(angular.isDefined(user)){
    Utils.show();

    user.name = "";
    user.lastname = "";
    user.iden = "";
    user.bank = "";
    user.registered = Date();
    
    Auth.register(user)
      .then(function() {
         Utils.hide();
         console.log("Antes de loguear:" + JSON.stringify(user));
         Utils.alertshow("Successfully","The User was Successfully Created.");
         $location.path('/');
      }, function(err) {
         Utils.hide();
         Utils.errMessage(err);
      });
    }
  };

}
);
