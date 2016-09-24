require('../models/bucketlist.js');
var mongoose 		= require('mongoose'),
	BucketLists 	= mongoose.model('BucketLists');


function bucketlistsController(){
	this.index = function(req,res){
		return BucketLists.find({}, function(err, result){
			(err) ? res.json({errors: err}) : res.json({data: result});
		})
	};

	this.create = function(req,res){
		return BucketLists.create(req.body, function(err, result){
			if(err){
				return res.json({errors: err})	
			}else{
				return res.json({data: result});
			}
		})
	};

	

	this.check = function(req,res){
		return BucketLists.findOne({"_id": req.params.id}, function(err, result){
			if(err){
				return res.json({errors: err});
			};
			result.checked = true;
			result.save();
			return res.json({data: result});
		});
	};

	this.uncheck = function(req,res){
		return BucketLists.findOne({"_id": req.params.id}, function(err, result){
			if(err){
				return res.json({errors: err});
			};
			result.checked = false;
			result.save();
			return res.json({data: result});
		});
	};
}

module.exports = new bucketlistsController();