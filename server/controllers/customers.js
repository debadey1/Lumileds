var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Company = mongoose.model('Company');
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
  Customer.find()
    .sort("name")
    .deepPopulate(["company"])
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
  Customer.findById(req.params.id)
    .deepPopulate(["company"])
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
  Customer.findByIdAndUpdate(req.params.id, req.body.customer).exec()
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
  new Customer(req.body.customer)
    .save()
    .then(addToCompany)
    .catch(fail);

  function addToCompany(result) {
    res.status(200).send(result);
    return Company.findByIdAndUpdate(result.company, {$push: {employees: result._id}});
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function destroy(req, res) {
  Customer.findByIdAndRemove(req.params.id).exec()
    .then(success)
    .catch(fail);

  function success(result) {
    res.status(200).send(result);
    return Company.findByIdAndUpdate(result.company, {$pull: {employees: result._id}}).exec();
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function changeCompany(req, res) {
  // future need?
}