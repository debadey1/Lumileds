(function () {
  'use strict';

  angular
    .module('app')
    .controller('ItinerariesController', controller);

  controller.$inject = [
    "$q",
    "$log",
    "$location",
    "visitFactory",
    "itineraryFactory",
    "companyFactory",
    "employeeFactory",
    "branchFactory",
    "regionFactory"
    // "multiselectFactory",
  ];

  function controller(
    $q,
    $log,
    $location,
    visitFactory,
    itineraryFactory,
    companyFactory,
    employeeFactory,
    branchFactory,
    regionFactory
    // multiselectFactory,
  ) {
    var vm = this;
    vm.regions = regionFactory.regions;
    // vm.selectProps = multiselectFactory.selectProps("Add Attendees");
    vm.visits = [{}],
    vm.branchesToVisit = [],
    vm.airportsToVisit = [],
    vm.hotelsToVisit = [],
    vm.execs = [],
    vm.managers = [];

    vm.add = add;
    vm.removeVisit = removeVisit;
    vm.view = view;
    vm.getCompanyBranches = getCompanyBranches;
    vm.getBranchAmenities = getBranchAmenities;

    initialize();
    //////////

    function initialize() {
      getItineraries();

      var promises = [
        companyFactory.all(),
        employeeFactory.all()
      ];

      $q.all(promises)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res[0];
        vm.employees = res[1];

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

    function getItineraries() {
      itineraryFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.itineraries = res;
      }
    }

    function add(isValid) {
      // if you have 0 visits, angular interprets the form to be valid
      if (isValid && vm.visits.length > 0) {
        var payload = {
          itinerary: vm.itinerary,
          visits: vm.visits
        };

        itineraryFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        vm.itinerary = {};
        vm.visits = [{}];
        getItineraries();
      }
    }

    function view(data) {
      $location.path('/itinerary/' + data._id);
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

    function getBranchAmenities(branch_id, index) {
      // reset airport and hotel
      delete vm.visits[index].airport;
      delete vm.visits[index].hotel;

      branchFactory.one(branch_id)
        .then(success)
        .catch(fail);

      function success(result) {
        vm.airportsToVisit[index] = result.airports;
        vm.hotelsToVisit[index] = result.hotels;
      }
    }

    function fail(err) {
      alert('Visits Controller XHR Failed: ' + err.data);
    }
  }
})();