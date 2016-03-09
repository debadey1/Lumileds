var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CustomerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  title: String,
  notes: String,
  company: {type: Schema.Types.ObjectId, ref: "Company"},
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
CustomerSchema.plugin(deepPopulate);
CustomerSchema.path('name').required(true, 'Name cannot be empty');
mongoose.model('Customer', CustomerSchema);