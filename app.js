angular
    .module('app', ['components'])
    .controller('PostCollection', function ($scope, $http) {
        $scope.posts = [];
        $scope.canLoadNext = true
        $scope.pageSize = 1
        $scope.currentPage = 0

        $scope.availablePosts = {
            0: [1],
            1: [2],
        };

        $scope.loadNext = () => {
            $scope.loadNextPage(++$scope.pageSize)
        }
        $scope.loadNextPage = function () {
            const posts = $scope.availablePosts[$scope.currentPage] ?? []

            console.log('Load page', $scope.currentPage, 'posts', posts)
            for (const id of posts) {
                $scope.loadPost(id);
            }
            $scope.currentPage++
            $scope.canLoadNext = $scope.availablePosts.length !== $scope.posts.length
        }
        $scope.loadPosts = () => {
            $scope.loadNextPage($scope.currentPage)
        };
        $scope.loadPost = (id) => {
            $http
                .get(`http://localhost:63342/blogit/src/posts/${id}.md`)
                .then(response => {
                    $scope.posts.push(response.data)
                })
            ;
        };
    })
;