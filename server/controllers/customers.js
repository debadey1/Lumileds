var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Company = mongoose.model('Company');
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
  Customer.find()
    .deepPopulate(["company"])
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
  new Customer(req.body)
    .save()
    .then(function (result) {
      res.status(200).send(result);
      return Company.findByIdAndUpdate(req.body.company, {$push: {customers: result._id}}).exec();
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function destroy(req, res) {
  var promises = [
    Customer.findByIdAndRemove(req.params.id).exec(),
    Company.findOneAndUpdate({customers:{$in:[req.params.id]}}, {$pull: {customers: req.params.id}}).exec()
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
  Customer.findById(req.params.id)
    .deepPopulate(["company"])
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
  var cust_id = req.params.id;
  var cust = req.body.customer;
  var promises = [
    Customer.findByIdAndUpdate(cust_id, cust).exec(),
    Company.findOneAndUpdate({customers:{$in:[cust_id]}}, {$pull: {customers: cust_id}}).exec(),
    Company.findByIdAndUpdate(cust.company, {$push: {customers: cust_id}}).exec()
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