var mongoose = require('mongoose');
var Visit = mongoose.model('Visit');
var Itinerary = mongoose.model('Itinerary');
var Employee = mongoose.model('Employee');
var _ = require('lodash');
var Q = require('q');
mongoose.Promise = Q.Promise;

var exports = {
  all: all,
  create: create,
  destroy: destroy,
  edit: edit,
  changeRegion: changeRegion,
  one: one
};

function all(req, res) {
  Itinerary.find()
    .deepPopulate(["visits.managers", "visits.executives"])
    .exec()
    .then(success)
    .catch(fail);

  function success(result) {
    console.log("hi");
    var managers = [];
    var execs = [];
    console.log(result);

    // push all visit's managers and execs into a single array
    for (var i = 0; i < result.length; i++) {
      for (var j = 0; j < result[i].visits.length; j++) {
        result[i].visits[j]
      }
      managers = _.concat(managers, result.visits[i].managers);
      execs = _.concat(execs, result.visits[i].executives);
    }

    // package data into result
    var data = result;
    data.managers = _.uniq(managers);
    data.execs = _.uniq(execs);

    res.status(200).send(data);
    return result;
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function create(req, res) {
  var visits = req.body.visits;
  var promises = [];
  var min = visits[0].date;
  var max = visits[0].date;
  var managers = [];
  var executives = [];

  for (var i = 0; i < visits.length; i++) {
    // push into promises
    promises.push(new Visit(visits[i]).save());

    // also find min start date and max end date
    if (i > 0) {
      if (visits[i].date < min) {
        min = visits[i].date;
      } else if (visits[i].date > max) {
        max = visits[i].date;
      }
    }

    // as well as push managers and execs into itinerary
    if(!_.includes(managers, visits[i].manager)) {
      managers.push(visits[i].manager);
    }
    for (var j = 0; j < visits[i].executives.length; j++) {
      if(!_.includes(executives, visits[i].executives[j])) {
        executives.push(visits[i].executives[j]);
      }
    }
  }

  Q.all(promises)
    .then(saveItinerary)
    .then(addItineraryToExecs)
    .catch(fail);

  function saveItinerary(result) {
    var itinerary = {
      region: req.body.itinerary.region,
      start_date: min,
      end_date: max,
      managers: managers,
      executives: executives,
      visits: []
    }

    for (var i = 0; i < result.length; i++) {
      itinerary.visits.push(result[i]._id);
    }

    return new Itinerary(itinerary).save();
  }
  function addItineraryToExecs(result) {
    res.status(200).send(result);

    var promises = [];
    for (var i = 0; i < executives.length; i++) {
      promises.push(Employee.findByIdAndUpdate(executives[i], {$push: {itineraries: result._id}}).exec());
    }
    return Q.all(promises);
  }
  function fail(err) {
    console.log(err);
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
    for (var i = 0; i < result.executives.length; i++) {
      promises.push(Employee.findByIdAndUpdate(result.executives[i], {$pull: {itineraries: result._id}}).exec()); 
    }
    return Q.all(promises);
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function one(req, res) {
  Itinerary.findById(req.params.id)
    .deepPopulate(["visits.branch.location", "visits.company", "visits.employees", "visits.executives.name", "visits.manager.name", "visits.airport", "visits.hotel"])
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
  var min = visits[0].date;
  var max = visits[0].date;

  for (var i = 0; i < visits.length; i++) {
    // push into promises
    promises.push(new Visit(visits[i]).save());

    // also find min start date and max end date
    if (i > 0) {
      if (visits[i].date < min) {
        min = visits[i].date;
      } else if (visits[i].date > max) {
        max = visits[i].date;
      }
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

function changeRegion(req, res) {
  Itinerary.findByIdAndUpdate(req.params.id, {$set: req.body}).exec()
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

module.exports = exports;