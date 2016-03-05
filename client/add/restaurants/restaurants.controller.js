(function () {
  'use strict';

  angular
    .module('app')
    .controller('RestaurantsController', controller);

  controller.$inject = [
    "$routeParams",
    "$location",
    "branchFactory",
    "restaurantFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $routeParams,
    $location,
    branchFactory,
    restaurantFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.restaurants = getRestaurants();
    vm.branch = getBranch();

    vm.add = add;
    vm.view = view;
    //////////


    function getRestaurants() {
      restaurantFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.restaurants = res;
      }
    }

    function getBranch() {
      branchFactory.one(vm.branch_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branch = res;
      }
    }

    function add(isValid) {
      if (isValid) {
        var payload = {
          restaurant: pruneEmpty(vm.new_restaurant),
          location: pruneEmpty(vm.new_location),
          branch_id: vm.branch_id
        };

        restaurantFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        getRestaurants();
        vm.new_restaurant = {};
        vm.new_location = {};
      }
    }

    function view(data) {
      $location.path('/branch/' + vm.branch_id + '/restaurant/' + data._id);
    }

    function fail(err) {
      alert('Restaurants Controller XHR Failed: ' + err.data);
    }
  }
})();