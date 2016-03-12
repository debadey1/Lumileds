var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var Employee = mongoose.model('Employee');
var Visit = mongoose.model('Visit');
var Itinerary = mongoose.model('Itinerary');
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
    .then(removeRefs)
    .catch(fail);

  function removeRefs(result) {
    res.status(200).send(result);

    var promises = [
      Location.findByIdAndRemove(result.location).exec()
    ];

    switch(result.title) {
      case "Executive": {
        promises.push(
          Visit.update({executives: result._id}, {$pull: {executives: result._id}}, {multi: true}).exec()
        );
        break;
      }
      case "Sales Manager": {
        promises.push(
          Visit.update({manager: result._id}, {$pull: {manager: result._id}}, {multi: true}).exec()
        );
        break;
      }
      default:
        promises.push(Visit.update({employees: result._id}, {$pull: {employees: result._id}}, {multi: true}).exec());
        break;
    }

    return Q.all(promises);
  }
  function fail(err) {
    res.status(500).send(err);
  }
}