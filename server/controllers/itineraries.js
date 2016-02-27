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
  Itinerary.find()
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
  var visits = req.body.visits;
  var promises = [];
  var min = visits[0].start_date;
  var max = visits[0].end_date;

  for (var i = 0; i < visits.length; i++) {
    // push into promises
    promises.push(new Visit(visits[i]).save());

    // also find min start date and max end date
    if (i > 0) {
      min = visits[i].start_date < min ? visits[i].start_date : min;
      max = visits[i].end_date > max ? visits[i].end_date : max;
    }
  }

  Q.all(promises)
    .then(saveItinerary)
    .then(success)
    .catch(fail);

  function saveItinerary(result) {
    var itinerary = {
      start_date: min,
      end_date: max,
      visits: []
    }

    for (var i = 0; i < result.length; i++) {
      itinerary.visits.push(result[i]._id);
    }

    return new Itinerary(itinerary).save();
  }
  function success(result) {
    res.status(200).send(result);
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function destroy(req, res) {
  var itinerary_id = req.params.id;
  Itinerary.findByIdAndRemove(itinerary_id).exec()
    .then(success)
    .catch(fail);

  function success(result) {
    res.status(200).send(result);
    var promises = [];
    for (var i = 0; i < result.visits.length; i++) {
      promises.push(Visit.findByIdAndRemove(result.visits[i]).exec());
    }
    return Q.all(promises);
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function one(req, res) {
  Itinerary.findById(req.params.id)
    .deepPopulate(["visits.branch.location", "visits.company", "visits.employees"])
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
  var itinerary_id = req.params.id;
  var visits = req.body.visits;
  var promises = [];
  var min = visits[0].start_date;
  var max = visits[0].end_date;

  for (var i = 0; i < visits.length; i++) {
    // push into promises
    promises.push(new Visit(visits[i]).save());

    // also find min start date and max end date
    if (i > 0) {
      min = visits[i].start_date < min ? visits[i].start_date : min;
      max = visits[i].end_date > max ? visits[i].end_date : max;
    }
  }

  Q.all(promises)
    .then(pushVisits)
    .then(updateItinerary)
    .then(success)
    .catch(fail);

  function pushVisits(result) {
    var visit_ids = [];

    for (var i = 0; i < result.length; i++) {
      visit_ids.push(result[i]._id);
    }

    return Itinerary.findByIdAndUpdate(itinerary_id, {$pushAll: {visits: visit_ids}}).exec();
  }
  function updateItinerary(result) {
    var updatedItineraryDates = {};
    var shouldUpdate = false;

    // must cast to Date object to compare
    if (new Date(min) < result.start_date) {
      shouldUpdate = true;
      updatedItineraryDates.start_date = min;
    }
    if (new Date(max) > result.end_date) {
      shouldUpdate = true;
      updatedItineraryDates.end_date = max;
    }

    // checks to make sure we're not updating with an empty object, which would wipe the itinerary
    if (shouldUpdate) {
      return Itinerary.findByIdAndUpdate(itinerary_id, {$set: updatedItineraryDates}).exec();
    } else {
      return result;
    }
  }
  function success(result) {
    res.status(200).send(result);
    return result;
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

module.exports = exports;