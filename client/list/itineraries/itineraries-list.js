(function () {
  'use strict';

  angular
    .module('app')
    .controller('ItinerariesListController', controller);

  controller.$inject = [
    "$location",
    "itineraryFactory"
  ];

  function controller(
    $location,
    itineraryFactory
  ) {
    /* jshint validthis: true */
    var vm = this;

    vm.itineraries = getItineraries();

    vm.view = view;
    //////////


    function getItineraries() {
      itineraryFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.itineraries = res;
      }
    }

    function view(id) {
      $location.path('/itinerary/' + id);
    }

    function fail(err) {
      alert('Itineraries List Controller XHR Failed: ' + err.data);
    }
  }
})();