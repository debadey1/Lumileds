(function () {
  'use strict';

  angular
    .module('app')
    .controller('HotelController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "branchFactory",
    "hotelFactory",
    "regionFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    branchFactory,
    hotelFactory,
    regionFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.hotel_id = $routeParams.id;
    vm.hotel = getHotel();
    vm.branch = getBranch();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getHotel() {
      hotelFactory.one(vm.hotel_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.hotel = res.data;
      }
    }

    function getBranch() {
      branchFactory.one(vm.branch_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branch = res.data;
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
        toastrFactory.success("Hotel successfully edited.");
        getHotel();
      }
    }

    function remove(data) {
      hotelFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Hotel successfully removed.");
        $location.path("/branch/" + vm.branch_id);
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Hotel Controller XHR Failed: ' + err.data);
    }
  }
})();