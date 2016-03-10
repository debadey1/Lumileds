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
    "toastrFactory",
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
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.selectPropsAdd = multiselectFactory.selectProps("Add Employees");
    vm.selectPropsRemove = multiselectFactory.selectProps("Remove Employees");
    vm.selectExecsAdd = multiselectFactory.selectProps("Add Executives");
    vm.selectExecsRemove = multiselectFactory.selectProps("Remove Executives");

    vm.visit_id = $routeParams.id;
    vm.itinerary_id = $routeParams.itinerary_id;
    vm.visit = {},
    vm.branchesToVisit = [],
    vm.airportsToVisit = [],
    vm.hotelsToVisit = [],
    vm.execs = [],
    vm.employees = [],
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
        vm.visit = res.data;
        vm.visit.date = new Date(vm.visit.date);

        var promises = [
          companyFactory.all(),
          employeeFactory.all()
        ];

        return $q.all(promises);
      }

      function getOthersSuccess(res) {
        var data = res.data;

        vm.companies = data[0];
        var temp_employees = data[1];

        for (var i = 0; i < temp_employees.length; i++) {
          switch(temp_employees[i].title) {
            case "Executive": {
              vm.execs.push(temp_employees[i]);
              break;
            }
            case "Sales Manager": {
              vm.managers.push(temp_employees[i]);
              break;
            }
            default:
              vm.employees.push(temp_employees[i]);
              break;
          }
        }

        // sort employees into attendees and non-attendees
        for (var i = 0; i < vm.visit.employees.length; i++) {
          for (var j = 0; j < vm.employees.length; j++) {
            if (vm.employees[j]._id === vm.visit.employees[i]._id) {
              vm.employees.splice(j, 1);
            }
          }
        }

        // sort execs into attendees and non-attendees
        for (var i = 0; i < vm.visit.executives.length; i++) {
          for (var j = 0; j < vm.execs.length; j++) {
            if (vm.execs[j]._id === vm.visit.executives[i]._id) {
              vm.execs.splice(j, 1);
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
          toastrFactory.success("Visit successfully edited.");
          initialize();
        }
      }
    }

    function edit() {
      // push employees to add and remove to be updated
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

      // push execs to add and remove to be updated
      if (vm.add_execs.length > 0) {
        for (var i = 0; i < vm.add_execs.length; i++) {
          vm.add_execs[i] = vm.add_execs[i]._id;
        }
      }
      if (vm.remove_execs.length > 0) {
        for (var i = 0; i < vm.remove_execs.length; i++) {
          vm.remove_execs[i] = vm.remove_execs[i]._id;
        }
      }

      vm.visit.manager = vm.new_manager; // set manager here due to problems with select fields

      var payload = {
        visit: pruneEmpty(vm.visit),
        add_employees: pruneEmpty(vm.add_employees),
        remove_employees: pruneEmpty(vm.remove_employees),
        add_execs: pruneEmpty(vm.add_execs),
        remove_execs: pruneEmpty(vm.remove_execs)
      };

      visitFactory.edit(payload, vm.visit_id)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Visit successfully edited.");
        initialize();
      }
    }

    function remove(payload) {
      visitFactory.remove(payload, vm.visit_id)
        .then(success)
        .catch(fail);

      function success(res) {
        toastrFactory.success("Visit successfully removed.");
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
        vm.airportsToVisit = result.data.airports;
        vm.hotelsToVisit = result.data.hotels;
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Visit Controller XHR Failed: ' + err.data);
    }
  }
})();