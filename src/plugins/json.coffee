module.exports = (env, callback) ->

  # register a generator, 'json' here is the content group generated content will belong to
  # i.e. contents._.json
  env.registerGenerator 'json', (contents, callback) ->
    #console.log contents
    callback null, {}

  # tell the plugin manager we are done
  callback()