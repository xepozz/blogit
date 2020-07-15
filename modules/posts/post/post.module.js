angular
    .module('postModule', ['ngRoute'])
    .factory('PostRepository', function PostRepository($http) {
        return {
            loadPost: async (id) => {
                return $http
                    .get(`https://api.github.com/repos/xepozz/blogit/issues/${id}?state=open&sort=created`)
                    // .get(`http://localhost:63342/blogit/src/posts/${id}.md`)
                    .then(response => {
                        // const post = (response.data);
                        const post = createPostFromIssue(response.data);
                        console.log(response.data)
                        console.log(post)

                        return post
                    })
            }
        };
    })
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
            .when('/post/:id', {
                template: '<post post="$resolve.post"></post>',
                resolve: {
                    post: function (PostRepository, $route) {
                        return PostRepository.loadPost($route.current.params.id);
                    },
                }
            })
        ;
    }])
;


function Post(id, title, body, author, tags, createdAt) {
    return {
        id: id,
        title: title,
        body: body,
        author: author,
        tags: tags,
        selfUrl: id,
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

    return new Post(issue.number, issue.title, issue.body, author, tags, issue.created_at)
}