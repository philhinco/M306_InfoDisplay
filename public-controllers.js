var publicinfodisplayCtrls = angular.module('infodisplay.PublicController', []);

publicinfodisplayCtrls.controller('PublicMonitorDetailController', ['$scope', '$routeParams', 'monitorStorageService',
  function($scope, $routeParams, monitorStorage) {
    $('li#publictab').addClass("active");
      $('li#admintab').removeClass("active");
    $scope.monitor = monitorStorage.get($routeParams.monitorId);
}]);
