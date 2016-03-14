var employees = require('../controllers/employees.js');
var companies = require('../controllers/companies.js');
var customers = require('../controllers/customers.js');
var branches = require('../controllers/branches.js');
var airports = require('../controllers/airports.js');
var hotels = require('../controllers/hotels.js');
var restaurants = require('../controllers/restaurants.js');
var itineraries = require('../controllers/itineraries.js');
var visits = require('../controllers/visits.js');

module.exports = function (app) {
  app.get('/companies',
    function (req, res){
      companies.all(req, res);
    });
  app.get('/companies/:id',
    function (req, res){
      companies.one(req, res);
    });
  app.post('/companies/:id',
    function (req, res){
      companies.edit(req, res);
    });
  app.post('/companies',
    function (req, res){
      companies.create(req, res);
    });
  app.delete('/companies/:id',
    function (req, res){
      companies.destroy(req, res);
    });

  app.get('/employees',
    function (req, res){
      employees.all(req, res);
    });
  app.get('/employees/executives',
    function (req, res){
      employees.getExecs(req, res);
    });
  app.get('/employees/exec-itineraries/:id/:year',
    function (req, res){
      employees.getExecItineraries(req, res);
    });
  app.get('/employees/:id',
    function (req, res){
      employees.one(req, res);
    });
  app.put('/employees/:id',
    function (req, res){
      employees.edit(req, res);
    });
  app.post('/employees',
    function (req, res){
      employees.create(req, res);
    });
  app.post('/employees/:id',
    function (req, res){
      employees.destroy(req, res);
    });

  app.get('/customers',
    function (req, res){
      customers.all(req, res);
    });
  app.get('/customers/:id',
    function (req, res){
      customers.one(req, res);
    });
  app.put('/customers/:id',
    function (req, res){
      customers.edit(req, res);
    });
  app.post('/customers',
    function (req, res){
      customers.create(req, res);
    });
  app.post('/customers/:id',
    function (req, res){
      customers.destroy(req, res);
    });

  app.get('/itineraries',
    function (req, res){
      itineraries.all(req, res);
    });
  app.get('/itineraries/:id',
    function (req, res){
      itineraries.one(req, res);
    });
  app.put('/itineraries/:id',
    function (req, res){
      itineraries.edit(req, res);
    });
  app.put('/itineraries/region/:id',
    function (req, res){
      itineraries.changeRegion(req, res);
    });
  app.post('/itineraries',
    function (req, res){
      itineraries.create(req, res);
    });
  app.post('/itineraries/:id',
    function (req, res){
      itineraries.destroy(req, res);
    });

  app.get('/visits',
    function (req, res){
      visits.all(req, res);
    });
  app.get('/visits/:id',
    function (req, res){
      visits.one(req, res);
    });
  app.put('/visits/:id',
    function (req, res){
      visits.edit(req, res);
    });
  app.post('/visits',
    function (req, res){
      visits.create(req, res);
    });
  app.post('/visits/:id',
    function (req, res){
      visits.destroy(req, res);
    });

  app.get('/customers',
    function (req, res){
      customers.all(req, res);
    });
  app.get('/customers/:id',
    function (req, res){
      customers.one(req, res);
    });
  app.post('/customers/:id',
    function (req, res){
      customers.edit(req, res);
    });
  app.post('/customers',
    function (req, res){
      customers.create(req, res);
    });
  app.delete('/customers/:id',
    function (req, res){
      customers.destroy(req, res);
    });

  app.get('/branches',
    function (req, res){
      branches.all(req, res);
    });
  app.get('/branches/:id',
    function (req, res){
      branches.one(req, res);
    });
  app.post('/branches/:id',
    function (req, res){
      branches.edit(req, res);
    });
  app.put('/branches/company/:id',
    function (req, res){
      branches.changeCompany(req, res);
    });
  app.post('/branches',
    function (req, res){
      branches.create(req, res);
    });
  app.delete('/branches/:id',
    function (req, res){
      branches.destroy(req, res);
    });

  app.get('/airports',
    function (req, res){
      airports.all(req, res);
    });
  app.get('/airports/:id',
    function (req, res){
      airports.one(req, res);
    });
  app.post('/airports/:id',
    function (req, res){
      airports.edit(req, res);
    });
  app.post('/airports',
    function (req, res){
      airports.create(req, res);
    });
  app.delete('/airports/:id',
    function (req, res){
      airports.destroy(req, res);
    });

  app.get('/hotels',
    function (req, res){
      hotels.all(req, res);
    });
  app.get('/hotels/:id',
    function (req, res){
      hotels.one(req, res);
    });
  app.post('/hotels/:id',
    function (req, res){
      hotels.edit(req, res);
    });
  app.post('/hotels',
    function (req, res){
      hotels.create(req, res);
    });
  app.delete('/hotels/:id',
    function (req, res){
      hotels.destroy(req, res);
    });

  app.get('/restaurants',
    function (req, res){
      restaurants.all(req, res);
    });
  app.get('/restaurants/:id',
    function (req, res){
      restaurants.one(req, res);
    });
  app.post('/restaurants/:id',
    function (req, res){
      restaurants.edit(req, res);
    });
  app.post('/restaurants',
    function (req, res){
      restaurants.create(req, res);
    });
  app.delete('/restaurants/:id',
    function (req, res){
      restaurants.destroy(req, res);
    });
};