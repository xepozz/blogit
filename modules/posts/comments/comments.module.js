angular
    .module('commentsModule', [])
    .factory('CommentRepository', function ($http, BASE_API_URL, $log) {
        return {
            getForPost: async (id) => {
                return $http
                    .get(`${BASE_API_URL}/issues/${id}/comments?sort=created`)
                    .then(response => {
                        $log.debug('response', response.config.url, response.data)
                        const comments = response.data.map(comment => createComment(comment))
                        $log.debug('comments', comments)

                        return comments
                    })
            },
        };
    })
;

function Comment(id, body, author, createdAt) {
    return {
        id: id,
        body: body,
        author: author,
        selfUrl: id,
        createdAt: createdAt,
    }
}

function createComment(issue) {
    const author = new Author(issue.user.login, issue.user.html_url, issue.user.avatar_url);

    return new Comment(issue.id, issue.body, author, issue.created_at)
}