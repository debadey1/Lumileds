(function () {
  'use strict';

  angular
    .module('app')
    .controller('HotelsController', controller);

  controller.$inject = [
    "$routeParams",
    "$location",
    "hotelFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $routeParams,
    $location,
    hotelFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.hotels = getHotels();

    vm.add = add;
    vm.view = view;
    //////////


    function getHotels() {
      hotelFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.hotels = res;
      }
    }

    function add(isValid) {
      if (isValid) {
        var payload = {
          hotel: pruneEmpty(vm.new_hotel),
          location: pruneEmpty(vm.new_location),
          branch_id: vm.branch_id
        };

        hotelFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        getHotels();
        vm.new_hotel = {};
        vm.new_location = {};
      }
    }

    function view(data) {
      $location.path('/branch/' + vm.branch_id + '/hotel/' + data._id);
    }

    function fail(err) {
      alert('Hotels Controller XHR Failed: ' + err.data);
    }
  }
})();