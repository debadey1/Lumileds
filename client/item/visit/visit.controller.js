(function () {
  'use strict';

  angular
    .module('app')
    .controller('VisitController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "visitFactory",
    "companyFactory",
    "employeeFactory",
    "multiselectFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    visitFactory,
    companyFactory,
    employeeFactory,
    multiselectFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;
    vm.selectPropsAdd = multiselectFactory.selectProps("Add Employees");
    vm.selectPropsRemove = multiselectFactory.selectProps("Remove Employees");

    vm.visit_id = $routeParams.id;
    vm.itinerary_id = $routeParams.itinerary_id;
    vm.visit = getVisit();
    vm.companies = getCompanies();
    vm.employees = getEmployees();
    vm.getCompanyBranches = getCompanyBranches;

    vm.edit = edit;
    vm.remove = remove;

    initialize();
    //////////

    function initialize() {
    }

    function getVisit() {
      visitFactory.one(vm.visit_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.visit = res;
        vm.visit.date = new Date(vm.visit.date);
      }
    }

    function getCompanies() {
      companyFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res;
      }
    }

    function getEmployees() {
      employeeFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        // remove all of the current visit's employees from the list
        vm.employees = res;
        for (var i = 0; i < vm.visit.employees.length; i++) {
          for (var j = 0; j < vm.employees.length; j++) {
            if (vm.employees[j]._id === vm.visit.employees[i]._id) {
              vm.employees.splice(j, 1);
            }
          }
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
        visit: pruneEmpty(vm.new_visit),
        add_employees: pruneEmpty(vm.add_employees),
        remove_employees: pruneEmpty(vm.remove_employees)
      };

      visitFactory.edit(payload, vm.visit_id)
        .then(success)
        .catch(fail);

      function success() {
        getVisit();
        getEmployees();
        vm.new_visit = {};
      }
    }

    function remove(payload) {
      visitFactory.remove(payload, vm.visit_id)
        .then(success)
        .catch(fail);

      function success() {
        if (vm.itinerary_id) {
          $location.path("/itinerary/" + vm.itinerary_id);
        } else {
          $location.path("/visits/all");
        }
      }
    }

    // gets branches for the dropdown of each visit after a user selects a company
    function getCompanyBranches(company_id) {
      vm.branchesToVisit = [];
      for (var i = 0; i < vm.companies.length; i++) {
        if (company_id === vm.companies[i]._id) {
          vm.branchesToVisit = vm.companies[i].branches;
        }
      }
    }

    function fail(err) {
      alert('Visit Controller XHR Failed: ' + err.data);
    }
  }
})();