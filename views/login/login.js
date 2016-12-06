'Use Strict';
angular.module('starter').controller('loginController', function ($scope, $state, $localStorage, $location,$http,$ionicPopup,$firebaseAuth , $firebaseObject,$log, Auth, FURL, Utils) {
  //var ref = new Firebase(FURL);
  var auth = $firebaseAuth();
  //firebase.initializeApp(FURL);
  var ref = firebase.database().ref();
  var userkey = "";
  $localStorage.email ="";
  $scope.signIn = function (user) {
    $log.log("Sent");


// TODO
    if(user.email === "admin@aol.com"){
      $state.go('admin.home');
      return;
    }



    if(angular.isDefined(user)){
    Utils.show();
    Auth.login(user)
      .then(function(authData) {
      $log.log("user ID:" + JSON.stringify(authData));
      $log.log("email:" + authData.email);
      //saving user info
      $localStorage.email = authData.email;
       Utils.hide();
      $state.go('intro');
      $log.log("Starter Home","Home");

      }, function(err) {
        Utils.hide();
         Utils.errMessage(err);
      });
    }
  };

  $scope.signInAnon = function () {
    $log.log("Enviado");
    Utils.show();
    auth.$signInAnonymously().then(function(firebaseUser) {
     $log.log("Signed in as:", firebaseUser.uid);
     Utils.hide();
     $state.go('app.home');
    }).catch(function(error) {
      $log.error("Authentication failed:", error);
    });
    
  };
  
  $scope.loginWithGoogle =  function(){
    //TODO Google
  };
  
  $scope.loginWithFacebook =  function(){
    //TODO facebook
  };
  
  $scope.loginWithTwitter =  function(){
    //TODO twitter
  };


});
