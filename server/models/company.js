var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CompanySchema = new mongoose.Schema({
  name: {type: String, unique: true},
  manager: {type: Schema.Types.ObjectId, ref: "Employee"},
  employees: [{type: Schema.Types.ObjectId, ref: "Customer"}],
  branches: [{type: Schema.Types.ObjectId, ref: "Branch"}],
  created_at: {type: Date, default: Date.now}
});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
CompanySchema.plugin(deepPopulate);
CompanySchema.path('name').required(true, 'Name cannot be empty');
mongoose.model('Company', CompanySchema);