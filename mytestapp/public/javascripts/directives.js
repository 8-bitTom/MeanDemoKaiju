var directives = angular.module('kaiju.directives', []);
directives.directive('addKaiju', function () {
    return {
        restrict: 'E',
        templateUrl: '/directives/kaijuAdd'
    };
});

directives.directive('ngX', function() {
    return function(scope, elem, attrs) {
        attrs.$observe('ngX', function(x) {
            elem.attr('x', x);
        });
    };
});

directives.directive('ngY', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngY', function(y) {
                elem.attr('y', y);
            });
        };
    });

directives.directive('ngWidth', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngWidth', function(width) {
                elem.attr('width', width);
            });
        };
    });

directives.directive('ngHeight', function() {
        return function(scope, elem, attrs) {
            attrs.$observe('ngHeight', function(height) {
                if(height !== "null"){
                    elem.attr('height', height);
                }
            });
        };
    });

directives.directive('ngXlink', function() {
    return function(scope, elem, attrs) {
        attrs.$observe('ngXlink', function(path) {
            elem.attr('xlink:href', path);
        });
    };
});

directives.directive('ngTransform', function() {
    return function(scope, elem, attrs) {
        attrs.$observe('ngTransform', function(params) {
            elem.attr('transform', params);
        });
    };
});

directives.directive('ngX1', function() {
    return function(scope, elem, attrs) {
        attrs.$observe('ngX1', function(params) {
            elem.attr('X1', params);
        });
    };
});

directives.directive('ngY1', function() {
    return function(scope, elem, attrs) {
        attrs.$observe('ngY1', function(params) {
            elem.attr('y1', params);
        });
    };
});

directives.directive('ngY2', function() {
    return function(scope, elem, attrs) {
        attrs.$observe('ngY2', function(params) {
            elem.attr('y2', params);
        });
    };
});

directives.directive('ngX2', function() {
    return function(scope, elem, attrs) {
        attrs.$observe('ngX2', function(params) {
            elem.attr('x2', params);
        });
    };
});