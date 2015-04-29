'use strict';

var app = angular.module("infodisplay", ['ngRoute', 'infodisplay.AdminControllers', 'infodisplay.PublicController']);
app.config(['$routeProvider',
          function($routeProvider) {
              //Admin Interface Routes
            $routeProvider.
              when('/admin/monitors', {
                templateUrl: 'views/admin/monitors.html',
                controller: 'AdminMonitorController'
              }).
              when('/admin/monitors/new', {
                templateUrl: 'views/admin/add-edit-monitor.html',
                controller: 'NewMonitorController'
              }).
              when('/admin/monitors/:monitorId', {
                templateUrl: 'views/admin/monitor-detail.html',
                controller: 'AdminMonitorDetailController'
              }).
              when('/monitors', {
                redirectTo: '/monitors/1'
              }).
              when('/monitors/:monitorId', {
                templateUrl: 'views/monitor-detail.html',
                controller: 'PublicMonitorDetailController'
              }).
              when('/admin/monitors/:monitorId/edit', {
                templateUrl: 'views/admin/add-edit-monitor.html',
                controller: 'EditMonitorController'
              }).
              when('/admin/monitors/:monitorId/:infoId/edit', {
                templateUrl: 'views/admin/add-edit-info.html',
                controller: 'EditMonitorInfoController'
              }).
              when('/admin/monitors/:monitorId/infos/new', {
                templateUrl: 'views/admin/add-edit-info.html',
                controller: 'AddMonitorInfoController'
              }).
              when('/admin/monitors/info/new', {
                templateUrl: 'views/admin/add-edit-info-all.html',
                controller: 'AddMonitorInfoController'
              }).
              when('/admin', {
                redirectTo: '/admin/monitors'
              }).
              otherwise({
                redirectTo: '/monitors'
              });
          }]);
app.factory('monitorStorageService', function() {
    var monitors = [
                {
                    id: 1,
                    name: "Monitor 1",
                    location: "Horgen Dorf",
                    infos: [
                        {
                            id: 1,
                            title: "Auffahrtsbrücke",
                            desc: "Es findet am Freitag nach Auffahrt kein Unterricht statt."
                        },
                        {
                            id: 2,
                            title: "QV Wirtschaft",
                            desc: "Das QV der Abteilung Wirtschaft beginnt Anfang Juni."
                        },
                        {
                            id: 3,
                            title: "Abschlussfeier",
                            desc: "Die Abschlussfeier der Jahrgangs 2011 findet im Schinzenhof statt"
                        }
                    ],
                    infosAvailable: true
                },
                {
                    id: 2,
                    name: "Monitor 2",
                    location: "Horgen Oberdorf",
                    infos: [
                        {
                            id: 1,
                            title: "Auffahrtsbrücke",
                            desc: "Horgen Oberdorf führt keine Auffahrtsbrücke durch!"
                        },
                        {
                            id: 2,
                            title: "QV Informatik",
                            desc: "Das QV der Abteilung Informatik beginnt Mitte Juni."
                        }
                    ],
                    infosAvailable: true
                },
                {
                    id: 3,
                    name: "Monitor 3",
                    location: "Stäfa",
                    infos: [
                        {
                            id: 1,
                            title: "SchiLW-Tagung",
                            desc: "Alle Lehrpersonen der BZZ finden sich in der Aula in Stäfa ein."
                        }
                    ],
                    infosAvailable: true
                }
            ];
    function addMonitor(monitor){
        monitor.id = monitors.length + 1;
        monitor.infos = [];
        monitor.infosAvailable = false;
        monitors.push(monitor)
    }
    
    function removeMonitor(monitorId){
        for(var m in monitors){
            if(monitors[m].id == monitorId){
                monitors.splice(m, 1);
            }
        }
    }
    
    function addInfo(info, monitorId){
        for(var m in monitors){
            if(monitors[m].id == parseInt(monitorId)){
                if(monitors[m].infos[infId].id == infoId){
                    monitors[m].infosAvailable = true;
                    info.id = monitors[m].infos.length + 1;
                    monitors[m].infos.push(info);
                }
            }
        }
    }
    
    function addInfoToAll(info){
        for(var m in monitors){
            info.id = monitors[m].infos.length + 1;
            monitors[m].infos.push(info);
        }
    }
    
      function updateInfo(monitorId, infoId, updatedInfo){
        for(var m in monitors){
            if(monitors[m].id == parseInt(monitorId)){
                for(var infId in monitors[m].infos){
                    if(monitors[m].infos[infId].id == parseInt(infoId)){
                        monitors[m].infos[infId].title = updatedInfo.title;
                        monitors[m].infos[infId].desc = updatedInfo.desc;
                    }
                }
            }
        }
    }
    
    
    function updateMonitor(monitorId, updatedMonitor){
        for(var m in monitors){
            if(monitors[m].id == parseInt(monitorId)){
                monitors[m].location = updatedMonitor.location;
                monitors[m].name = updatedMonitor.name;
            }
        }
    }
    
    function getMonitorInfoById(infoId, monitorId){
        var monitor = getById(monitorId);
        for(var infId in monitor.infos){
            if(monitor.infos[infId].id == infoId){
                return monitor.infos[infId];
            }
        }
        return undefined;
    }
    function getById(id) {
        for(var m in monitors){
            var monitor = monitors[m];
            if(monitor.id == parseInt(id)){
                return monitor;
            }
        }
        return undefined;
    }
    
    function getAll(){
        return monitors;
    }
    

 return {
  addMonitor: addMonitor,
  get: getById,
  getAll: getAll,
  updateMonitor: updateMonitor,
  getInfo: getMonitorInfoById,
  addInfo: addInfo,
  updateInfo: updateInfo,
  addInfoToAll: addInfoToAll,
  removeMonitor: removeMonitor
 }

});
    