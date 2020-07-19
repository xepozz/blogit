angular
    .module('posts')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<posts></posts>'
            })
        ;
    })
;