var mongoose = require('mongoose');
var Trip = mongoose.model('Trip');
var Employee = mongoose.model('Employee');
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
  Trip.find()
    .deepPopulate(["company", "employees"])
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
  new Trip(req.body)
    .save()
    .then(function (result) {
      res.status(200).send(result);
      return Employee.update({_id:{$in:result.employees}}, {$push: {trips: result._id}}, {multi: true}).exec();
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function destroy(req, res) {
  var trip_id = req.params.id;
  var promises = [
    Trip.findByIdAndRemove(trip_id).exec(),
    Employee.update({trips:{$in:[trip_id]}}, {$pull: {trips: trip_id}}, {multi: true}).exec()
  ];

  Q.all(promises)
    .then(function (result) {
      res.status(200).send(result[0]);
      return result;
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function one(req, res) {
  Trip.findById(req.params.id)
    .deepPopulate(["company", "employees"])
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
  var trip_id = req.params.id;
  var trip = req.body.trip;
  console.log(trip);
  var promises = [
    Trip.findByIdAndUpdate(trip_id, trip).exec(),
    Trip.findByIdAndUpdate(trip_id, {$pullAll: {employees: req.body.remove_employees}}).exec(),
    Trip.findByIdAndUpdate(trip_id, {$pushAll: {employees: req.body.add_employees}}).exec(),
    Employee.update({_id:{$in:req.body.remove_employees}}, {$pull: {trips: trip_id}}, {multi: true}).exec(),
    Employee.update({_id:{$in:req.body.add_employees}}, {$push: {trips: trip_id}}, {multi: true}).exec()
  ];
  Q.all(promises)
    .then(function (result) {
      res.status(200).send(result);
      return result;
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send(err);
    });
}

module.exports = exports;