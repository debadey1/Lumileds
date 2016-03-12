var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var EmployeeSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  title: String,
  itineraries: [{
  	type: Schema.Types.ObjectId,
  	ref: "Itinerary",
  	unique: true
  }],
  location: {type: Schema.Types.ObjectId, ref: "Location"},
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
EmployeeSchema.plugin(deepPopulate);
EmployeeSchema.path('name').required(true, 'Name cannot be empty');
mongoose.model('Employee', EmployeeSchema);
