module.exports = (env, callback) ->

  env.contentPlugins = _.filter env.contentPlugins, (plugin) -> return not ( plugin.group == 'pages' && plugin.pattern == "**/*.json" )
  if env.mode == 'preview' && env.locals.dev? then env.locals.url = env.locals.dev

  callback()