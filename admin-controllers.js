var admininfodisplayCtrls = angular.module('infodisplay.AdminControllers', []);

admininfodisplayCtrls.controller('AdminMonitorController', ['$scope', 'monitorStorageService',
  function ($scope, monitorStorage) {
      $('li#publictab').removeClass("active");
      $('li#admintab').addClass("active");
      $scope.hasMonitors = (monitorStorage.getAll().length > 0);
      $scope.monitors = monitorStorage.getAll();
      
        
    $scope.delete = function(monitorId){
        monitorStorage.removeMonitor(monitorId);
        $scope.hasMonitors = (monitorStorage.getAll().length > 0);
    }

}]);

admininfodisplayCtrls.controller('AdminMonitorDetailController', ['$scope', '$routeParams', 'monitorStorageService',
  function($scope, $routeParams, monitorStorage) {
    $scope.monitor = monitorStorage.get($routeParams.monitorId);
    
    
}]);

admininfodisplayCtrls.controller('NewMonitorController', ['$scope', 'monitorStorageService',
  function($scope, monitorStorage) {
   $scope.save = function(){
       console.log("Saved");
       monitorStorage.addMonitor($scope.monitor);
       $scope.message = {
            type : 0,
            text : "Monitor " + $scope.monitor.name + " successfully added!"
       };
       $scope.monitor = {};
   }
}]);

admininfodisplayCtrls.controller('EditMonitorController', ['$scope', '$routeParams', 'monitorStorageService',
  function($scope, $routeParams, monitorStorage) {
   $scope.monitor = monitorStorage.get($routeParams.monitorId);
   $scope.edit = true;
   $scope.save = function(){
       console.log("Saved");
       monitorStorage.updateMonitor($routeParams.monitorId, $scope.monitor);
       $scope.message = {
            type : 0,
            text : "Monitor " + $scope.monitor.name + " successfully updated!"
       };
   }
}]);

admininfodisplayCtrls.controller('EditMonitorInfoController', ['$scope', '$routeParams', 'monitorStorageService',
  function($scope, $routeParams, monitorStorage) {
   $scope.info = monitorStorage.getInfo($routeParams.infoId, $routeParams.monitorId);
   $scope.monitorId = $routeParams.monitorId;
   $scope.save = function(){
       console.log("Saved");
       monitorStorage.updateInfo($routeParams.monitorId, $routeParams.infoId, $scope.info);
       $scope.message = {
            type : 0,
            text : "info " + $scope.info.title + " successfully updated!"
       };
   }
}]);

admininfodisplayCtrls.controller('AddMonitorInfoController', ['$scope', '$routeParams', 'monitorStorageService',
  function($scope, $routeParams, monitorStorage) {
   $scope.monitorId = $routeParams.monitorId;
   $scope.save = function(){
       console.log("Saved");
       monitorStorage.addInfo($scope.info, $routeParams.monitorId);
       $scope.message = {
            type : 0,
            text : "Info " + $scope.info.title + " successfully added!"
       };
       $scope.info = {};
   }
   
   $scope.saveAll = function(){
       console.log("Save to all");
       monitorStorage.addInfoToAll($scope.info);
       
       $scope.message = {
            type : 0,
            text : "Info " + $scope.info.title + " successfully added to all Monitors!"
       };
       $scope.info = {};
   }
}]);