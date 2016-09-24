angular.module('app')
.controller('loginController', ['$scope', '$location', 'userFactory', function($scope, $location, userFactory) {

	$scope.error = null;

	$scope.login = function(user){
		userFactory.login(user)
		.then(
			res=>{
				if (res.data.errors){
					$scope.error = res.data.errors.login_reg.message;
				}else{
					$location.url('/dashboard')					
				}
			}
		)
	};


}]);