angular
    .module('app', ['config', 'spinnerModule', 'ngStorage', 'posts', 'authorizationModule'])
    .config(function ($provide, $logProvider, DEBUG_ENABLED, REPOSITORY_NAME) {
        $logProvider.debugEnabled(DEBUG_ENABLED)
        $provide.constant('BASE_API_URL', 'https://api.github.com/repos/' + REPOSITORY_NAME)
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
    .directive('footer', function ($anchorScroll) {
        return {
            restrict: 'A',
            templateUrl: 'template/layout/footer.html',
            link: function ($scope) {
                $scope.scrollToTop = () => {
                    $anchorScroll()
                }
            }
        };
    })
    .run(function ($http, $localStorage, Base64Encoder) {
        if ($localStorage.github?.token) {
            const token = Base64Encoder.decode($localStorage.github?.token);
            $http.defaults.headers.common.Authorization = 'token ' + token;
        }
    })
;
