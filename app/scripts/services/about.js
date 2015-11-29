angular.module('szusApp')
  .factory('Resource', ['$q', '$filter', '$timeout', function ($q, $filter, $timeout) {

  //this would be the service to call your server, a standard bridge between your model an $http

  // the database (normally on your server)
  var randomsItems = [];

  function createRandomItem(id) {
    var heroes = ['Batman', 'Superman', 'Robin', 'Thor', 'Hulk', 'Niki Larson', 'Stark', 'Bob Leponge'];
    var stoki = ['Kluczkowice', 'Białka', 'Skawina', 'Chełm', 'Chopok', 'Austriacki stok', 'Zakopane', 'Bieszczady'];
    return {
      id: id,
      driver: heroes[Math.floor(Math.random() * 7)],
      price: Math.floor(Math.random() * 1000)/10,
      saved: Math.floor(Math.random() * 10000),
      departureTime: randomDate(new Date(new Date().getTime() - (1000000)), new Date(new Date().getTime()+100000), 5, 23),
      returnTime: randomDate(new Date(new Date().getTime() - (1000000)), new Date(new Date().getTime()+100000), 5, 23),
      from: 'Krakow',
      to: stoki[Math.floor(Math.random() * 7)]
    };

  }


  function randomDate(start, end, startHour, endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
  }
  for (var i = 0; i < 1000; i++) {
    randomsItems.push(createRandomItem(i));
  }


  //fake call to the server, normally this service would serialize table state to send it to the server (with query parameters for example) and parse the response
  //in our case, it actually performs the logic which would happened in the server
  function getPage(start, number, params) {

    var deferred = $q.defer();

    var filtered = params.search.predicateObject ? $filter('filter')(randomsItems, params.search.predicateObject) : randomsItems;

    if (params.sort.predicate) {
      filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
    }

    var result = filtered.slice(start, start + number);

    $timeout(function () {
      //note, the server passes the information about the data set size
      deferred.resolve({
        data: result,
        numberOfPages: Math.ceil(filtered.length / number)
      });
    }, 1000);


    return deferred.promise;
  }

  return {
    getPage: getPage
  };

}]);
