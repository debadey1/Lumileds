var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Location = mongoose.model('Location');
var Visit = mongoose.model('Visit');
var Company = mongoose.model('Company');
var Q = require('q');
mongoose.Promise = Q.Promise;


var exports = {
  all: all,
  create: create,
  createLumileds: createLumileds,
  destroy: destroy,
  edit: edit,
  one: one,
  lumileds: lumileds
};

function all(req, res) {
  Employee.find()
    .sort("name")
    .deepPopulate(["location", "company"])
    .exec()
    .then(function (result) {
      console.log(result);
      res.status(200).send(result);
      return result;
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function lumileds(req, res) {
  Employee.find({lumileds: true})
    .sort("name")
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
  new Employee(req.body.employee)
    .save()
    .then(function (result) {
      res.status(200).send(result);
      return Company.findByIdAndUpdate(result.company, {$push: {employees: result._id}});
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function createLumileds(req, res) {
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
    Visit.findOneAndUpdate({employees:{$in:[emp_id]}}, {$pull: {employees: emp_id}}).exec()
  ];
  Q.all(promises)
    .then(function (result) {
      res.status(200).send(result[0]);
      var promises = [
        Location.findByIdAndRemove(result[0].location).exec(),
        Company.findByIdAndUpdate(result[0].company, {$pull: {employees: result[0]._id}}).exec()
      ]
      return Q.all(promises);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function one(req, res) {
  Employee.findById(req.params.id)
    .deepPopulate(["location", "visits", "company"])
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
    Employee.findByIdAndUpdate(req.params.id, req.body.employee).exec(),
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