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
      .when('/',{
          templateUrl: 'partials/dashboard.html',
          controller: 'DashboardController as vm'
      })
      .when('/employees',{
          templateUrl: 'partials/employees.html',
          controller: 'EmployeeController as vm'
      })
      .when('/customers',{
          templateUrl: 'partials/customers.html',
          controller: 'CustomerController as vm'
      })
      .when('/trips',{
          templateUrl: 'partials/trips.html',
          controller: 'TripController as vm'
      })
      .when('/companies',{
          templateUrl: 'partials/companies.html',
          controller: 'CompanyController as vm'
      })
      .when('/branches',{
          templateUrl: 'partials/branches.html',
          controller: 'BranchController as vm'
      })
      .when('/employee/:id',{
          templateUrl: 'partials/employee.html',
          controller: 'EmployeeViewController as vm'
      })
      .when('/customer/:id',{
          templateUrl: 'partials/customer.html',
          controller: 'CustomerViewController as vm'
      })
      .when('/trip/:id',{
          templateUrl: 'partials/trip.html',
          controller: 'TripViewController as vm'
      })
      .when('/company/:id',{
          templateUrl: 'partials/company.html',
          controller: 'CompanyViewController as vm'
      })
      .when('/branch/:id',{
          templateUrl: 'partials/branch.html',
          controller: 'BranchViewController as vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();