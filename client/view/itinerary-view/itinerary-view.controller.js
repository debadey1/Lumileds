(function () {
  'use strict';

  angular
    .module('app')
    .controller('ItineraryViewController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "itineraryFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    itineraryFactory
  ) {
    var vm = this;
    vm.itinerary_id = $routeParams.id;

    vm.edit = edit;
    vm.view = view;

    initialize();
    //////////

    function initialize() {
      getItinerary();
    }

    function getItinerary() {
      itineraryFactory.one(vm.itinerary_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.itinerary = res.data;
      }
    }

    function edit() {
      $location.path('/itinerary/' + vm.itinerary_id + '/edit');
    }

    function view(id) {
      $location.path('/itinerary/'+ vm.itinerary_id + '/visit/' + id);
    }

    function fail(err) {
      $log.log('Itinerary View Controller XHR Failed: ' + err.data);
    }
  }
})();