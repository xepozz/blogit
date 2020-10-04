angular
    .module('postModule')
    .component('post', {
        templateUrl: 'modules/posts/post/post.template.html',
        bindings: {
            post: '=',
        },
        controller: function ($sce, PostRepository, PostFactory, $q, $routeParams) {
            this.commentsLoaded = false;
            this.showSpinner = true;
            this.loadComments = () => {
                this.commentsLoaded = true;
            };
            this.likesCount = 0;
            this.dislikesCount = 0;

            this.$onInit = () => {
                $q
                    .resolve(PostRepository.getReactionCounters(this.post.id))
                    .then(result => {
                        this.likesCount = result.thumbUp;
                        this.dislikesCount = result.thumbDown;
                    });

                let description = this.post.body;
                const delimiter = '<hr>'

                if ($routeParams && !$routeParams.id && this.post.body.includes(delimiter)) {
                    description = PostFactory.getShortDescription(this.post, delimiter)
                }

                this.post.body = $sce.trustAsHtml(description);
                this.showSpinner = false;
            };
        }
    });
