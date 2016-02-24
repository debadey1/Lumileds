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