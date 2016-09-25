angular.module('app')
.factory('userFactory', ['$http', '$q', function($http, $q) {

	var users = [];
	var current_user = {};

	function userFactory(){
		var self = this;

////////// httpPromise
		function httpP(req){
			let q = $q.defer();
			req.then(
				res=>{
					(res.data.errors) ? q.reject(res) : q.resolve(res);
				},
				err=>q.reject(err)
			);
			return q.promise;
		}

////////// Login
		this.login = function(user){
			return httpP($http.post('/users/login', user))
			.then(
				res=>{
					current_user = res.data.data;
					return res;
				},
				err=>err
			)
		};

////////// Initialize Users in Factory
		this.index = function(){
			return httpP($http.get('/users/index'))
			.then(
				res=>{
					users = res.data.data;
					return res.data.data;
				},
				err=>err
			)
		};

////////// Add item to bucketlist
		this.addItem = function(object){
			let id = object.user._id
			if(object.user != current_user){
				self.appendItem(object)
			}
			return httpP($http.post('/users/additem/'+id, object))
			.then(
				res=>{
					current_user = res.data.data;
					return res;
				},
				err=>err
			)
		};

////////// Append item to bucketlist
		this.appendItem = function(object){
			let id = object.tagged._id
			return httpP($http.post('/users/additem/'+id, object))
			.then(
				res=>{
					users = res.data.data;
					return res;
				},
				err=>err
			)
		};
					

////////// Get a User
		this.getUser = function(idx){
			function findUser(user){
				return user._id == idx.id;
			}
			// if(users.length == 0){
			return self.index()
			.then(function(res){
				return users.find(findUser)
			})
		};



////////// Logout
		this.logout = user=>{
			current_user = {};
		};		

////////// Get Current User
		this.getCurrentUser = ()=>{
			let q = $q.defer();
			q.resolve(current_user)
			return q.promise;
		}
	}

	return new userFactory();
}]);