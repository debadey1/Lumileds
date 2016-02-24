var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Location = mongoose.model('Location');
var Trip = mongoose.model('Trip');
var Q = require('q');
mongoose.Promise = Q.Promise;


var exports = {
  all: all,
  create: create,
  destroy: destroy,
  edit: edit,
  one: one
};

function all(req, res) {
  Employee.find()
    .deepPopulate(["location"])
    .exec()
    .then(function (result) {
      res.status(200).send(result);
      return result;
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function create(req, res) {
  new Location(req.body.location)
    .save()
    .then(function (result) {
      var employee = req.body.employee;
      employee.location = result._id;
      return new Employee(employee)
        .save();
    })
    .then(function (result) {
      res.status(200).send(result);
      return result;
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function destroy(req, res) {
  var emp_id = req.params.id;
  var promises = [
    Employee.findByIdAndRemove(emp_id).exec(),    
    Trip.findOneAndUpdate({employees:{$in:[emp_id]}}, {$pull: {employees: emp_id}}).exec()
  ];
  Q.all(promises)
    .then(function (result) {
      res.status(200).send(result[0]);
      return Location.findByIdAndRemove(result[0].location).exec();
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function one(req, res) {
  Employee.findById(req.params.id)
    .deepPopulate(["location", "trips"])
    .exec()
    .then(function (result) {
      res.status(200).send(result);
      return result;
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function edit(req, res) {
  var promises = [
    Employee.findByIdAndUpdate(req.params.id, req.body.employee, {new: true}).exec(),
    Location.findByIdAndUpdate(req.body.location_id, req.body.location, {new: true}).exec()
  ];
  Q.all(promises)
    .then(function (result) {
      res.status(200).send(result);
      return result;
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

module.exports = exports;