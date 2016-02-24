var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var RestaurantSchema = new mongoose.Schema({
	name: String,
	phone: String,
	location: {type: Schema.Types.ObjectId, ref: "Location"},
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
RestaurantSchema.plugin(deepPopulate);
RestaurantSchema.path('name').required(true, 'Name cannot be empty');
RestaurantSchema.path('location').required(true, 'Location cannot be empty');
mongoose.model('Restaurant', RestaurantSchema);
