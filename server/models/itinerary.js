var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ItinerarySchema = new mongoose.Schema({
	start_date: Date,
	end_date: Date,
	region: String,
	managers: [{type: Schema.Types.ObjectId, ref: "Employee"}],
	executives: [{type: Schema.Types.ObjectId, ref: "Employee"}],
	visits: [{type: Schema.Types.ObjectId, ref: "Visit"}],
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
ItinerarySchema.plugin(deepPopulate);
ItinerarySchema.path('visits').required(true, 'Visits cannot be empty');
ItinerarySchema.path('region').required(true, 'Region cannot be empty');
mongoose.model('Itinerary', ItinerarySchema);