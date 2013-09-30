module.exports = (env, callback) ->

  class Endpoint extends env.plugins.Page
    constructor: (@filepath, @content) ->
    getFilename: -> @filepath.relative
    getView: -> 'json'

  getEndpoints = (contents) -> 
    """ Return all pages with metadata endpoint set to true """
    ( page["index.md"] for page in contents._.directories when page["index.md"]? )

  jsonView = (env, locals, contents, templates, callback) ->
    # serialize all of the objects
    content = ( obj.serialize() for obj in @content when obj instanceof env.plugins.MarkdownPage )
    callback null, new Buffer JSON.stringify(content)

  env.registerView 'json', jsonView

  # register a generator, 'endpoints' here is the content group generated content will belong to
  # i.e. contents._.endpoints
  env.registerGenerator 'endpoints', (contents, callback) ->

    rv = {endpoints:{}}
    getEndpoints(contents).map (page) -> 
      content = []
      for filename, item of page.parent
        if item != page
          if item instanceof env.ContentTree
            content.push item["index.md"]
          else
            content.push item
      relative = page.filepath.relative.replace(/\/index.md/, '') + '.json'
      filepath = {
        relative: relative,
        full: page.filepath.full.replace(/\/index.md/, '') + '.json'
      }      
      rv.endpoints[relative] = new Endpoint filepath, content

    callback null, rv

  env.plugins.Endpoint = Endpoint
  env.functions.getEndpoints = getEndpoints

  # tell the plugin manager we are done
  callback()