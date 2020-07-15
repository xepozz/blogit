angular
    .module('posts', ['postModule', 'ngRoute'])
    .controller('PostCollection', function ($scope, $http, $q, PostRepository) {
        $scope.posts = [];
        $scope.canLoadNext = true
        $scope.pageSize = 1
        $scope.currentPage = 0
        $scope.showSpinner = true

        $scope.availablePosts = {
            0: [1, 2],
            1: [],
        };

        $scope.loadNext = () => {
            $scope.showSpinner = true
            $scope.loadNextPage()
        }
        $scope.loadNextPage = function () {
            const posts = $scope.availablePosts[$scope.currentPage] ?? []

            console.log('Load page', $scope.currentPage, 'posts', posts)
            const promises = [];
            for (const id of posts) {
                promises.push(PostRepository.loadPost(id))
            }
            $q
                .all(promises)
                .then(posts => {
                    console.log(posts)
                    const sortedPosts = posts.sort((a, b) => a.id > b.id)
                    $scope.posts.push(...sortedPosts)
                })

            $scope.showSpinner = false
            $scope.currentPage++
            $scope.canLoadNext = $scope.availablePosts.length !== $scope.posts.length
        }
        $scope.loadPosts = () => {
            $scope.loadNextPage($scope.currentPage)
        };
    })
    .component('posts', {
        templateUrl: 'modules/posts/posts.template.html',
        restrict: 'E',
    })
;