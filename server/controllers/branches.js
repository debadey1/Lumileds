var mongoose = require('mongoose');
var Branch = mongoose.model('Branch');
var Location = mongoose.model('Location');
var Airport = mongoose.model('Airport');
var Hotel = mongoose.model('Hotel');
var Restaurant = mongoose.model('Restaurant');
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
  Branch.find()
    .deepPopulate(["company", "location"])
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
  new Location(req.body.branch_location).save()
    .then(function (result) {
      var branch = req.body.branch;
      branch.location = result._id;
      return new Branch(branch).save();
    })
    .then(function (result) {
      res.status(200).send(result);
      return Company.findByIdAndUpdate(result.company, {$push: {branches: result._id}}).exec();
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function destroy(req, res) {
  Branch.findByIdAndRemove(req.params.id).exec()
    .then(function (result) {
      res.status(200).send(result);

      var promises = [
        Location.findByIdAndRemove(result.location).exec(),
        Company.findByIdAndUpdate(result.company, {$pull: {branches: result._id}}).exec(),
        Airport.find().remove({_id:{$in:result.airports}}).exec(),
        Hotel.find().remove({_id:{$in:result.hotels}}).exec(),
        Restaurant.find().remove({_id:{$in:result.restaurants}}).exec()
      ];
      return Q.all(promises);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function one(req, res) {
  Branch.findById(req.params.id)
    .deepPopulate(["company", "location", "airports.location", "hotels.location", "restaurants.location"])
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
    Branch.findByIdAndUpdate(req.params.id, req.body.branch, {new: true}).exec(),
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