var app = angular.module('kaiju', ['ui.bootstrap', 'kaiju.filters', 'kaiju.controllers', 'kaiju.directives', 'kaiju.services']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/index',
            controller: 'kaijuListController'
        });
        $routeProvider.when('/kaiju/:name', {
            templateUrl: 'partials/kaiju',
            controller: 'kaijuSingleController'
        });
        $routeProvider.otherwise({
                redirectTo: '/'
            });
    }]).config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);
