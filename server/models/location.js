var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var LocationSchema = new mongoose.Schema({
	street: String,
	city: String,
	state: String,
	country: String,
	region: String,
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
LocationSchema.plugin(deepPopulate);
LocationSchema.path('region').required(true, 'Region cannot be empty');
mongoose.model('Location', LocationSchema);
