'use strict';

/**
 * @ngdoc function
 * @name szusApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the szusApp
 */
angular.module('szusApp')
  .controller('AboutCtrl', ['Resource', function (service) {

      var ctrl = this;

      ctrl.departureTime = new Date();
      ctrl.departureTime.setHours(0,0,0,0);

      ctrl.afterDate = function(beforeDate, afterDate) {

     }


      this.displayed = [];

      this.callServer = function callServer(tableState) {

        ctrl.isLoading = true;

        var pagination = tableState.pagination;

        var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
        var number = pagination.number || 10;  // Number of entries showed per page.

        service.getPage(start, number, tableState).then(function (result) {
          ctrl.displayed = result.data;
          tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
          ctrl.isLoading = false;
        });
      };

    }]);
