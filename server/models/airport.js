var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AirportSchema = new mongoose.Schema({
	name: String,
  location: {type: Schema.Types.ObjectId, ref: "Location"},
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
AirportSchema.plugin(deepPopulate);
AirportSchema.path('name').required(true, 'Name cannot be empty');
AirportSchema.path('location').required(true, 'Location cannot be empty');
mongoose.model('Airport', AirportSchema);
