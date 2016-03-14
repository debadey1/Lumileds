var mongoose = require('mongoose');
var Visit = mongoose.model('Visit');
var Employee = mongoose.model('Employee');
var Itinerary = mongoose.model('Itinerary');
var Q = require('q');
var _ = require('lodash');
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
    .deepPopulate(["company", "branch.location", "employees", "manager", "executives"])
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
      // return Employee.update({_id:{$in:result.employees}}, {$push: {visits: result._id}}, {multi: true}).exec();
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

function destroy(req, res) {
  var visit_id = req.params.id;
  var date = new Date(req.body.date);
  var execs = req.body.executives;
      console.log(execs);

  Visit.findByIdAndRemove(visit_id).exec()
    .then(success)
    .then(updateItineraryDates)
    .then(updateItineraryExecs)
    .catch(fail);

  function success(result) {
    return Itinerary.findOneAndUpdate({visits:{$in:[visit_id]}}, {$pull: {visits: visit_id}}).deepPopulate("visits").exec();
  }
  function updateItineraryDates(result) {
    // can't send HTTP response and also have code run after it
    if (result.visits.length > 0) {
      if (date.getTime() === result.end_date.getTime()) {
        // find the next latest date in the itinerary's visits, then update the end date of the itinerary
        return Itinerary.findByIdAndUpdate(result._id, {$set: {end_date: getMaxDate(result.visits)}}).deepPopulate("visits").exec();
      } else if (date.getTime() === result.start_date.getTime()) {
        // same but with start date
        return Itinerary.findByIdAndUpdate(result._id, {$set: {start_date: getMinDate(result.visits)}}).deepPopulate("visits").exec();
      }
      return Itinerary.findById(result._id).deepPopulate("visits)").exec();
    } else {
      return Itinerary.findByIdAndRemove(result._id).exec();
    }
  }
  function updateItineraryExecs(result) {
    var promises = [];
    
    if (result.visits.length > 0) {
      var all_execs = [];

      // get all execs in one array
      for (var i = 0; i < result.visits.length; i++) {
        for (var j = 0; j < result.visits[i].executives.length; j++) {
          // convert result.visits.executives to string to compare properly below
          all_execs = _.concat(all_execs, result.visits[i].executives[j].toString());
        }
      }

      // compare itinerary execs with the execs of the visit you just removed
      // if they don't exist, pull the itinerary from that exec
      for (var i = execs.length - 1; i >= 0; i--) {
        if(!_.includes(all_execs, execs[i]._id)){
          promises.push(Employee.findByIdAndUpdate(execs[i]._id, {$pull: {itineraries: result._id}}).exec());
        }
      }

      //send success response back after checking to see if there are still visits left
      res.status(200).send(result);
      return Q.all(promises);
    } else {
      // if it's the last visit and the itinerary is going to be removed, pull the itinerary from the execs
      for (var i = 0; i < execs.length; i++) {
        promises.push(Employee.findByIdAndUpdate(execs[i]._id, {$pull: {itineraries: result._id}}).exec());
      }

      //send empty response back if the Itinerary will be removed
      res.status(204).send();
      return Employee.update({$pull: {itineraries: result._id}}, {multi: true}).exec();
    }
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function one(req, res) {
  Visit.findById(req.params.id)
    .deepPopulate(["company", "employees", "branch.location", "airport", "hotel", "manager", "executives"])
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
  var add_execs = req.body.add_execs;
  var remove_execs = req.body.remove_execs;

  var promises = [
    Visit.findByIdAndUpdate(visit_id, visit).exec()
  ];

  if (visit.date) {
    promises.push(Itinerary.findOne({visits:{$in:[visit_id]}}).deepPopulate("visits").exec());
  }
  if (req.body.remove_employees) {
    promises.push(Visit.findByIdAndUpdate(visit_id, {$pullAll: {employees: req.body.remove_employees}}).exec());
  }
  if (req.body.add_employees) {
    promises.push(Visit.findByIdAndUpdate(visit_id, {$pushAll: {employees: req.body.add_employees}}).exec());
  }
  if (remove_execs) {
    promises.push(Visit.findByIdAndUpdate(visit_id, {$pullAll: {executives: remove_execs}}).exec());
  }
  if (add_execs) {
    promises.push(Visit.findByIdAndUpdate(visit_id, {$pushAll: {executives: add_execs}}).exec());
  }

  Q.all(promises)
    .then(changeDates)
    .then(updateItineraryExecs)
    .catch(fail);

  function changeDates(result) {
    var update = {};

    if (visit.date) {
      var newDate = new Date(visit.date).getTime();
      var oldDate = result[0].date.getTime();
      var itinerary = result[1];
      var itineraryStart = itinerary.start_date.getTime();
      var itineraryEnd = itinerary.end_date.getTime();

      if (itinerary.visits.length === 1) {
        update.end_date = newDate;
        update.start_date = newDate;
      } else if (oldDate === itineraryStart) {
        if (newDate > itineraryEnd) {
          update.end_date = newDate;
          update.start_date = getMinDate(itinerary.visits);
        } else if (newDate < itineraryStart) {
          update.start_date = newDate;
        } else {
          update.start_date = getMinDate(itinerary.visits);
        }
      } else if (oldDate === itineraryEnd) {
        if (newDate > itineraryEnd) {
          update.end_date = newDate;
        } else if (newDate < itineraryStart) {
          update.start_date = newDate;
          update.end_date = getMaxDate(itinerary.visits);
        } else {
          update.end_date = getMaxDate(itinerary.visits);
        }
      } else {
        if (newDate > itineraryEnd) {
          update.end_date = newDate;
        } else if (newDate < itineraryStart) {
          update.start_date = newDate;
        } else {
          return result;
        }
      }
    }
    res.status(200).send(result);

    return Itinerary.findByIdAndUpdate(itinerary._id, {$set: update}).deepPopulate("visits").exec();
  }
  function updateItineraryExecs(result) {
    var all_execs = [];
    var promises = [];

    // push all promises into the execs to be added
    for (var i = 0; i < add_execs.length; i++) {
      promises.push(Employee.findByIdAndUpdate(add_execs[i], {$addToSet: {itineraries: result._id}}).exec());
    }

    // get all execs in one array
    for (var i = 0; i < result.visits.length; i++) {
      for (var j = 0; j < result.visits[i].executives.length; j++) {
        all_execs = _.concat(all_execs, result.visits[i].executives[j].toString()); // convert result.visits.executives to string to compare properly below
      }
    }

    // compare itinerary execs with the execs to be removed from the visit
    // if they don't exist, pull the itinerary from that exec
    for (var i = remove_execs.length - 1; i >= 0; i--) {
      if(!_.includes(all_execs, remove_execs[i])){
        promises.push(Employee.findByIdAndUpdate(remove_execs[i], {$pull: {itineraries: result._id}}).exec());
      }
    }

    return Q.all(promises);
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function getMaxDate(arr) {
  var max = arr[0].date;

  for (var i = 0; i < arr.length; i++) {
    max = arr[i].date > max ? arr[i].date : max;
  }

  return max;
}

function getMinDate(arr) {
  var min = arr[0].date;

  for (var i = 0; i < arr.length; i++) {
    min = arr[i].date < min ? arr[i].date : min;
  }

  return min;
}

module.exports = exports;