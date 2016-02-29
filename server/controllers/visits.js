var mongoose = require('mongoose');
var Visit = mongoose.model('Visit');
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
  var date = new Date(req.body.date);
  Visit.findByIdAndRemove(visit_id).exec()
    .then(success)
    .then(updateItineraryDates)
    .catch(fail);

  function success(result) {
    return Itinerary.findOneAndUpdate({visits:{$in:[visit_id]}}, {$pull: {visits: visit_id}}).deepPopulate("visits").exec();
  }
  function updateItineraryDates(result) {
    if (result.visits.length > 0) {
      //send response back after checking to see if there are still visits left
      res.status(200).send(result);

      if (date.getTime() === result.end_date.getTime()) {
        // find the next latest date in the itinerary's visits, then update the end date of the itinerary
        return Itinerary.findByIdAndUpdate(result._id, {$set: {end_date: getMaxDate(result.visits)}});
      } else if (date.getTime() === result.start_date.getTime()) {
        // same but with start date
        return Itinerary.findByIdAndUpdate(result._id, {$set: {start_date: getMinDate(result.visits)}});
      }
      return result;
    } else {
      //send empty response back if the Itinerary will be removed
      res.status(204).send();
      return Itinerary.findByIdAndRemove(result._id).exec();
    }
  }
  function fail(err) {
    res.status(500).send(err);
  }
}

function one(req, res) {
  Visit.findById(req.params.id)
    .deepPopulate(["company", "employees", "branch.location"])
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

  var promises = [
    Visit.findByIdAndUpdate(visit_id, visit).exec(),
    Visit.findByIdAndUpdate(visit_id, {$pullAll: {employees: req.body.remove_employees}}).exec(),
    Visit.findByIdAndUpdate(visit_id, {$pushAll: {employees: req.body.add_employees}}).exec(),
    Itinerary.findOne({visits:{$in:[visit_id]}}).deepPopulate("visits").exec()
  ];
  Q.all(promises)
    .then(success)
    .catch(fail);

  function success(result) {
    var newDate = new Date(visit.date).getTime();
    var oldDate = result[0].date.getTime();
    var itinerary = result[3];
    var itineraryStart = itinerary.start_date.getTime();
    var itineraryEnd = itinerary.end_date.getTime();
    var update = {};

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
    res.status(200).send(result);

    return Itinerary.findByIdAndUpdate(itinerary._id, {$set: update}).exec();
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