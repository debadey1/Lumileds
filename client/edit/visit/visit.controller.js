(function () {
  'use strict';

  angular
    .module('app')
    .controller('VisitController', controller);

  controller.$inject = [
    "$q",
    "$log",
    "$location",
    "$routeParams",
    "visitFactory",
    "branchFactory",
    "companyFactory",
    "employeeFactory",
    "multiselectFactory",
    "pruneFactory"
  ];

  function controller(
    $q,
    $log,
    $location,
    $routeParams,
    visitFactory,
    branchFactory,
    companyFactory,
    employeeFactory,
    multiselectFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.selectPropsAdd = multiselectFactory.selectProps("Add Employees");
    vm.selectExecsAdd = multiselectFactory.selectProps("Add Executives");
    vm.selectPropsRemove = multiselectFactory.selectProps("Remove Employees");
    vm.selectExecsRemove = multiselectFactory.selectProps("Remove Executives");

    vm.visit_id = $routeParams.id;
    vm.itinerary_id = $routeParams.itinerary_id;
    vm.visit = {},
    vm.branchesToVisit = [],
    vm.airportsToVisit = [],
    vm.hotelsToVisit = [],
    vm.execs = [],
    vm.managers = [];

    vm.edit = edit;
    vm.editCompany = editCompany;
    vm.remove = remove;
    vm.getCompanyBranches = getCompanyBranches;
    vm.getBranchAmenities = getBranchAmenities;

    initialize();
    //////////

    function initialize() {
      visitFactory.one(vm.visit_id)
        .then(getVisitSuccess)
        .then(getOthersSuccess)
        .catch(fail);

      function getVisitSuccess(res) {
        vm.visit = res;
        vm.visit.date = new Date(vm.visit.date);

        var promises = [
          companyFactory.all(),
          employeeFactory.all()
        ];

        return $q.all(promises);
      }

      function getOthersSuccess(res) {

        // NEXTUP
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

        for (var i = 0; i < vm.visit.employees.length; i++) {
          for (var j = 0; j < vm.employees.length; j++) {
            if (vm.employees[j]._id === vm.visit.employees[i]._id) {
              vm.employees.splice(j, 1);
            }
          }
        }

        // split execs
        for (var i = 0; i < vm.visit.employees.length; i++) {
          for (var j = 0; j < vm.employees.length; j++) {
            if (vm.employees[j]._id === vm.visit.employees[i]._id) {
              vm.employees.splice(j, 1);
            }
          }
        }
      }
    }

    function editCompany(isValid) {
      if (isValid) {
        vm.visit.company = vm.new_company;
        vm.visit.branch = vm.new_branch;
        vm.visit.airport = vm.new_airport;
        vm.visit.hotel = vm.new_hotel;

        var payload = {
          visit: pruneEmpty(vm.visit),
          add_employees: [],
          remove_employees: []
        };

        visitFactory.edit(payload, vm.visit_id)
          .then(success)
          .catch(fail);

        function success() {
          initialize();
        }
      }
    }

    function edit() {
      if (vm.add_employees.length > 0) {
        for (var i = 0; i < vm.add_employees.length; i++) {
          vm.add_employees[i] = vm.add_employees[i]._id;
        }
      }
      if (vm.remove_employees.length > 0) {
        for (var i = 0; i < vm.remove_employees.length; i++) {
          vm.remove_employees[i] = vm.remove_employees[i]._id;
        }
      }

      var payload = {
        visit: pruneEmpty(vm.visit),
        add_employees: pruneEmpty(vm.add_employees),
        remove_employees: pruneEmpty(vm.remove_employees)
      };

      visitFactory.edit(payload, vm.visit_id)
        .then(success)
        .catch(fail);

      function success() {
        initialize();
      }
    }

    function remove(payload) {
      visitFactory.remove(payload, vm.visit_id)
        .then(success)
        .catch(fail);

      function success(res) {
        if (res.status === 204) {
          $location.path("/itineraries");
        } else {
          $location.path("/itinerary/" + vm.itinerary_id);
        }
      }
    }

    // gets branches for the dropdown of each visit after a user selects a company
    function getCompanyBranches(company_id) {
      vm.new_branch = null;
      vm.new_airport = null;
      vm.new_hotel = null;
      vm.branchesToVisit = [];
      for (var i = 0; i < vm.companies.length; i++) {
        if (company_id === vm.companies[i]._id) {
          vm.branchesToVisit = vm.companies[i].branches;
        }
      }
    }

    function getBranchAmenities(branch_id) {
      // reset airport and hotel
      vm.new_airport = null;
      vm.new_hotel = null;

      branchFactory.one(branch_id)
        .then(success)
        .catch(fail);

      function success(result) {
        vm.airportsToVisit = result.airports;
        vm.hotelsToVisit = result.hotels;
      }
    }

    function fail(err) {
      $log.log('Visit Controller XHR Failed: ' + err.data);
    }
  }
})();