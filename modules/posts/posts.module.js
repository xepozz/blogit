angular
    .module('posts')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<posts></posts>'
            })
            .when('/tag/:tag', {
                template: '<posts tag="$resolve.tag"></posts>',
                resolve: {
                    tag: ($route) => $route.current.params.tag.toString()
                }
            })
        ;
    })
;