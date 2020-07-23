angular
    .module('app', ['ngStorage', 'posts', 'authorizationModule'])
    .config(function ($provide) {
        $provide.constant('BASE_API_URL', 'https://api.github.com/repos/xepozz/blogit')
    })
    .factory('Base64Encoder', function () {
        return {
            encode: (value) => btoa(unescape(encodeURIComponent(value))),
            decode: (value) => decodeURIComponent(escape(atob(value))),
        }
    })
    .directive('main', function () {
        return {
            restrict: 'E',
            templateUrl: 'template/layout/main.html',
        };
    })
    .directive('header', function () {
        return {
            restrict: 'A',
            templateUrl: 'template/layout/header.html',
        };
    })
    .directive('content', function () {
        return {
            restrict: 'A',
            templateUrl: 'template/content/main.html',
        };
    })
    .directive('footer', function () {
        return {
            restrict: 'A',
            templateUrl: 'template/layout/footer.html',
        };
    })
    .run(function ($http, $localStorage, Base64Encoder) {
        if ($localStorage.github?.token) {
            const token = Base64Encoder.decode($localStorage.github?.token);
            $http.defaults.headers.common.Authorization = 'token ' + token;
        }
    })
;
