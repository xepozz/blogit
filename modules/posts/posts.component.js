angular
    .module('posts', ['post'])
    .controller('PostCollection', function ($scope, $http) {
        $scope.posts = [];
        $scope.canLoadNext = true
        $scope.pageSize = 1
        $scope.currentPage = 0

        $scope.availablePosts = {
            0: [1],
            // 1: [2],
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
                .get(`https://api.github.com/repos/xepozz/blogit/issues/${id}?state=open&sort=created`)
                // .get(`http://localhost:63342/blogit/src/posts/${id}.md`)
                .then(response => {
                    // const post = (response.data);
                    const post = createPostFromIssue(response.data);
                    console.log(response.data)
                    console.log(post)

                    $scope.posts.push(post)
                })
            ;
        };
    })
    .directive('posts', function () {
        return {
            restrict: 'E',
            templateUrl: 'modules/posts/posts.template.html',
        };
    })
;