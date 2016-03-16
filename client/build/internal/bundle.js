(function () {
  'use strict';

  angular.module('app', [
    'ngRoute',
    'isteven-multi-select'
  ]);
})();
(function () {
  'use strict';

  angular
    .module('app')
    .config(routes);

  routes.$inject = [
    '$routeProvider'
  ];

  function routes($routeProvider) {
    $routeProvider

      .when('/', {
        templateUrl: 'add/companies/companies.html',
        controller: 'CompaniesController',
        controllerAs: 'vm'
      })
      // companies
      .when('/companies', {
        templateUrl: 'add/companies/companies.html',
        controller: 'CompaniesController',
        controllerAs: 'vm'
      })
      .when('/company/:id',{
        templateUrl: 'edit/company/company.html',
        controller: 'CompanyController',
        controllerAs: 'vm'
      })

      // employees
      .when('/employees/lumileds', {
        templateUrl: 'add/employees/employees.html',
        controller: 'EmployeesController',
        controllerAs: 'vm'
      })
      .when('/employee/lumileds/:id', {
        templateUrl: 'edit/employee/employee.html',
        controller: 'EmployeeController',
        controllerAs: 'vm'
      })
      .when('/employees/lumileds/all',{
        templateUrl: 'all/employees/employees-list.html',
        controller: 'EmployeesListController',
        controllerAs: 'vm'
      })
      
      // customers
      .when('/employees/:company_id',{
        templateUrl: 'add/customers/customers.html',
        controller: 'CustomersController',
        controllerAs: 'vm'
      })
      .when('/company/:company_id/employee/:id',{
        templateUrl: 'edit/customer/customer.html',
        controller: 'CustomerController',
        controllerAs: 'vm'
      })
      
      // branches
      .when('/branches', {
        templateUrl: 'all/branches/branches-list.html',
        controller: 'BranchesListController',
        controllerAs: 'vm'
      })
      .when('/branches/:company_id',{
        templateUrl: 'add/branches/branches.html',
        controller: 'BranchesController',
        controllerAs: 'vm'
      })
      .when('/company/:company_id/branch/:id',{
        templateUrl: 'edit/branch/branch.html',
        controller: 'BranchController',
        controllerAs: 'vm'
      })

      // airports
      .when('/airports/:branch_id',{
        templateUrl: 'add/airports/airports.html',
        controller: 'AirportsController',
        controllerAs: 'vm'
      })
      .when('/branch/:branch_id/airport/:id',{
        templateUrl: 'edit/airport/airport.html',
        controller: 'AirportController',
        controllerAs: 'vm'
      })

      // hotels
      .when('/hotels/:branch_id',{
        templateUrl: 'add/hotels/hotels.html',
        controller: 'HotelsController',
        controllerAs: 'vm'
      })
      .when('/branch/:branch_id/hotel/:id',{
        templateUrl: 'edit/hotel/hotel.html',
        controller: 'HotelController',
        controllerAs: 'vm'
      })

      // restaurants
      .when('/restaurants/:branch_id',{
        templateUrl: 'add/restaurants/restaurants.html',
        controller: 'RestaurantsController',
        controllerAs: 'vm'
      })
      .when('/branch/:branch_id/restaurant/:id',{
        templateUrl: 'edit/restaurant/restaurant.html',
        controller: 'RestaurantController',
        controllerAs: 'vm'
      })

      // reports
      .when('/reports/itin-per-exec',{
        templateUrl: 'reports/exec-itineraries/exec-itineraries.html',
        controller: 'ExecItinerariesController',
        controllerAs: 'vm'
      })
      .when('/reports/visits-per-exec',{
        templateUrl: 'reports/exec-visits/exec-visits.html',
        controller: 'ExecVisitsController',
        controllerAs: 'vm'
      })

      // itineraries
      
      // .when('/itineraries/all',{
      //     templateUrl: 'all/itineraries/itineraries-list.html',
      //     controller: 'ItinerariesListController',
      //     controllerAs: 'vm'
      // })
      // .when('/itinerary/:id',{
      //     templateUrl: 'view/itinerary-view/itinerary-view.html',
      //     controller: 'ItineraryViewController',
      //     controllerAs: 'vm'
      // })
      // .when('/itinerary/:id/edit',{
      //     templateUrl: 'edit/itinerary/itinerary.html',
      //     controller: 'ItineraryController',
      //     controllerAs: 'vm'
      // })

      // visits
      .when('/visits', {
        templateUrl: 'add/visits/visits.html',
        controller: 'VisitsController',
        controllerAs: 'vm'
      })
      .when('/visit/:id', {
        templateUrl: 'edit/visit/visit.html',
        controller: 'VisitController',
        controllerAs: 'vm'
      })
      .when('/visits/all',{
        templateUrl: 'all/visits/visits-list.html',
        controller: 'VisitsListController',
        controllerAs: 'vm'
      })
      .when('/itinerary/:itinerary_id/visit/:id',{
          templateUrl: 'edit/visit/visit.html',
          controller: 'VisitController',
          controllerAs: 'vm'
      })
      
      .otherwise({
        redirectTo: '/'
      });
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('AirportsController', controller);

  controller.$inject = [
    "$routeParams",
    "$location",
    "airportFactory",
    "branchFactory",
    "regionFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $routeParams,
    $location,
    airportFactory,
    branchFactory,
    regionFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.airports = getAirports();
    vm.branch = getBranch();

    vm.add = add;
    //////////

    function getAirports() {
      airportFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.airports = res.data;
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

    function add(isValid) {
      if (isValid) {
        var payload = {
          airport: pruneEmpty(vm.new_airport),
          location: pruneEmpty(vm.new_location),
          branch_id: vm.branch_id
        };

        airportFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        toastrFactory.success("Added airport!");
        $location.path('/company/' + vm.branch.company._id + '/branch/' + vm.branch_id);
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Airports Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchesController', controller);

  controller.$inject = [
    "$log",
    "$routeParams",
    "$location",
    "branchFactory",
    "companyFactory",
    "regionFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $routeParams,
    $location,
    branchFactory,
    companyFactory,
    regionFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.company_id = $routeParams.company_id;

    vm.add = add;

    getCompany();
    //////////

    function getCompany() {
      companyFactory.one(vm.company_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.company = res.data;
      }
    }

    function add(isValid) {
      if (isValid) {
        var payload = {
          branch: {
            company: vm.company_id,
            notes: vm.notes
          },
          branch_location: pruneEmpty(vm.branch_location)
        };

        branchFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success(res) {
        toastrFactory.success("Added branch!");
        $location.path('/company/' + vm.company_id);
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Branches Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompaniesController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "employeeFactory",
    "companyFactory",
    "toastrFactory"
  ];

  function controller(
    $log,
    $location,
    employeeFactory,
    companyFactory,
    toastrFactory
  ) {
    var vm = this;

    vm.add = add;
    vm.view = view;

    initialize();
    //////////

    function initialize() {
      getManagers();
      getCompanies();
    }

    function getManagers() {
      employeeFactory.managers()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.managers = res.data;
      }
    }

    function getCompanies() {
      companyFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res.data;
        var data = res.data;
        vm.companies1 = [], vm.companies2 = [];
        for (var i = 0; i < data.length; i++) {
          var x = (i + 2) % 2;
          if (x === 0) {vm.companies1.push(data[i]);}
          else if (x === 1) {vm.companies2.push(data[i]);}
        }
      }
    }

    function add(isValid) {
      if (isValid) {
        var payload = {
          company: vm.new_company
        };

        companyFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success(res) {
        getCompanies();
        vm.new_company = {};
        toastrFactory.success("Added company!");
      }
    }

    function view(id) {
      $location.path('/company/' + id);
    }

    function fail(err) {
      if (err.data.code === 11000) {
        toastrFactory.error("Already added company.");
      } else {
        toastrFactory.error(err.data.errors.name.message);
      }
      $log.log('Companies Controller XHR Failed: ', err);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CustomersController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "customerFactory",
    "toastrFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    customerFactory,
    toastrFactory
  ) {
    var vm = this;

    vm.company_id = $routeParams.company_id;

    vm.add = add;
    //////////
    
    function add(isValid) {
      if (isValid) {
        var payload = {
          customer: vm.new_customer
        };

        payload.customer.company = vm.company_id;

        customerFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        toastrFactory.success("Added company employee!");
        $location.path('/company/' + vm.company_id);
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Employees Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeesController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "employeeFactory",
    "toastrFactory",
    "regionFactory"
  ];

  function controller(
    $log,
    $location,
    employeeFactory,
    toastrFactory,
    regionFactory
  ) {
    var vm = this;
    vm.regions = regionFactory.regions;

    vm.add = add;
    //////////

    function add(isValid) {
      if (isValid) {
        vm.new_employee.lumileds = true;

        var payload = {
          employee: vm.new_employee,
          location: vm.new_location
        };
        employeeFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        toastrFactory.success("Added Lumileds employee!");
        vm.new_employee = {};
        vm.new_location = {};
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Employees Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('HotelsController', controller);

  controller.$inject = [
    "$routeParams",
    "$location",
    "$log",
    "branchFactory",
    "hotelFactory",
    "regionFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $routeParams,
    $location,
    $log,
    branchFactory,
    hotelFactory,
    regionFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.hotels = getHotels();
    vm.branch = getBranch();

    vm.add = add;
    //////////


    function getHotels() {
      hotelFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.hotels = res.data;
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

    function add(isValid) {
      if (isValid) {
        var payload = {
          hotel: pruneEmpty(vm.new_hotel),
          location: pruneEmpty(vm.new_location),
          branch_id: vm.branch_id
        };

        hotelFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        toastrFactory.success("Added hotel!");
        $location.path('/company/' + vm.branch.company._id + '/branch/' + vm.branch_id);
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Hotels Controller XHR Failed: ' + err.data);
    }
  }
})();
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
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $routeParams,
    $location,
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
    vm.restaurants = getRestaurants();
    vm.branch = getBranch();

    vm.add = add;
    //////////


    function getRestaurants() {
      restaurantFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.restaurants = res.data;
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
        toastrFactory.success("Added restaurant!");
        $location.path('/company/' + vm.branch.company._id + '/branch/' + vm.branch_id);
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Restaurants Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('VisitsController', controller);

  controller.$inject = [
    "$q",
    "$log",
    "$location",
    "visitFactory",
    "companyFactory",
    "employeeFactory",
    "toastrFactory",
    "regionFactory"
    // "multiselectFactory",
  ];

  function controller(
    $q,
    $log,
    $location,
    visitFactory,
    companyFactory,
    employeeFactory,
    toastrFactory,
    regionFactory
    // multiselectFactory,
  ) {
    var vm = this;
    vm.regions = regionFactory.regions;
    // vm.selectProps = multiselectFactory.selectProps("Add Attendees");
    vm.branchesToVisit = [],
    vm.execs = [];

    vm.add = add;
    vm.getCompanyBranches = getCompanyBranches;

    initialize();
    //////////

    function initialize() {

      var promises = [
        companyFactory.all(),
        employeeFactory.executives()
      ];

      $q.all(promises)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res[0].data;
        vm.execs = res[1].data;
      }
    }

    function add(isValid) {
      if (isValid) {
        var payload = {
          visit: vm.visit
        };

        visitFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        toastrFactory.success("Added visit!");
        vm.visit = {};
      }
    }

    // gets branches for the dropdown of each visit after a user selects a company
    function getCompanyBranches(company_id, index) {
      // reset branch
      delete vm.visit.branch;

      for (var i = 0; i < vm.companies.length; i++) {
        if (company_id === vm.companies[i]._id) {
          if (vm.companies[i].branches.length > 0) {
            vm.branchesToVisit = vm.companies[i].branches;
          }
        }
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Visits Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchesListController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "branchFactory"
  ];

  function controller(
    $log,
    $location,
    branchFactory
  ) {
    var vm = this;

    vm.branches = getBranches();

    vm.view = view;
    //////////


    function getBranches() {
      branchFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branches = res.data;
      }
    }

    function view(branch_id, company_id) {
      $location.path('/company/' + company_id + '/branch/' + branch_id);
    }

    function fail(err) {
      $log.log('Branches List Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeesListController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "employeeFactory"
  ];

  function controller(
    $log,
    $location,
    employeeFactory
  ) {
    var vm = this;

    vm.employees = getEmployees();

    vm.view = view;
    //////////


    function getEmployees() {
      employeeFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employees = res.data;
      }
    }

    function view(data) {
      $location.path('/employee/lumileds/' + data._id);
    }

    function fail(err) {
      $log.log('Employees List Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ItinerariesListController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "itineraryFactory"
  ];

  function controller(
    $log,
    $location,
    itineraryFactory
  ) {
    var vm = this;

    vm.itineraries = getItineraries();

    vm.view = view;
    //////////


    function getItineraries() {
      itineraryFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.itineraries = res.data;

        // set dates to be formatted as strings, so that it's searchable via angular
        for (var i = 0; i < vm.itineraries.length; i++) {
          vm.itineraries[i].start_date = moment(vm.itineraries[i].start_date).format("MMM Do, YYYY");
          vm.itineraries[i].end_date = moment(vm.itineraries[i].end_date).format("MMM Do, YYYY");
        }
      }
    }

    function view(id) {
      $location.path('/itinerary/' + id);
    }

    function fail(err) {
      $log.log('Itineraries List Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('VisitsListController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "visitFactory"
  ];

  function controller(
    $log,
    $location,
    visitFactory
  ) {
    var vm = this;

    vm.visits = getVisits();

    vm.view = view;
    //////////


    function getVisits() {
      visitFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.visits = res.data;

        // set dates to be formatted as strings, so that it's searchable via angular
        for (var i = 0; i < vm.visits.length; i++) {
          vm.visits[i].date = moment(vm.visits[i].date).format("MMM Do, YYYY");
        }
      }
    }

    function view(id) {
      $location.path('/visit/' + id);
    }

    function fail(err) {
      $log.log('Visits List Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('AirportController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "branchFactory",
    "airportFactory",
    "regionFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    branchFactory,
    airportFactory,
    regionFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.airport_id = $routeParams.id;
    vm.airport = getAirport();
    vm.branch = getBranch();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getAirport() {
      airportFactory.one(vm.airport_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.airport = res.data;
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
      var location = vm.airport.location;
      delete vm.airport.location;

      var payload = {
        airport: pruneEmpty(vm.airport),
        location_id: location._id,
        location: pruneEmpty(location)
      };

      airportFactory.edit(payload, vm.airport_id)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Airport successfully edited.");
        getAirport();
      }
    }

    function remove(data) {
      airportFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Airport successfully removed.");
        $location.path("/branch/" + vm.branch_id);
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Airport Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "branchFactory",
    "companyFactory",
    "regionFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    branchFactory,
    companyFactory,
    regionFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.id;
    vm.company_id = $routeParams.company_id;
    vm.branch = getBranch();
    vm.companies = getCompanies();

    vm.edit = edit;
    vm.view = view;
    vm.changeCompany = changeCompany;
    vm.remove = remove;
    //////////

    function getBranch() {
      branchFactory.one(vm.branch_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branch = res.data;
        vm.company_id = vm.branch.company._id;
      }
    }

    function getCompanies() {
      companyFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res.data;
      }
    }

    function edit() {
      var location = vm.branch.location;
      delete vm.branch.location;

      var payload = {
        branch: pruneEmpty(vm.branch),
        location_id: location._id,
        location: pruneEmpty(location)
      };

      branchFactory.edit(payload, vm.branch_id)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Branch successfully edited.");
        getBranch();
      }
    }

    function remove(data) {
      branchFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Branch successfully removed.");
        $location.path("/branches");
      }
    }

    function view(path) {
      $location.path(path);
    }

    function changeCompany() {
      var payload = {
        branch: {
          company: vm.new_company
        }
      }
      
      branchFactory.changeCompany(payload, vm.branch_id)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Branch successfully edited.");
        getBranch();
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Branch Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "employeeFactory",
    "companyFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    employeeFactory,
    companyFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;

    vm.company_id = $routeParams.id;

    vm.edit = edit;
    vm.remove = remove;
    
    initialize();
    //////////

    function initialize() {
      getCompany();
      getManagers();
    }

    function getCompany() {
      companyFactory.one(vm.company_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.company = res.data;
      }
    }

    function getManagers() {
      employeeFactory.managers()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.managers = res.data;
      }
    }

    function edit() {
      vm.company.manager = vm.new_manager;

      var payload = {
        company: pruneEmpty(vm.company)
      };

      companyFactory.edit(payload, vm.company_id)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Company successfully edited.");
        getCompany();
      }
    }

    function remove(data) {
      companyFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Company successfully removed.");
        $location.path("/companies");
      }
    }

    function fail(err) {
      if (err.data.code === 11000) {
        toastrFactory.error("Already added company.");
      } else {
        toastrFactory.error(err.data.errors.name.message);
      }
      $log.log('Company Controller XHR Failed: ', err.data);
      getCompany();
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CustomerController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "customerFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    customerFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;

    vm.customer_id = $routeParams.id;
    vm.company_id = $routeParams.company_id;
    vm.customer = getCustomer();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getCustomer() {
      customerFactory.one(vm.customer_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.customer = res.data;
      }
    }


    function edit() {
      var payload = {
        customer: pruneEmpty(vm.customer)
      };
      
      customerFactory.edit(payload, vm.customer_id)
        .then(success)
        .catch(fail);

      function success(res) {
        toastrFactory.success("Customer successfully edited.");
        getCustomer();
      }
    }

    function remove(data) {
      customerFactory.remove(data._id)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Customer successfully removed.");
        $location.path("/company/" + vm.company_id);
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Customer Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeeController', controller);

  controller.$inject = [
    "$q",
    "$log",
    "$location",
    "$routeParams",
    "employeeFactory",
    "pruneFactory",
    "toastrFactory",
    "regionFactory"
  ];

  function controller(
    $q,
    $log,
    $location,
    $routeParams,
    employeeFactory,
    pruneFactory,
    toastrFactory,
    regionFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.employee_id = $routeParams.id;
    vm.employee = getEmployee();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getEmployee() {
      employeeFactory.one(vm.employee_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employee = res.data;
      }
    }


    function edit() {
      var location = vm.employee.location;
      delete vm.employee.location;
      
      var payload = {
        employee: pruneEmpty(vm.employee),
        location_id: location._id,
        location: pruneEmpty(location)
      };
      
      employeeFactory.edit(payload, vm.employee_id)
        .then(success)
        .catch(fail);

      function success(res) {
        toastrFactory.success("Employee successfully edited.");
        getEmployee();
      }
    }

    function remove(data) {
      employeeFactory.remove(data._id)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Employee successfully removed.");
        $location.path("/employees/lumileds");
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Employee Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('HotelController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "branchFactory",
    "hotelFactory",
    "regionFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    branchFactory,
    hotelFactory,
    regionFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.hotel_id = $routeParams.id;
    vm.hotel = getHotel();
    vm.branch = getBranch();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getHotel() {
      hotelFactory.one(vm.hotel_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.hotel = res.data;
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
      var location = vm.hotel.location;
      delete vm.hotel.location;

      var payload = {
        hotel: pruneEmpty(vm.hotel),
        location_id: location._id,
        location: pruneEmpty(location)
      };

      hotelFactory.edit(payload, vm.hotel_id)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Hotel successfully edited.");
        getHotel();
      }
    }

    function remove(data) {
      hotelFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Hotel successfully removed.");
        $location.path("/branch/" + vm.branch_id);
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Hotel Controller XHR Failed: ' + err.data);
    }
  }
})();
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
    vm.others = [],
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
              vm.others.push(vm.employees[i]);
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
        vm.companies = res[0].data;
        var temp_employees = res[1].data;

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
        vm.employees = [];
        vm.execs = [];
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
      $log.log('Visit Controller XHR Failed: ', err.data);
      toastrFactory.error(err.data.errors.name.message);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('airportFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      all: all,
      one: one,
      edit: edit,
      add: add,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/airports');
    }

    function one(id) {
      return $http.get('/airports/' + id);
    }

    function edit(payload, id) {
      return $http.post('/airports/' + id, payload);
    }

    function add(payload) {
      return $http.post('/airports', payload);
    }

    function remove(data) {
      return $http.delete('/airports/' + data._id);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('branchFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      all: all,
      one: one,
      edit: edit,
      changeCompany: changeCompany,
      add: add,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/branches');
    }

    function one(id) {
      return $http.get('/branches/' + id);
    }

    function edit(payload, id) {
      return $http.post('/branches/' + id, payload);
    }

    function changeCompany(payload, id) {
      return $http.put('/branches/company/' + id, payload);
    }

    function add(payload) {
      return $http.post('/branches', payload);
    }

    function remove(data) {
      return $http.delete('/branches/' + data._id);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('companyFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      add: add,
      all: all,
      one: one,
      edit: edit,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/companies');
    }

    function one(id) {
      return $http.get('/companies/' + id);
    }

    function edit(payload, id) {
      return $http.post('/companies/' + id, payload);
    }

    function add(payload) {
      return $http.post('/companies', payload);
    }

    function remove(data) {
      return $http.delete('/companies/' + data._id);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('customerFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      all: all,
      one: one,
      edit: edit,
      add: add,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/customers');
    }

    function one(id) {
      return $http.get('/customers/' + id);
    }

    function edit(payload, id) {
      return $http.put('/customers/' + id, payload);
    }

    function add(payload) {
      return $http.post('/customers', payload);
    }

    function remove(id) {
      return $http.post('/customers/' + id);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('employeeFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      all: all,
      one: one,
      edit: edit,
      add: add,
      remove: remove,
      executives: executives,
      managers: managers,
      execItineraries: execItineraries
    };

    return factory;
    //////////

    function all() {
      return $http.get('/employees');
    }

    function one(id) {
      return $http.get('/employees/' + id);
    }

    function edit(payload, id) {
      return $http.put('/employees/' + id, payload);
    }

    function add(payload) {
      return $http.post('/employees', payload);
    }

    function remove(id) {
      return $http.post('/employees/' + id);
    }

    function executives() {
      return $http.get('/employees/executives');
    }

    function managers() {
      return $http.get('/employees/managers');
    }

    function execItineraries(id, year) {
      return $http.get('/employees/exec-itineraries/' + id + '/' + year);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('hotelFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      all: all,
      one: one,
      edit: edit,
      add: add,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/hotels');
    }

    function one(id) {
      return $http.get('/hotels/' + id);
    }

    function edit(payload, id) {
      return $http.post('/hotels/' + id, payload);
    }

    function add(payload) {
      return $http.post('/hotels', payload);
    }

    function remove(data) {
      return $http.delete('/hotels/' + data._id);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('itineraryFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      add: add,
      all: all,
      one: one,
      edit: edit,
      changeRegion: changeRegion,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/itineraries');
    }

    function one(id) {
      return $http.get('/itineraries/' + id);
    }

    function edit(payload, id) {
      return $http.put('/itineraries/' + id, payload);
    }

    function add(payload) {
      return $http.post('/itineraries', payload);
    }

    function remove(payload, id) {
      return $http.post('/itineraries/' + id, payload);
    }

    function changeRegion(payload, id) {
      return $http.put('/itineraries/region/' + id, payload);
    }
  }
})();
(function () {
	'use strict';

	angular
		.module('app')
		.factory('multiselectFactory', factory);

	factory.$inject = [];

	function factory() {
		var factory = {
      selectProps: selectProps
    };

    function selectProps(label) {
    	return {
	      selectAll       : "Select all",
	      selectNone      : "Select none",
	      reset           : "Reset",
	      search          : "Search...",
	      nothingSelected : label
	    };
    }

		return factory;
	}
})();
(function () {
	'use strict';

	angular
		.module('app')
		.factory('pruneFactory', factory);

	factory.$inject = ["$log"];

	function factory($log) {
		var factory = {
			pruneEmpty: pruneEmpty
		};

		return factory;
		//////////////

		function pruneEmpty(obj) {
	    return function prune(current) {
	      _.forOwn(current, function (value, key) {
	        if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) || (_.isString(value) && _.isEmpty(value)) || (_.isObject(value) && _.isEmpty(prune(value))) && !_.isDate(value)) {
	          delete current[key];
	        }
	      });
	      // remove any leftover undefined values from the delete 
	      // operation on an array
	      if (_.isArray(current)) {
	      	_.pull(current, undefined)
	      };

	      return current;

	    }(_.cloneDeep(obj));  // Do not modify the original object, create a clone instead
	  }
	}
})();
(function () {
	'use strict';

	angular
		.module('app')
		.factory('regionFactory', factory);

	factory.$inject = [];

	function factory() {
		var factory = {
			regions: [
		    "Americas",
		    "APAC",
		    "EMEA",
		    "Japan"
		  ]
		};

		return factory;
	}
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('restaurantFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      all: all,
      one: one,
      edit: edit,
      add: add,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/restaurants');
    }

    function one(id) {
      return $http.get('/restaurants/' + id);
    }

    function edit(payload, id) {
      return $http.post('/restaurants/' + id, payload);
    }

    function add(payload) {
      return $http.post('/restaurants', payload);
    }

    function remove(data) {
      return $http.delete('/restaurants/' + data._id);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('toastrFactory', factory);

  factory.$inject = [];

  function factory() {
    var factory = {
      success: success,
      error: error
    };

    return factory;

    function success(text) {
      toastr.success(null, text);
    }

    function error(text) {
      toastr.error(null, text);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('visitFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      add: add,
      all: all,
      one: one,
      edit: edit,
      remove: remove,
      execVisits: execVisits
    };

    return factory;
    //////////

    function all() {
      return $http.get('/visits');
    }

    function one(id) {
      return $http.get('/visits/' + id);
    }

    function edit(payload, id) {
      return $http.put('/visits/' + id, payload);
    }

    function add(payload) {
      return $http.post('/visits', payload);
    }

    function remove(payload, id) {
      return $http.post('/visits/' + id, payload);
    }

    function execVisits(payload) {
      return $http.post('/visits/exec-visits', payload);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ExecItinerariesController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "employeeFactory",
    "itineraryFactory"
  ];

  function controller(
    $log,
    $location,
    employeeFactory,
    itineraryFactory
  ) {
    var vm = this;

    vm.years = getYears();

    vm.view = view;
    vm.getItineraries = getItineraries;
    vm.getAllItineraries = getAllItineraries;

    initialize();
    //////////

    function initialize() {
      getEmployees();
      getAllItineraries();
    }

    function getEmployees() {
      employeeFactory.executives()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.execs = res.data;
      }
    }

    function getAllItineraries() {
      itineraryFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.itineraries = res.data;
      }
    }

    function getItineraries(isValid) {
      if (isValid) {
        employeeFactory.execItineraries(vm.executive, vm.year)
          .then(success)
          .catch(fail);
      }

      function success(res) {
        vm.itineraries = res.data;

        // set dates to be formatted as strings, so that it's searchable via angular
        for (var i = 0; i < vm.itineraries.length; i++) {
          vm.itineraries[i].start_date = moment(vm.itineraries[i].start_date).format("MMM Do, YYYY");
          vm.itineraries[i].end_date = moment(vm.itineraries[i].end_date).format("MMM Do, YYYY");
        }
      }
    }

    function view(id) {
      $location.path('/itinerary/' + id);
    }

    function getYears() {
      // TODO: get years from all as far back as all itineraries go, and as far forward as all itineraries go
      var years = [];

      for (var i = 0; i < 5; i++) {
        // start at 2010 cause why not
        years.push(2014 + i);
      }

      return years;
    }

    function fail(err) {
      $log.log('Exec Itineraries Controller XHR Failed: ', err.data);
    }
  }
})();
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
      getAllVisits();
      getCompanies();
      getEmployees();
    }

    function getAllVisits() {
      visitFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.visits = res.data;

        // set dates to be formatted as strings, so that it's searchable via angular
        for (var i = 0; i < vm.visits.length; i++) {
          vm.visits[i].date = moment(vm.visits[i].date).format("MMM Do, YYYY");
        }
      }
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
      $location.path('/visit/' + id);
    }

    function fail(err) {
      $log.log('Exec Visits Report Controller XHR Failed: ', err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ItineraryViewController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "itineraryFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    itineraryFactory
  ) {
    var vm = this;
    vm.itinerary_id = $routeParams.id;

    vm.edit = edit;
    vm.view = view;

    initialize();
    //////////

    function initialize() {
      getItinerary();
    }

    function getItinerary() {
      itineraryFactory.one(vm.itinerary_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.itinerary = res.data;
      }
    }

    function edit() {
      $location.path('/itinerary/' + vm.itinerary_id + '/edit');
    }

    function view(id) {
      $location.path('/itinerary/'+ vm.itinerary_id + '/visit/' + id);
    }

    function fail(err) {
      $log.log('Itinerary View Controller XHR Failed: ' + err.data);
    }
  }
})();