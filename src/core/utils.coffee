### utils.coffee ###

util = require 'util'
fs = require 'fs'
path = require 'path'
async = require 'async'

fileExists = fs.exists or path.exists
fileExistsSync = fs.existsSync or path.existsSync

extend = (obj, mixin) ->
  for name, method of mixin
    obj[name] = method

stripExtension = (filename) ->
  filename.replace /(.+)\.[^.]+$/, '$1'

readJSON = (filename, callback) ->
  ### Read and try to parse *filename* as JSON, *callback* with parsed object or error on fault. ###
  async.waterfall [
    (callback) ->
      fs.readFile filename, callback
    (buffer, callback) ->
      try
        rv = JSON.parse buffer.toString()
        callback null, rv
      catch error
        error.filename = filename
        error.message = "parsing #{ path.basename(filename) }: #{ error.message }"
        callback error
  ], callback

readJSONSync = (filename) ->
  ### Synchronously read and try to parse *filename* as json. ###
  buffer = fs.readFileSync filename
  return JSON.parse buffer.toString()

readdirRecursive = (directory, callback) ->
  ### Returns an array representing *directory*, including subdirectories. ###
  result = []
  walk = (dir, callback) ->
    async.waterfall [
      async.apply fs.readdir, path.join(directory, dir)
      (filenames, callback) ->
        async.forEach filenames, (filename, callback) ->
          relname = path.join dir, filename
          async.waterfall [
            async.apply fs.stat, path.join(directory, relname)
            (stat, callback) ->
              if stat.isDirectory()
                walk relname, callback
              else
                result.push relname
                callback()
          ], callback
        , callback
    ], callback
  walk '', (error) -> callback error, result

module.exports = {fileExists, fileExistsSync, extend, stripExtension, readJSON, readJSONSync, readdirRecursive}
