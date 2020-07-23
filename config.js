/**
 * Application configuration
 */
angular
    .module('config', [])
    .config(function ($provide) {
        $provide.constant('REPOSITORY_NAME', 'xepozz/blogit')
        $provide.constant('DEBUG_ENABLED', true)
        $provide.constant('POST_REQUIRED_TAGS', ['published'])
    })
;

/**
 * Bootstrap another dependencies
 */
marked.setOptions({
    highlight: function (code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        return hljs.highlight(validLanguage, code).value;
    },
    headerIds: true,
    headerPrefix: 'post-',
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    xhtml: true
});