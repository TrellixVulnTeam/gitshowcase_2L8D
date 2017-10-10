window.app = angular.module('gitshowcase', ['ngAnimate', 'ngCookies','ui.bootstrap', 'ui.router', 'ngRoute']);


app.run(['$rootScope','$state', function( $rootScope, $state) {
}])

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$qProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {
      $qProvider.errorOnUnhandledRejections(false)
        $urlRouterProvider.otherwise("/mozilla/repos");        
        $stateProvider
            .state("/orgPage", {
                url: "/mozilla/repos",
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .state("/repoPage", {
                url: "/mozilla/repos/:repoName",
                templateUrl: 'views/main.html',
                controller: 'repoCtrl',
                params: {
                  repoName: null
                }
            })
            $locationProvider.hashPrefix('');
      // $locationProvider.html5Mode(true);
    }


]);

app.controller('MainCtrl', ['$scope','$state', '$rootScope','$http',
function($scope, $state, $rootScope, $http,) {

   $scope.setup = function() {
      $http({
            method: 'GET',
            url:'https://api.github.com/orgs/mozilla/repos',
            
        }).then(function(response){
            console.log(response);
            $scope.repoArray = response.data;
            console.log($scope.repoArray)
            
        }, function(error){
            console.log(error)
            
        })
        
   }
   $scope.setup();
   $scope.getDate = function(date) {
    return moment(date).format('ll');
   }
}])

