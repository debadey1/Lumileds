(function () {
  'use strict';

  angular
    .module('app')
    .controller('AmenitiesListController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "branchFactory"
  ];

  function controller(
    $log,
    $location,
    branchFactory
  ) {
    var vm = this;

    vm.view = view;

    initialize();
    //////////

    function initialize() {
      getBranches();
    }

    function getBranches() {
      branchFactory.amenities()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.amenities = res.data;
      }
    }

    function view(link) {
      $location.path(link);
    }

    function fail(err) {
      $log.log('Amenities List Controller XHR Failed: ', err.data);
    }
  }
})();