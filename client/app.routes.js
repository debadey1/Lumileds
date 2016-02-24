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
      // templateUrl: 'dashboard/dashboard.html',
      // controller: 'DashboardController',
      // controllerAs: 'vm'
      .when('/',{
          templateUrl: 'lists/companies/companies.html',
          controller: 'CompaniesController',
          controllerAs: 'vm'
      })
      .when('/employees',{
          templateUrl: 'lists/employees/employees.html',
          controller: 'EmployeesController',
          controllerAs: 'vm'
      })
      .when('/customers',{
          templateUrl: 'lists/customers/customers.html',
          controller: 'CustomersController',
          controllerAs: 'vm'
      })
      .when('/trips',{
          templateUrl: 'lists/trips/trips.html',
          controller: 'TripsController',
          controllerAs: 'vm'
      })
      .when('/companies',{
          templateUrl: 'lists/companies/companies.html',
          controller: 'CompaniesController',
          controllerAs: 'vm'
      })
      .when('/branches',{
          templateUrl: 'lists/branches/branches.html',
          controller: 'BranchesController',
          controllerAs: 'vm'
      })
      .when('/employee/:id',{
          templateUrl: 'item/employee/employee.html',
          controller: 'EmployeeController',
          controllerAs: 'vm'
      })
      .when('/customer/:id',{
          templateUrl: 'item/customer/customer.html',
          controller: 'CustomerController',
          controllerAs: 'vm'
      })
      .when('/trip/:id',{
          templateUrl: 'item/trip/trip.html',
          controller: 'TripController',
          controllerAs: 'vm'
      })
      .when('/company/:id',{
          templateUrl: 'item/company/company.html',
          controller: 'CompanyController',
          controllerAs: 'vm'
      })
      .when('/branch/:id',{
          templateUrl: 'item/branch/branch.html',
          controller: 'BranchController',
          controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();