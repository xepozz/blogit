angular
    .module('components', [])
    .directive('loadNext', function ($sce) {
        return {
            restrict: 'A',
            templateUrl: 'template/content/post/load-next.html',
        };
    })
    .directive('post', function ($sce) {
        return {
            restrict: 'E',
            scope: {post: '='},
            link: function ($scope) {
                $scope.post = $sce.trustAsHtml(marked(DOMPurify.sanitize($scope.post)))
            },
            templateUrl: 'template/content/post/post.html',
        };
    })
    .directive('main', function ($sce) {
        return {
            restrict: 'E',
            link: function ($scope) {
                $scope.post = $sce.trustAsHtml(marked($scope.post))
            },
            templateUrl: 'template/layout/main.html',
        };
    })
    .directive('header', function ($sce) {
        return {
            restrict: 'A',
            link: function ($scope) {
                $scope.post = $sce.trustAsHtml(marked($scope.post))
            },
            templateUrl: 'template/layout/header.html',
        };
    })
    .directive('content', function ($sce) {
        return {
            restrict: 'A',
            link: function ($scope) {
                $scope.post = $sce.trustAsHtml(marked($scope.post))
            },
            templateUrl: 'template/content/main.html',
        };
    })
    .directive('footer', function ($sce) {
        return {
            restrict: 'A',
            link: function ($scope) {
                $scope.post = $sce.trustAsHtml(marked($scope.post))
            },
            templateUrl: 'template/layout/footer.html',
            // template: 'template/layout/footer.html',
        };
    })
;