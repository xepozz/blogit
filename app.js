angular
    .module('app', ['posts'])
    .config(['$httpProvider', function ($http) {
        $http.defaults.headers.common.Authorization = 'token ';
    }])
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

/**
 * Bootstrap
 */

marked.setOptions({
    highlight: function (code, language) {
        console.log(code)
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        return hljs.highlight(validLanguage, code).value;
    },
    pedantic: true,
    gfm: true,
    breaks: false,
    sanitize: true,
    smartLists: true,
    smartypants: true,
    xhtml: true
});