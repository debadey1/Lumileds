(function () {
  'use strict';

  angular
    .module('app')
    .factory('employeeFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      all: all,
      one: one,
      edit: edit,
      add: add,
      remove: remove,
      executives: executives,
      managers: managers,
      execItineraries: execItineraries
    };

    return factory;
    //////////

    function all() {
      return $http.get('/employees');
    }

    function one(id) {
      return $http.get('/employees/' + id);
    }

    function edit(payload, id) {
      return $http.put('/employees/' + id, payload);
    }

    function add(payload) {
      return $http.post('/employees', payload);
    }

    function remove(id) {
      return $http.post('/employees/' + id);
    }

    function executives() {
      return $http.get('/employees/executives');
    }

    function managers() {
      return $http.get('/employees/managers');
    }

    function execItineraries(id, year) {
      return $http.get('/employees/exec-itineraries/' + id + '/' + year);
    }
  }
})();