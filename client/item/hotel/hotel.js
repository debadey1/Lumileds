(function () {
  'use strict';

  angular
    .module('app')
    .controller('HotelController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "hotelFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    hotelFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.hotel_id = $routeParams.id;
    vm.hotel = getHotel();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getHotel() {
      hotelFactory.one(vm.hotel_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.hotel = res;
      }
    }

    function edit() {
      var location = vm.hotel.location;
      delete vm.hotel.location;

      var payload = {
        hotel: pruneEmpty(vm.hotel),
        location_id: location._id,
        location: pruneEmpty(location)
      };

      hotelFactory.edit(payload, vm.hotel_id)
        .then(success)
        .catch(fail);

      function success() {
        getHotel();
      }
    }

    function remove(data) {
      hotelFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/branch/" + vm.branch_id);
      }
    }

    function fail(err) {
      alert('Hotel Controller XHR Failed: ' + err.data);
    }
  }
})();