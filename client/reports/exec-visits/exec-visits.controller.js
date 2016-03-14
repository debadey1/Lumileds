(function () {
  'use strict';

  angular
    .module('app')
    .controller('ExecVisitsController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "visitFactory",
    "employeeFactory",
    "companyFactory"
  ];

  function controller(
    $log,
    $location,
    visitFactory,
    employeeFactory,
    companyFactory
  ) {
    var vm = this;

    vm.getVisits = getVisits;

    vm.view = view;

    initialize();
    //////////

    function initialize() {
      getCompanies();
      getEmployees();
    }

    function getCompanies() {
      companyFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res.data;
      }
    }

    function getEmployees() {
      employeeFactory.executives()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.execs = res.data;
      }
    }

    function getVisits(isValid) {
      if (isValid) {
        var payload = {
          company: vm.company,
          exec: vm.executive,
          start: vm.start_date,
          end: vm.end_date
        }
        visitFactory.execVisits(payload)
          .then(success)
          .catch(fail);
      }

      function success(res) {
        vm.visits = res.data;

        // set dates to be formatted as strings, so that it's searchable via angular
        for (var i = 0; i < vm.visits.length; i++) {
          vm.visits[i].date = moment(vm.visits[i].date).format("MMM Do, YYYY");
        }
      }
    }

    function view(id) {
      // FIXME: how to get itinerary?
      $location.path('itinerary/' + '/visit/' + id);
    }

    function fail(err) {
      $log.log('Itineraries List Controller XHR Failed: ', err.data);
    }
  }
})();