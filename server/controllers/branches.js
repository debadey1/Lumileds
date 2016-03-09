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
  changeCompany: changeCompany,
  one: one
};
module.exports = exports;
///////////

function all(req, res) {
  Branch.find()
    .deepPopulate(["company", "location"])
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

function create(req, res) {
  new Location(req.body.branch_location).save()
    .then(saveBranch)
    .then(addBranchToCompany)
    .catch(fail);

  function saveBranch(result) {
    var branch = req.body.branch;
    branch.location = result._id;
    return new Branch(branch).save();
  }
  function addBranchToCompany(result) {
    res.status(200).send(result);
    return Company.findByIdAndUpdate(result.company, {$push: {branches: result._id}}).exec();
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function destroy(req, res) {
  Branch.findByIdAndRemove(req.params.id).exec()
    .then(removeAmenities)
    .then(removeAmenitiesLocations)
    .catch(fail);

  function removeAmenities(result) {
    res.status(200).send(result);

    var promises = [
      Location.findByIdAndRemove(result.location).exec(),
      Company.findByIdAndUpdate(result.company, {$pull: {branches: result._id}}).exec()
    ];

    for (var i = 0; i < result.airports.length; i++) {
      promises.push(Airport.findByIdAndRemove(result.airports[i]).exec());
    }
    for (var i = 0; i < result.hotels.length; i++) {
      promises.push(Hotel.findByIdAndRemove(result.hotels[i]).exec());
    }
    for (var i = 0; i < result.restaurants.length; i++) {
      promises.push(Restaurant.findByIdAndRemove(result.restaurants[i]).exec());
    }
    return Q.all(promises);
  }
  function removeAmenitiesLocations(result) {
    var promises = [];
    for (var i = 2; i < result.length; i++) {
      promises.push(Location.findByIdAndRemove(result[i].location).exec());
    }

    return Q.all(promises);
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function one(req, res) {
  Branch.findById(req.params.id)
    .deepPopulate(["company", "location", "airports.location", "hotels.location", "restaurants.location"])
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
    Branch.findByIdAndUpdate(req.params.id, req.body.branch).exec(),
    Location.findByIdAndUpdate(req.body.location_id, req.body.location, {new: true}).exec()
  ];
  Q.all(promises)
    .then(success)
    .catch(fail);

  function success(result) {
    res.status(200).send();
    return result;
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function changeCompany(req, res) {
  var promises = [
    Branch.findByIdAndUpdate(req.params.id, req.body.branch).exec(),
    Company.findByIdAndUpdate(req.body.company, {$push: {branches: req.params.id}})
  ]

  Q.all(promises)
    .then(success)
    .catch(fail);

  function success(result) {
    res.status(200).send();
    return Company.findByIdAndUpdate(result[0].company, {$pull: {branches: result[0]._id}}).exec();
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

