var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ItinerarySchema = new mongoose.Schema({
	start_date: Date,
	end_date: Date,
	visits: [{type: Schema.Types.ObjectId, ref: "Visit"}],
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
ItinerarySchema.plugin(deepPopulate);
ItinerarySchema.path('visits').required(true, 'Visits cannot be empty');
mongoose.model('Itinerary', ItinerarySchema);