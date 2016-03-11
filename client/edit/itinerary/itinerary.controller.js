(function () {
  'use strict';

  angular
    .module('app')
    .controller('ItineraryController', controller);

  controller.$inject = [
    "$q",
    "$log",
    "$location",
    "$routeParams",
    "itineraryFactory",
    "companyFactory",
    "employeeFactory",
    "branchFactory",
    "toastrFactory",
    "regionFactory"
    // "multiselectFactory",
  ];

  function controller(
    $q,
    $log,
    $location,
    $routeParams,
    itineraryFactory,
    companyFactory,
    employeeFactory,
    branchFactory,
    toastrFactory,
    regionFactory
    // multiselectFactory,
  ) {
    var vm = this;
    vm.regions = regionFactory.regions;
    vm.itinerary_id = $routeParams.id;
    // vm.selectProps = multiselectFactory.selectProps("Add Attendees");

    vm.visits = [{}],
    vm.branchesToVisit = [],
    vm.airportsToVisit = [],
    vm.hotelsToVisit = [],
    vm.execs = [],
    vm.managers = [];

    vm.edit = edit;
    vm.changeRegion = changeRegion;
    vm.remove = remove;
    vm.removeVisit = removeVisit;
    vm.getCompanyBranches = getCompanyBranches;
    vm.getBranchAmenities = getBranchAmenities;

    initialize();
    //////////

    function initialize() {
      getItinerary();

      var promises = [
        companyFactory.all(),
        employeeFactory.all()
      ];

      $q.all(promises)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res[0].data;
        vm.employees = res[1].data;

        for (var i = 0; i < vm.employees.length; i++) {
          switch(vm.employees[i].title) {
            case "Executive": {
              vm.execs.push(vm.employees[i]);
              break;
            }
            case "Sales Manager": {
              vm.managers.push(vm.employees[i]);
              break;
            }
            default:
              break;
          }
        }
      }
    }

    function getItinerary() {
      itineraryFactory.one(vm.itinerary_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.itinerary = res.data;
      }
    }

    function remove(data) {
      itineraryFactory.remove(data, vm.itinerary_id)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Itinerary successfully removed.");
        $location.path("/itineraries");
      }
    }

    function edit(isValid) {
      // if you have 0 visits, angular interprets the form to be valid
      if (isValid && vm.visits.length > 0) {
        var payload = {
          visits: vm.visits
        };

        itineraryFactory.edit(payload, vm.itinerary_id)
          .then(success)
          .catch(fail);
      }

      function success() {
        toastrFactory.success("Itinerary successfully edited.");
        $location.path('/itinerary/' + vm.itinerary_id);
      }
    }

    function removeVisit(index) {
      vm.visits.splice(index, 1);
      vm.branchesToVisit.splice(index, 1);
    }

    // gets branches for the dropdown of each visit after a user selects a company
    function getCompanyBranches(company_id, index) {
      // reset branch, airport, and hotel
      delete vm.visits[index].branch;
      delete vm.visits[index].airport;
      delete vm.visits[index].hotel;

      vm.branchesToVisit[index] = [];
      for (var i = 0; i < vm.companies.length; i++) {
        if (company_id === vm.companies[i]._id) {
          if (vm.companies[i].branches.length > 0) {
            vm.branchesToVisit[index] = vm.companies[i].branches;
          }
        }
      }
    }

    function changeRegion() {
      var payload = {
        region: vm.itinerary.region
      }

      itineraryFactory.changeRegion(payload, vm.itinerary_id)
        .then(success)
        .catch(fail);

      function success(res) {
        toastrFactory.success("Itinerary successfully edited.");
        getItinerary();
      }
    }

    function getBranchAmenities(branch_id, index) {
      // reset airport and hotel
      delete vm.visits[index].airport;
      delete vm.visits[index].hotel;

      branchFactory.one(branch_id)
        .then(success)
        .catch(fail);

      function success(result) {
        vm.airportsToVisit[index] = result.data.airports;
        vm.hotelsToVisit[index] = result.data.hotels;
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Itinerary Controller XHR Failed: ' + err.data);
    }
  }
})();