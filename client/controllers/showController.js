angular.module('app')
.controller('showController', ['$scope', '$location', 'bucketlistFactory', 'userFactory', '$routeParams', '$q', function($scope, $location, bucketlistFactory, userFactory, $routeParams, $q) {

	$scope.current_user = userFactory.getCurrentUser();
	// INDEX
	function index(){
		// Set User
		let q = $q.defer()
		userFactory.getCurrentUser()
		.then(
			res=>{
				$scope.current_user = res;
				return res	
			}
		).then(
			userFactory.getUser($routeParams)
			.then(
				res=>{
					$scope.user = res;
					return res;
				}
			)
		// Set BucketList
			.then(
				res=>{
					bucketlistFactory.getBucketList(res.bucketlist)
					.then(
						res=>{
							$scope.bucketList = res
							q.resolve(res);
						}
					)
				}
			)
		)
		return q.promise
	}
	index();

	$scope.logout = ()=>{
		userFactory.logout()
		$location.url('/');
	}
}]);