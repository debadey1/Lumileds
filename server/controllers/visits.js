var mongoose = require('mongoose');
var Visit = mongoose.model('Visit');
var Itinerary = mongoose.model('Itinerary');
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
  Visit.find()
    .deepPopulate(["company", "branch.location", "employees"])
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
  new Visit(req.body)
    .save()
    .then(function (result) {
      res.status(200).send(result);
      return Employee.update({_id:{$in:result.employees}}, {$push: {visits: result._id}}, {multi: true}).exec();
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function destroy(req, res) {
  var visit_id = req.params.id;
  var promises = [
    Visit.findByIdAndRemove(visit_id).exec(),
    Itinerary.update({visits:{$in:[visit_id]}}, {$pull: {visits: visit_id}}).exec()
  ];

  Q.all(promises)
    .then(success)
    .catch(fail);

  function success(result) {
    res.status(200).send(result[0]);
    return result;
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function one(req, res) {
  Visit.findById(req.params.id)
    .deepPopulate(["company", "employees", "branch"])
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
  var visit_id = req.params.id;
  var visit = req.body.visit;
  console.log(visit);
  var promises = [
    Visit.findByIdAndUpdate(visit_id, visit).exec(),
    Visit.findByIdAndUpdate(visit_id, {$pullAll: {employees: req.body.remove_employees}}).exec(),
    Visit.findByIdAndUpdate(visit_id, {$pushAll: {employees: req.body.add_employees}}).exec(),
    Employee.update({_id:{$in:req.body.remove_employees}}, {$pull: {visits: visit_id}}, {multi: true}).exec(),
    Employee.update({_id:{$in:req.body.add_employees}}, {$push: {visits: visit_id}}, {multi: true}).exec()
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