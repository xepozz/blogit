angular
    .module('components', [])
    .config(['$httpProvider', function ($http) {
        $http.defaults.headers.common.Authorization = 'token ';
    }])
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
    .directive('loadNext', function () {
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
                $scope.post.body = $sce.trustAsHtml(marked($scope.post.body))
            },
            templateUrl: 'template/content/post/post.html',
        };
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

function Post(title, body, author, tags, createdAt) {
    return {
        title: title,
        body: body,
        author: author,
        tags: tags,
        createdAt: createdAt,
    }
}

function Author(username, url, avatarUrl) {
    return {
        username: username,
        url: url,
        avatarUrl: avatarUrl,
    }
}

function createPostFromIssue(issue) {
    const author = new Author(issue.user.login, issue.user.html_url, issue.user.avatar_url);
    const tags = issue.labels.map((label) => label.name);

    return new Post(issue.title, issue.body, author, tags, issue.created_at)
}