var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var VisitSchema = new mongoose.Schema({
	date: Date,
	region: String,
	company: {type: Schema.Types.ObjectId, ref: "Company"},
	itinerary: {type: Schema.Types.ObjectId, ref: "Itinerary"},
	branch: {type: Schema.Types.ObjectId, ref: "Branch"},
	employees: [{type: Schema.Types.ObjectId, ref: "Employee"}],
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
VisitSchema.plugin(deepPopulate);
VisitSchema.path('date').required(true, 'Date cannot be empty');
VisitSchema.path('region').required(true, 'Region cannot be empty');
VisitSchema.path('company').required(true, 'Company cannot be empty');
VisitSchema.path('itinerary').required(true, 'Itinerary cannot be empty');
VisitSchema.path('branch').required(true, 'Branch cannot be empty');
mongoose.model('Visit', VisitSchema);