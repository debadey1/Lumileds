(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyViewController', controller);

  controller.$inject = [
    "$location",
    "$routeParams",
    "$anchorScroll",
    "restaurantFactory",
    "pruneFactory"
  ];

  function controller(
    $location,
    $routeParams,
    $anchorScroll,
    companyFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.company_id = $routeParams.id;
    vm.company = getCompany();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getCompany() {
      companyFactory.one(company_id)
        .then(getSucceeded)
        .catch(fail);

      function getSucceeded(res) {
        vm.company = res;
      }
    }

    function edit() {
      var payload = {
        company: pruneEmpty($scope.new_company)
      };
      companyFactory.edit(payload, company_id, function() {
        getCompany();
        vm.new_company = {};
      });
    }

    function remove(data) {
      companyFactory.remove(data, function(){
        $location.path("/companies");
      });
    }

    function fail(err) {
      alert('Company View Controller XHR Failed: ' + err.data);
    }
  }
})();