(function () {
  'use strict';

  angular
    .module('app')
    .factory('branchFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      all: all,
      one: one,
      edit: edit,
      changeCompany: changeCompany,
      add: add,
      remove: remove,
      amenities: amenities
    };

    return factory;
    //////////

    function all() {
      return $http.get('/branches');
    }

    function one(id) {
      return $http.get('/branches/' + id);
    }

    function edit(payload, id) {
      return $http.post('/branches/' + id, payload);
    }

    function changeCompany(payload, id) {
      return $http.put('/branches/company/' + id, payload);
    }

    function add(payload) {
      return $http.post('/branches', payload);
    }

    function remove(data) {
      return $http.delete('/branches/' + data._id);
    }

    function amenities() {
      return $http.get('/branches/amenities');
    }
  }
})();