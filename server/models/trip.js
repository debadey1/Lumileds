var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TripSchema = new mongoose.Schema({
	start_date: Date,
	end_date: Date,
	region: String,
	company: {type: Schema.Types.ObjectId, ref: "Company"},
	employees: [{type: Schema.Types.ObjectId, ref: "Employee"}],
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
TripSchema.plugin(deepPopulate);
TripSchema.path('region').required(true, 'Region cannot be empty');
TripSchema.path('company').required(true, 'Company cannot be empty');
TripSchema.path('employees').required(true, 'Employees cannot be empty');
mongoose.model('Trip', TripSchema);