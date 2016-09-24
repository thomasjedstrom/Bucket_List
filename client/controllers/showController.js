angular.module('app')
.controller('showController', ['$scope', '$location', 'bucketlistFactory', 'userFactory', '$routeParams', '$q', function($scope, $location, bucketlistFactory, userFactory, $routeParams, $q) {

	$scope.current_user = userFactory.getCurrentUser();
	// INDEX
	function index(){
		// Set User
		let q = $q.defer()
		userFactory.getUser($routeParams)
		.then(
			res=>{
				$scope.user = res;
				return res;
			}
		// Set BucketList
		).then(
			res=>{
				let x = $q.defer()
				bucketlistFactory.getBucketList(res.bucketlist)
				.then(
					res=>{
						console.log(res)
						$scope.bucketList = res
						x.resolve(res)
					}
				)
				return x.promise;
			}
		).then(
			userFactory.index()
			.then(
				res=>{
					$scope.users = res.data.data;
					q.resolve(res);
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