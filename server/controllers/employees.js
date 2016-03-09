var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var Employee = mongoose.model('Employee');
var Q = require('q');
mongoose.Promise = Q.Promise;

var exports = {
  all: all,
  one: one,
  edit: edit,
  create: create,
  destroy: destroy
};
module.exports = exports;
//////////

function all(req, res) {
  Employee.find()
    .sort("name")
    .deepPopulate(["location"])
    .exec()
    .then(success)
    .catch(fail);

  function success(result) {
    res.status(200).send(result);
    return result;
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function one(req, res) {
  Employee.findById(req.params.id)
    .deepPopulate(["location"])
    .exec()
    .then(success)
    .catch(fail);

  function success(result) {
    res.status(200).send(result);
    return result;
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function edit(req, res) {
  var promises = [
    Employee.findByIdAndUpdate(req.params.id, req.body.employee).exec(),
    Location.findByIdAndUpdate(req.body.location_id, req.body.location).exec()
  ];
  Q.all(promises)
    .then(success)
    .catch(fail);

  function success(result) {
    res.status(200).send(result);
    return result;
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function create(req, res) {
  new Location(req.body.location)
    .save()
    .then(saveEmployee)
    .then(success)
    .catch(fail);

  function saveEmployee(result) {
    var employee = req.body.employee;
    employee.location = result._id;
    return new Employee(employee)
      .save();
  }
  function success(result) {
    res.status(200).send(result);
    return result;
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function destroy(req, res) {
  Employee.findByIdAndRemove(req.params.id)
    .exec()
    .then(removeLocation)
    .catch(fail);

  function removeLocation(result) {
    res.status(200).send(result);
    return Location.findByIdAndRemove(result.location).exec();
  }
  function fail(err) {
    res.status(500).send(err);
  }
}