require('../models/user.js');
var mongoose 		= require('mongoose'),
	Users 			= mongoose.model('Users');


function usersController(){
	var self = this;
	this.index = function(req,res){
		return Users.find({}, function(err, result){
			(err) ? res.json({errors: err}) : res.json({data: result});
		})
	};

	this.create = function(req, res){
		return Users.create(req.body, function(err, result){
			(err) ? res.json({errors: err}) : res.json({data: result});
		})
	};

	this.login = function(req,res){
		if((req.body.name == '') || (!req.body.name)){
			return res.json({
				errors: {
					login_reg: {
						message: "Username is required",
					}
				},
				name: "Validation error"
			});				
		}
		Users.findOne({name: req.body.name}, function(err, result){
			if(err){res.json({errors: err})}
			else if(result == null) {self.create(req, res)}
			else{res.json({data: result})};
		});
	};

	this.additem = function(req, res){
		Users.findOne({_id: req.params.id}, function(err, result){
			if(err){
				return res.json({errors: err})
			}
			else{
				result.bucketlist.push(req.body);
				result.save();
				return res.json({data: result})
			};
		})
	};

}

module.exports = new usersController();