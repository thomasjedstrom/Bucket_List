var mongoose = require('mongoose'),
	validate = require('mongoose-validator');

BucketListSchema = new mongoose.Schema({

	user: {
		type: Object,
	},
	title: {
		type: String,
		required: [true, "A Title is required"],
		minlength: [5, "The title must be at least 5 characters."],
	},
	description: {
		type: String,
		required: [true, "A Description is required"],
		minlength: [10, "The description must be at least 10 characters."],
	},
	tagged: {
		type: Object,
		required: [true, "Someone Must be tagged"],
	},
	checked: {
		type: Boolean,
		default: false,
	}
}, {timestamps: {
	createdAt: 'created_at',
	updatedAt: 'updated_at'
	}
})


BucketLists = mongoose.model('BucketLists', BucketListSchema);


// function titleLength(title){
// 	return title.length > 5;
// }

// var titleLength = [
//   validate({
//     validator: 'isLength',
//     arguments: [3, 50],
//     message: 'The title must be at least 5 characters.'
//   })
// ];


// console.log(BucketListSchema.path)
// BucketListSchema.path('item').validate(function(item) {
//   return title && title.length > 5;
// }, 'The title must be at least 5 characters.');

