angular.module('app', ['ngRoute'])
.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/login.html',
		controller: 'loginController',
		controllerAs: 'loginCtrl',
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'dashboardController',
		controllerAs: 'dashboardCtrl'
	})
	.when('/user/:id', {
		templateUrl: 'partials/show.html',
		controller: 'showController',
		controllerAs: 'showCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
});