angular
    .module('commentsModule', [])
    .factory('CommentRepository', function ($http, PromiseCacheService, BASE_API_URL, $log) {
        return {
            getForPost: async (id) => {
                id = Number(id)
                const cacheKey = 'post-comments-id-' + id;
                return PromiseCacheService.getOrSet(
                    cacheKey,
                    () => $http
                        .get(`${BASE_API_URL}/issues/${id}/comments?sort=created`, {
                            headers: {
                                Accept: 'application/vnd.github.VERSION.html+json'
                            }
                        })
                        .then(response => {
                            $log.debug('response', response.config.url, response.data)
                            const comments = response.data.map(comment => createComment(comment))
                            $log.debug('comments', comments)

                            return comments
                        })
                )
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

    return new Comment(issue.id, issue.body_html, author, issue.created_at)
}