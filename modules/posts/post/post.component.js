angular
    .module('post', [])
    .directive('post', function ($sce) {
        return {
            restrict: 'E',
            scope: {post: '='},
            link: function ($scope) {
                $scope.post.body = $sce.trustAsHtml(marked($scope.post.body))
            },
            templateUrl: 'modules/posts/post/post.template.html',
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