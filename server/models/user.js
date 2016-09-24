var mongoose = require('mongoose'),

UserSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	bucketlist: [{
		item: Object,
	}],

}, {timestamps: {
	createdAt: 'created_at',
	updatedAt: 'updated_at'
	}
})

Users = mongoose.model('Users', UserSchema);