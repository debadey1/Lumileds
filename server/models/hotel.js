var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var HotelSchema = new mongoose.Schema({
	name: String,
	phone: String,
	location: {type: Schema.Types.ObjectId, ref: "Location"},
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
HotelSchema.plugin(deepPopulate);
HotelSchema.path('name').required(true, 'Name cannot be empty');
mongoose.model('Hotel', HotelSchema);
