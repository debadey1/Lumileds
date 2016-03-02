var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BranchSchema = new mongoose.Schema({
  notes: String,
  company: {type: Schema.Types.ObjectId, ref: "Company"},
  location: {type: Schema.Types.ObjectId, ref: "Location"},
  airports: [{type: Schema.Types.ObjectId, ref: "Airport"}],
  hotels: [{type: Schema.Types.ObjectId, ref: "Hotel"}],
  restaurants: [{type: Schema.Types.ObjectId, ref: "Restaurant"}],
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
BranchSchema.plugin(deepPopulate);
BranchSchema.path('company').required(true, 'Company name cannot be empty');
BranchSchema.path('location').required(true, 'Location cannot be empty');
mongoose.model('Branch', BranchSchema);
