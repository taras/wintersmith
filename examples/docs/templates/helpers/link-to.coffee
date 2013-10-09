module.exports = (url, options) ->
  [ @env.locals.url, @env.config.baseUrl, url ].join('')