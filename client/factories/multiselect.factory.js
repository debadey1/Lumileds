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