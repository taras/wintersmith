module.exports = (env, callback) ->

  if env.mode == 'preview' && env.locals.dev? then env.locals.url = env.locals.dev

  callback()