angular
    .module('posts')
    .config(function config($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<posts></posts>'
            })
        ;
    })
;