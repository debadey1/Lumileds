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
          templateUrl: 'dashboard/dashboard.html',
          controller: 'DashboardController as vm'
      })
      .when('/employees',{
          templateUrl: 'lists/employees/employees.html',
          controller: 'EmployeesController as vm'
      })
      .when('/customers',{
          templateUrl: 'lists/customers/customers.html',
          controller: 'CustomersController as vm'
      })
      .when('/trips',{
          templateUrl: 'lists/trips/trips.html',
          controller: 'TripsController as vm'
      })
      .when('/companies',{
          templateUrl: 'lists/companies/companies.html',
          controller: 'CompaniesController as vm'
      })
      .when('/branches',{
          templateUrl: 'lists/branches/branches.html',
          controller: 'BranchesController as vm'
      })
      .when('/employee/:id',{
          templateUrl: 'item/employee/employee.html',
          controller: 'EmployeeController as vm'
      })
      .when('/customer/:id',{
          templateUrl: 'item/customer/customer.html',
          controller: 'CustomerController as vm'
      })
      .when('/trip/:id',{
          templateUrl: 'item/trip/trip.html',
          controller: 'TripController as vm'
      })
      .when('/company/:id',{
          templateUrl: 'item/company/company.html',
          controller: 'CompanyController as vm'
      })
      .when('/branch/:id',{
          templateUrl: 'item/branch/branch.html',
          controller: 'BranchController as vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();