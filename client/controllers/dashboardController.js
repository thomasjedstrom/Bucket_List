angular.module('app')
.controller('dashboardController', ['$scope', '$location', 'userFactory', 'bucketlistFactory', '$q', function($scope, $location, userFactory, bucketlistFactory, $q) {

	//////////////////////////////////////////PRIVATE

	// CHECK FOR LOGIN
	function checkLogin(){
		if(Object.keys($scope.current_user).length == 0){
			alert("Sorry, you were logged out, please log back in")
			return $location.url('/');
		}
	}

	// INDEX
	function index(){
		// Set User
		let q = $q.defer()
		userFactory.getCurrentUser()
		.then(
			res=>{
				$scope.current_user = res;
				return res;
			}
		// Set BucketList
		).then(
			res=>{
				let x = $q.defer()
				bucketlistFactory.getBucketList(res.bucketlist)
				.then(
					res=>{
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

	//////////////////////////////////////////PUBLIC
	$scope.bl = {};

	// Create BL Item
	$scope.create = bl=>{
		if(checkLogin()){
			return
		};
		bl.user = $scope.current_user
		bl.tagged = $scope.users.find(user=>user.name==bl.tagged)
		bucketlistFactory.create(bl)
		.then(
			res=>{
				if (res.data.errors){
					$scope.errors = res.data.errors.errors;
				}else{
					$scope.errors = [];
					$scope.bl = {};
					$scope.bucketList.push(res.data.data)
				}
			}
		)
	}

	// Check
	$scope.check = idx=>{
		let item = $scope.bucketList[idx]
		bucketlistFactory.check(item)
		.then(
			res=>$scope.bucketList.splice(idx, 1, res.data.data)
		)
	}

	// UnCheck
	$scope.uncheck = idx=>{
		let item = $scope.bucketList[idx]
		bucketlistFactory.uncheck(item)
		.then(
			res=>$scope.bucketList.splice(idx, 1, res.data.data)
		)
	}


	$scope.logout = function(){
		userFactory.logout()
		$location.url('/');	
	}
}]);