var users	 	= require('../controllers/users.js'),
	bucketlists		= require('../controllers/bucketlists.js');

module.exports = function(app){
	app.get('/users/index', users.index);
	app.post('/users/create', users.create);
	app.post('/users/login', users.login);
	app.post('/users/additem/:id', users.additem);

	app.get('/bucketlists/index', bucketlists.index);
	app.post('/bucketlists/create', bucketlists.create);
	app.post('/bucketlists/check/:id', bucketlists.check);
	app.post('/bucketlists/uncheck/:id', bucketlists.uncheck);

}