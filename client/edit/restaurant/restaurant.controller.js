(function () {
  'use strict';

  angular
    .module('app')
    .controller('RestaurantController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "branchFactory",
    "restaurantFactory",
    "regionFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    branchFactory,
    restaurantFactory,
    regionFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.restaurant_id = $routeParams.id;
    vm.restaurant = getRestaurant();
    vm.branch = getBranch();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getRestaurant() {
      restaurantFactory.one(vm.restaurant_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.restaurant = res.data;
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
      var location = vm.restaurant.location;
      delete vm.restaurant.location;

      var payload = {
        restaurant: pruneEmpty(vm.restaurant),
        location_id: location._id,
        location: pruneEmpty(location)
      };

      restaurantFactory.edit(payload, vm.restaurant_id)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Restaurant successfully edited.");
        getRestaurant();
      }
    }

    function remove(data) {
      restaurantFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Restaurant successfully removed.");
        $location.path("/branch/" + vm.branch_id);
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Restaurant Controller XHR Failed: ' + err.data);
    }
  }
})();