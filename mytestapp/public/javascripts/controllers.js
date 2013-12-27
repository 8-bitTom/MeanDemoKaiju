/**
 * Created with IntelliJ IDEA.
 * User: tmarra
 * Date: 11/4/13
 * Time: 11:15 AM
 * To change this template use File | Settings | File Templates.
 */
var controllers = angular.module('kaiju.controllers', ['angularFileUpload']);

controllers.controller('kaijuListController', ['$scope', '$http', '$upload',
    function($scope, $http, $upload) {

        $scope.kaijus = [];

            $http.get('api/kaijus.json').
            success(function(data, status, headers, config) {
                $scope.kaijus = data;
            })

        $scope.noKaijus = $scope.kaijus.length > 0? false : true ;

        $scope.newKaiju = new defaultObj();

        function defaultObj(){
            return {
                name : 'UNKNOWN',
                discovered : new Date(),
                appearances: [],
                images: [],
                svg: '',
                hasSVG: false,
                strength: -1,
                speed: -1,
                energy: -1,
                height: null,
                description: null,
                powers: [],
                defeated: false,
                fought: []
            }

        };

        $scope.addSighting = function(event) {
            event.preventDefault();
            if($scope.sighting){
                $scope.newKaiju.appearances.push($scope.sighting);
                $scope.sighting = null;
                $scope.noAppearances = false;
            }
        };

        $scope.noAppearances = true;

        $scope.removeSighting = function(index, event) {
            event.preventDefault();
            if($scope.newKaiju.appearances[index]){
                $scope.newKaiju.appearances.splice(index, 1);
            }
            if($scope.newKaiju.appearances.length < 1){
                $scope.noAppearances = true;
            }
        };

        $scope.noimage = true;
        $scope.nosvg = true;

        $scope.addFile = function(evt, $files, type) {
            //evt.preventDefault();
            if($files){
                for (var i = 0; i < $files.length; i++) {
                    var $file = $files[i];
                    if(type === 'image'){
                        $scope.newKaiju.images.push($file.name);
                    }else{
                        $scope.newKaiju.svg = $file.name;
                        $scope.newKaiju.hasSVG = true;
                    }


                    $scope.upload = $upload.upload({
                        url: 'api/' + type, //upload.php script, node.js route, or servlet url
                        method: 'POST',
                        file: $file
                        //formDataAppender: function(formData, key, val){}
                    }).progress(function(evt) {
                            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                        }).success(function(data, status, headers, config) {
                            // file is uploaded successfully
                            console.log(data);
                        });

                }
                $scope['no'+type] = false;
            }
        };

        $scope.removeFile = function(index, event) {
            event.preventDefault();
            if($scope.newKaiju.images[index]){
                $scope.newKaiju.images.splice(index, 1);
            }
            if($scope.newKaiju.images.length < 1){
                $scope.noimage = true;
            }
        };

        $scope.removeSVG = function(index, event) {
            event.preventDefault();
            $scope.newKaiju.svg = '';
            $scope.noSVG = true;
        }

        $scope.setKaijus = function(kaijus) {
            $scope.kaijus = kaijus;
        };

        $scope.addNewKaiju = function(){
            $http.post('api/kaiju.json', $scope.newKaiju).success(function(data){
                if (data.kaiju){
                    $scope.kaijus.push(data.kaiju);
                    $scope.newKaiju = new defaultObj();
                    $scope.noimage = true;
                    $scope.nosvg = true;
                } else {
                    alert(JSON.stringify(data));
                }
            })
        };
    }
]);

controllers.controller('kaijuSingleController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $scope.loaded = false;
        $scope.error = false;

        $http.get('api/kaiju?name='+ $routeParams.name).
            success(function(data, status, headers, config) {
                $scope.kaiju = data;
                $scope.loaded = true;
                $scope.lines = [];

                if($scope.kaiju.hasSVG && $scope.kaiju.height){
                    for(var i=0; i < $scope.kaiju.height; i+=10){
                        var line = {
                            x1: 0,
                            y1: i,
                            x2: 900,
                            y2: i
                        }
                        $scope.lines.push(line);
                    }
                }
            }).
            error(function(data, status, headers, config) {
                $scope.error = true;
                $scope.errorMsg = data
            })
    }
]);