// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngStorage', 'ngCordova','firebase','pascalprecht.translate', ,'ngMessages'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
// Changue this for your Firebase App URL.
.constant('FURL', {
    apiKey: "AIzaSyCYDw5xIm7ZSD_L6eC-_3MUe7AHspsP8e8",
    authDomain: "asfirebaseairbnb.firebaseapp.com",
    databaseURL: "https://asfirebaseairbnb.firebaseio.com",
    storageBucket: "asfirebaseairbnb.appspot.com",
    messagingSenderId: "432355875289"
  }
  )
.config(function($stateProvider, $urlRouterProvider, $translateProvider, $translateStaticFilesLoaderProvider) {
  $translateProvider.preferredLanguage('es');
  $translateProvider.useSanitizeValueStrategy('sanitize');
  $translateProvider.fallbackLanguage("es");

  $translateProvider.useStaticFilesLoader({
          prefix: 'langs/lang-',
          suffix: '.json'
        });
  
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'views/profile/profile.html',
          controller: 'profileCtrl'
        }
      }
    })
  .state('app.payment', {
      url: '/payment',
      views: {
        'menuContent': {
          templateUrl: 'views/payment/payment.html',
          controller: 'paymentCtrl'
        }
      }
    })
  .state('app.products', {
      url: '/products',
      views: {
        'menuContent': {
          templateUrl: 'views/products/products.html',
          controller: 'prodCtrl'
        }
      }
    })
  .state('app.productsview', {
      url: '/productsview/:productId',
      views: {
        'menuContent': {
          templateUrl: 'views/products/productview.html',
          controller: 'prodviewCtrl'
        }
      }
    })
  .state('app.support', {
        url: '/support',
        views: {
          'menuContent': {
            templateUrl: 'views/support/support.html',
            controller: 'supportCtrl'
          }
        }
      })
  .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'views/about/about.html',
            controller: 'aboutCtrl'
          }
        }
      })
  .state('app.invite', {
            url: '/invite',
            views: {
              'menuContent': {
                templateUrl: 'views/invite/invite.html',
                controller: 'inviteCtrl'
              }
            }
  })
  .state('app.home', {
            url: '/home',
            views: {
              'menuContent': {
                templateUrl: 'views/home/home.html',
                controller: 'MapCtrl'
              }
            }
  })
  .state('login', {
            url: '/login',
            templateUrl: 'views/login/login.html',
            controller:'loginController'
  })
  .state('register', {
            url: '/register',
            templateUrl: 'views/register/register.html',
            controller:'registerController'
  })
  .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/forgot/forgot.html',
      controller:'forgotController'
    })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})
.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})
;