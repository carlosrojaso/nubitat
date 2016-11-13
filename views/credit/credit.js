angular.module('starter')
.controller('creditCtrl', function($scope,$ionicPopup, $timeout, $log,  $http, $state) {
    
    
$log.log("Credit Controller");

$scope.getUser = function(){
  $scope.result = "";
  $http.get('https://api.us.apiconnect.ibmcloud.com/hackaton-2016-produccion-master/bci-hackaton-2016/cliente/perfil', {
    headers: { rut: '11114454-9',
     accept: 'application/json',
     'content-type': 'application/json' }
  })
    .success(function(data, status, headers,config){
      $log.log('data success');
      $log.log(data); // for browser console
      $scope.result = data; // for UI
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(result){
      things = result.data;
    });
};

    // Triggered on a button click, or some other target
$scope.showPopup = function() {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.wifi">',
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });

  $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
 };


 // An alert dialog
 $scope.showAlert = function() {
   //emailjs.send("sendgrid","template_1uICyvUz",{name: "Inmobiliaria Asociada", notes: "Credito Preaprobado", destiny:"inmobiliaria@dispostable"});
   //emailjs.send("sendgrid","template_1uICyvUz",{name: "Ejecutiva de Cuenta", notes: "Buena oportunidad de Credito Hipotecario", destiny:"ejecutiva@dispostable"});
   
   emailjs.send("sendgrid","template_1uICyvUz",{
     to_name: "Juan Trump", 
     message_html: "Credito Preaprobado"})
.then(
  function(response) {
    $log.log("SUCCESS", response);
    $state.go('app.products');
  }, 
  function(error) {
    $log.log("FAILED", error);
  }
);
   
   var alertPopup = $ionicPopup.alert({
     title: 'Credito',
     template: 'Credito Aprobado'
   });

   
 };
   

})
;
