/**
 * Bootstrap
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