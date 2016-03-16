var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var VisitSchema = new mongoose.Schema({
	date: Date,
	company: {type: Schema.Types.ObjectId, ref: "Company"},
	branch: {type: Schema.Types.ObjectId, ref: "Branch"},
	executives: [{type: Schema.Types.ObjectId, ref: "Employee"}],
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
VisitSchema.plugin(deepPopulate);
mongoose.model('Visit', VisitSchema);