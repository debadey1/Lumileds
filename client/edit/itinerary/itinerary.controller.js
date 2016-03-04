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
    "visitFactory",
    "itineraryFactory",
    "companyFactory",
    "employeeFactory",
    // "multiselectFactory",
    "regionFactory"
  ];

  function controller(
    $q,
    $log,
    $location,
    $routeParams,
    visitFactory,
    itineraryFactory,
    companyFactory,
    employeeFactory,
    // multiselectFactory,
    regionFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    vm.regions = regionFactory.regions;
    // vm.selectProps = multiselectFactory.selectProps("Add Attendees");
    var itinerary_id = $routeParams.id;

    vm.visits = [{}],
    vm.branchesToVisit = [],
    vm.execs = [],
    vm.managers = [];

    vm.edit = edit;
    vm.changeRegion = changeRegion;
    vm.view = view;
    vm.remove = remove;
    vm.removeVisit = removeVisit;
    vm.getCompanyBranches = getCompanyBranches;

    initialize();
    //////////

    function initialize() {
      getItinerary();

      var promises = [
        companyFactory.all(),
        employeeFactory.getLumiledsEmployees()
      ];

      $q.all(promises)
        .then(success)
        .catch(fail);

      // angular.element(document).ready(function() {
      //   angular.element('select').material_select();
      // });

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

    function getItinerary() {
      itineraryFactory.one(itinerary_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.itinerary = res;
      }
    }

    function view(id) {
      $location.path('/itinerary/'+ itinerary_id + '/visit/' + id);
    }

    function remove(data) {
      itineraryFactory.remove(data, itinerary_id)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/itineraries");
      }
    }

    function edit(isValid) {
      // if you have 0 visits, angular interprets the form to be valid
      if (isValid && vm.visits.length > 0) {
        var payload = {
          visits: vm.visits
        };

        itineraryFactory.edit(payload, itinerary_id)
          .then(success)
          .catch(fail);
      }

      function success() {
        vm.visits = [{}];
        getItinerary();
      }
    }

    function removeVisit(index) {
      vm.visits.splice(index, 1);
      vm.branchesToVisit.splice(index, 1);
    }

    // gets branches for the dropdown of each visit after a user selects a company
    function getCompanyBranches(company_id, index) {
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

      itineraryFactory.changeRegion(payload, itinerary_id)
        .then(success)
        .catch(fail);

      function success(res) {
        getItinerary();
      }
    }

    function fail(err) {
      alert('Itinerary Controller XHR Failed: ' + err.data);
    }
  }
})();