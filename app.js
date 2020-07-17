angular
    .module('app', ['ngStorage', 'posts'])
    .config(function ($httpProvider, $provide, $localStorageProvider) {
        $localStorageProvider.get('Github') || $localStorageProvider.set('Github', {token: ''})
        $httpProvider.defaults.headers.common.Authorization = 'token ' + $localStorageProvider.get('Github').token;
        $provide.constant('BASE_API_URL', 'https://api.github.com/repos/xepozz/blogit')
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
;
