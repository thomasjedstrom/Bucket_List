angular.module('app')
.factory('bucketlistFactory', ['$http', '$q', 'userFactory', function($http, $q, userFactory) {

	var bucketlists = [];

	function bucketlistFactory(){
		var self = this;

		
////////// httpPromise
		function httpP(req){
			let q = $q.defer();
			req.then(
				res=>(res.data.errors)?q.reject(res):q.resolve(res),
				err=>q.reject(err)
			);
			return q.promise;
		}

////////// Initialize BucketLists in Factory
		this.index = function(){
			return httpP($http.get('/bucketlists/index'))
			.then(
				ret=>{
					bucketlists = ret.data;
					return ret;
				}
			)
		};

////////// Create BucketList
		this.create = function(bucketlist){
			return httpP($http.post('/bucketlists/create', bucketlist))
			.then(
				ret=>{
					return userFactory.addItem(ret.data.data)
					.then(
						res=>{
							bucketlists =[];
							return ret
						}
					)
				},
				err=>{
					return err
				}
			)
		} 

////////// Get a BucketList
		this.getBucketList = function(array){
			function findBucketList(x){
				for (y in array){
					if(x._id == array[y]._id){
						return x._id == array[y]._id;	
					}
				}
			}
			return this.index()
			.then(
				res=>{
					 return bucketlists.data.filter(findBucketList)
				}
			)
		};

/////////// Check
		this.check = function(item){
			return httpP($http.post('/bucketlists/check/' + item._id))
			.then(ret=>{
				bucketlists = [];
				return ret;
			})
		}

/////////// CUnheck
		this.uncheck = function(item){
			return httpP($http.post('/bucketlists/uncheck/' + item._id))
			.then(ret=>{
				bucketlists = [];
				return ret;
			})
		}
	}
	return new bucketlistFactory();
}]);