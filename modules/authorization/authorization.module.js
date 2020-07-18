angular
    .module('authorizationModule', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/authorization', {
                template: '<authorization></authorization>',
            })
    })
;
