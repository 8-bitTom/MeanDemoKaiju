var services = angular.module('kaiju.services', []);

services.factory('getKaijus', [ '$http',
    function ($http) {
        return $http.get('api/kaijus');
    }
]);