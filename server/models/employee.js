var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var EmployeeSchema = new mongoose.Schema({
  name: String,
  phone: String,
  title: String,
  location: {type: Schema.Types.ObjectId, ref: "Location"},
  trips: [{type: Schema.Types.ObjectId, ref: "Trip"}],
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
EmployeeSchema.plugin(deepPopulate);
EmployeeSchema.path('name').required(true, 'Name cannot be empty');
mongoose.model('Employee', EmployeeSchema);
