var mongoose = require('mongoose');
var Branch = mongoose.model('Branch');
var Location = mongoose.model('Location');
var Hotel = mongoose.model('Hotel');
var Q = require('q');
mongoose.Promise = Q.Promise;

var exports = {
  destroy: destroy,
  create: create,
  all: all,
  edit: edit,
  one: one
};

module.exports = exports;

function create(req, res) {
  new Location(req.body.location).save()
    .then(function (result) {
      var data = req.body.hotel;
      data.location = result._id;
      return new Hotel(data).save();
    })
    .then(function (result) {
      return Branch.findByIdAndUpdate(req.body.branch_id, {$push:{hotels: result._id}}).exec();
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
  var hotel_id = req.params.id;
  var promises = [
    Hotel.findByIdAndRemove(hotel_id).exec(),    
    Branch.findOneAndUpdate({hotels:{$in:[hotel_id]}}, {$pull: {hotels: hotel_id}}).exec()
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

function all(req, res) {
  Hotel.find()
    .exec()
    .then(success)
    .catch(fail);

  function success(result) {
    res.status(200).send(result);
  }
  function fail(result) {
    res.status(500).send(err);
  }
}
function one(req, res) {
  Hotel.findById(req.params.id)
    .deepPopulate(["location"])
    .exec()
    .then(success)
    .catch(fail);

  function success(result) {
    res.status(200).send(result);
  }
  function fail(result) {
    res.status(500).send(err);
  }
}
function edit(req, res) {
  var promises = [
    Hotel.findByIdAndUpdate(req.params.id, req.body.hotel, {new: true}).exec(),
    Location.findByIdAndUpdate(req.body.location_id, req.body.location, {new: true}).exec()
  ];
  Q.all(promises)
    .then(success)
    .catch(fail);

  function success(result) {
    res.status(200).send(result);
  }
  function fail(result) {
    res.status(500).send(err);
  }
}