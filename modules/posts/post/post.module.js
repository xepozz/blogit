angular
    .module('postModule', ['ngRoute', 'commentsModule'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/post/:id', {
                template: '<post post="$resolve.post"></post>',
                resolve: {
                    post: function (PostRepository, $route) {
                        post = PostRepository.getById($route.current.params.id);
                        return post
                    },
                }
            })
        ;
    })
    .factory('PostFactory', function (POST_REQUIRED_TAGS) {
        function createFromIssue(issue) {
            const author = new Author(issue.user.login, issue.user.html_url, issue.user.avatar_url);
            let tags = issue.labels.map((label) => label.name);

            if (!tags.includesArray(POST_REQUIRED_TAGS)) {
                throw new Error("You can't see unpublished posts.")
            }
            tags = tags.filter(n => !POST_REQUIRED_TAGS.includes(n))

            return new Post(issue.number, issue.title, issue.body_html, author, tags, issue.comments, issue.created_at);
        }

        function createFromIssueList(issueList) {
            return issueList.map(issue => createFromIssue(issue))
        }

        return {
            createFromIssue: createFromIssue,
            createFromIssueList: createFromIssueList,
        }
    })
    .factory('PostRepository', function ($http, $log, PostFactory, PromiseCacheService, $q, BASE_API_URL, POST_REQUIRED_TAGS) {
        return {
            getReactionCounters: async (id) => {
                id = Number(id)
                const cacheKey = 'reactions-id-' + id;
                return PromiseCacheService.getOrSet(
                    cacheKey,
                    () => $http
                        .get(`${BASE_API_URL}/issues/${id}/reactions`, {
                            headers: {
                                Accept: 'application/vnd.github.squirrel-girl-preview+json',
                            },
                            cache: true,
                        })
                        .then(response => {
                            $log.debug('response', response.config.url, response.data)
                            let reactionCounters = {
                                '+1': 0,
                                '-1': 0,
                                'laugh': 0,
                                'confused': 0,
                                'heart': 0,
                                'hooray': 0,
                                'rocket': 0,
                                'eyes': 0,
                            }
                            response.data.map(data => {
                                const emoji = data.content;
                                if (reactionCounters.hasOwnProperty(emoji)) {
                                    reactionCounters[emoji]++
                                }
                            })

                            const arguments = Object.entries(reactionCounters).map(property => property[1]);
                            return ReactionCounters.apply(null, arguments)
                        })
                )
            },
            getById: async (id) => {
                id = Number(id)
                const cacheKey = 'post-id-' + id;
                return PromiseCacheService.getOrSet(
                    cacheKey,
                    () => $http
                        .get(`${BASE_API_URL}/issues/${id}?state=open`, {
                            headers: {
                                Accept: 'application/vnd.github.VERSION.html+json'
                            },
                            cache: true,
                        })
                        .then(response => {
                            $log.debug('response', response.config.url, response.data)
                            const post = PostFactory.createFromIssue(response.data);
                            $log.debug('post', post)
                            return post
                        }),
                    '2hours'
                )
            },
            getByFilter: async (filter) => {
                let url = `${BASE_API_URL}/issues`;
                url += '?sort=created'
                if (filter.state) {
                    url += '&state=' + filter.state
                }
                if (filter.limit) {
                    url += '&per_page=' + filter.limit
                }
                if (filter.offset) {
                    url += '&page=' + filter.offset
                }
                url += '&labels=' + POST_REQUIRED_TAGS.join(',')
                if (filter.tag) {
                    url += ',' + filter.tag
                }
                const cacheKey = 'posts-filter-' + Object.values(filter).join('-')
                return PromiseCacheService.getOrSet(
                    cacheKey,
                    () => $http
                        .get(url, {
                            headers: {
                                Accept: 'application/vnd.github.VERSION.html+json'
                            },
                            cache: true,
                        })
                        .then(response => {
                            $log.debug('response', response.config.url, response.data)
                            const posts = PostFactory.createFromIssueList(response.data);
                            $log.debug('posts', posts)

                            return posts
                        }),
                    '4hours'
                )
            }
        };
    })
;

function ReactionCounters(thumbUp, thumbDown, laugh, confused, heart, hooray, rocket, eyes) {
    return {
        thumbUp: thumbUp,
        thumbDown: thumbDown,
        laugh: laugh,
        confused: confused,
        heart: heart,
        hooray: hooray,
        rocket: rocket,
        eyes: eyes,
    }
}

function PostRepositoryFilter(limit, offset, tag) {
    return {
        limit: limit,
        offset: offset,
        state: 'open',
        tag: tag,
    }
}


function Post(id, title, body, author, tags, commentsCount, createdAt) {
    return {
        id: id,
        title: title,
        body: body,
        author: author,
        tags: tags,
        selfUrl: id,
        commentsCount: commentsCount,
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
