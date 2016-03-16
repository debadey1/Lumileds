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
    vm.predicate = "company";
    vm.reverse = false;

    vm.order = order;

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

    function order(p) {
      vm.reverse = (vm.predicate === p) ? !vm.reverse : false;
      vm.predicate = p;
    }

    function view(link) {
      $location.path(link);
    }

    function fail(err) {
      $log.log('Amenities List Controller XHR Failed: ', err.data);
    }
  }
})();