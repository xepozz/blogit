const sanitizerConfig = {
    // FORBID_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr'],
    ALLOWED_TAGS: ['b', 'i', 'u', 'a', 'br', 'p', 'code', 'span', 'pre'],
    FORBID_ATTR: ['style'],
    IN_PLACE: true
}
angular
    .module('app')
    .factory('Base64Encoder', function () {
        return {
            encode: (value) => btoa(unescape(encodeURIComponent(value))),
            decode: (value) => decodeURIComponent(escape(atob(value))),
        }
    })
    .factory('HtmlSanitizer', function () {
        return {
            sanitize: (value) => DOMPurify.sanitize(value, sanitizerConfig)
        }
    })
    .factory('PromiseCacheService', function ($q, $log, $localStorage, TimeIntervalService) {
        $log.debug('$localStorage:', $localStorage)
        const defaultCacheTimeInterval = '10min';

        const internalCacheKey = 'blogit';
        if (!$localStorage[internalCacheKey]) {
            $localStorage[internalCacheKey] = {};
        }
        let internalStorage = $localStorage[internalCacheKey];

        function softClone(data) {
            if (Array.isArray(data)) {
                return data.map(item => softClone(item))
            }

            return Object.assign({}, data)
        }

        return {
            getOrSet: async (cacheKey, promiseInFunction, time = defaultCacheTimeInterval) => {
                const timeInterval = TimeIntervalService.createFromString(time)

                let cacheItem = internalStorage[cacheKey];
                if (cacheItem && cacheItem.expiresAt > (new Date()).getTime()) {
                    $log.debug(
                        'Cache hit detected by key',
                        `"${cacheKey}"`,
                        'with value',
                        cacheItem.value,
                        'expires at',
                        new Date(cacheItem.expiresAt)
                    )
                    const cacheItemValue = softClone(cacheItem.value)
                    return $q.resolve(
                        Array.isArray(cacheItemValue)
                            ? cacheItemValue
                            : Object.assign({}, cacheItemValue)
                    )
                }

                $log.debug('No cache hit detected', cacheKey)
                const promise = promiseInFunction();

                internalStorage[cacheKey] = {
                    value: softClone(await promise),
                    expiresAt: timeInterval.getTotalTime()
                }

                return promise
            }
        }
    })
    .factory('TimeIntervalService', function () {
        return {
            createFromString: (string) => {
                const parts = String(string).split(' ')
                const minutes = parseInt(parts.find(part => part.includes('min')))
                const hours = parseInt(parts.find(part => part.includes('hour')))

                return {
                    minutes: minutes,
                    hours: hours,
                    toSeconds: () => minutes * 60 + hours * 3600,
                    toMilliSeconds: function () {
                        return this.toSeconds() * 1000
                    },
                    getTotalTime: function () {
                        return (new Date((new Date()).getTime() + this.toMilliSeconds())).getTime()
                    },
                }
            }
        }
    })
;
Array.prototype.includesArray = function (array) {
    if (array.length > this.length) {
        return false
    }

    for (const index in array) {
        if (array.hasOwnProperty(index) && !this.includes(array[index])) {
            return false
        }
    }

    return true
}
