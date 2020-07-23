angular
    .module('emptyPostsModule', [])
    .component('emptyPostsStub', {
        restrict: 'E',
        templateUrl: 'modules/posts/empty-posts/empty-posts.template.html',
        controller: function ($sce, REPOSITORY_NAME, POST_REQUIRED_TAGS) {
            this.issuesLink = `https://github.com/${REPOSITORY_NAME}/issues`
            this.requiredTags = POST_REQUIRED_TAGS
            this.requiredTagsList = $sce.trustAsHtml(
                this.requiredTags
                    .slice(0, -1)
                    .map(tag => `<b>${tag}</b>`)
                    .join(', ')
                +
                ` and <b>${this.requiredTags.slice(-1)}`
            )

            const title = 'Hello World!'
            const body = `
## There is my first post on Blogit system
\n
I'm very happy :smile_cat:
            `

            this.newIssueLink = `https://github.com/${REPOSITORY_NAME}/issues/new` +
                '?title=' + encodeURIComponent(title) +
                '&body=' + encodeURIComponent(body) +
                '&labels=' + this.requiredTags.map(label => encodeURIComponent(label)).join(',')
        }

    })