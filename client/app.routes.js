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

      // itineraries
      .when('/', {
          templateUrl: 'add/itineraries/itineraries.html',
          controller: 'ItinerariesController',
          controllerAs: 'vm'
      })
      .when('/itineraries', {
          templateUrl: 'add/itineraries/itineraries.html',
          controller: 'ItinerariesController',
          controllerAs: 'vm'
      })
      .when('/itineraries/all',{
          templateUrl: 'all/itineraries/itineraries-list.html',
          controller: 'ItinerariesListController',
          controllerAs: 'vm'
      })
      .when('/itinerary/:id',{
          templateUrl: 'view/itinerary-view/itinerary-view.html',
          controller: 'ItineraryViewController',
          controllerAs: 'vm'
      })
      .when('/itinerary/:id/edit',{
          templateUrl: 'edit/itinerary/itinerary.html',
          controller: 'ItineraryController',
          controllerAs: 'vm'
      })

      // visits
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
      
      .otherwise({
        redirectTo: '/'
      });
  }
})();