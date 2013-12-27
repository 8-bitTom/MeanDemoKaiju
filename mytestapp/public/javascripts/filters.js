/**
 * Created with IntelliJ IDEA.
 * User: tmarra
 * Date: 11/20/13
 * Time: 4:06 PM
 * To change this template use File | Settings | File Templates.
 */

var filters = angular.module('kaiju.filters', []);

filters.filter('class',
    function(){
        return function(item){
            if(item !== undefined){
                if(item > 90){
                    return 'Class S';
                }else if(item > 75){
                    return 'Class A'
                }else if(item > 50){
                    return 'Class B'
                }else if(item > 25){
                    return 'Class C'
                }else if(item > 0){
                    return 'Class D'
                }else{
                    return 'UNKNOWN'
                }
            }
        };
    }
);

filters.filter('barLevel',
    function(){
        return function(item){
            if(item !== undefined){
                if(item > 75){
                    return 'danger';
                }else if(item > 50){
                    return 'warning'
                }else if(item > 25){
                    return 'success'
                }else if(item > 0){
                    return 'info'
                }
            }
        };
    }
);

filters.filter('unknownImg',
    function(){
        var unknownImageUrl = 'images/monster.jpg';

        return function(imgUrl){
            if(imgUrl !== undefined){
                return imgUrl;
            }else{
                return unknownImageUrl;
            }
        };
    }
);

filters.filter('height',
    function(){
        return function(height){
            if(height){
                return height + ' m';
            }else{
                return '???';
            }
        };
    }
);