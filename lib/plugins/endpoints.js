var _ = require('underscore');

var __hasProp = {}.hasOwnProperty,
  __extends = function (child, parent) {
    for (var key in parent) {
      if (__hasProp.call(parent, key)) child[key] = parent[key];
    }
    function ctor() {
      this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
  };

module.exports = function (env, callback) {
  var Endpoint, getEndpoints, jsonView, buildEndpoints;
  Endpoint = (function (_super) {
    __extends(Endpoint, _super);

    function Endpoint(filepath, content) {
      this.filepath = filepath;
      this.content = content;
    }

    Endpoint.prototype.getFilename = function () {
      return this.filepath.relative;
    };

    Endpoint.prototype.getView = function () {
      return 'json';
    };

    return Endpoint;

  })(env.plugins.Page);
  /**
   * Return all pages with metadata endpoint set to true
   * @param contents
   * @returns {Array}
   */
  getEndpoints = function (contents) {
    var page, _i, _len, _ref, _results;
    _ref = contents._.directories;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      page = _ref[_i];
      if (page["index.md"] != null) {
        _results.push(page["index.md"]);
      }
    }
    return _results;
  };

  buildEndpoints = function (page) {
    var content, filename, filepath, item, relative, _ref;
    content = [];
    _ref = page.parent;
    for (filename in _ref) {
      item = _ref[filename];
      if (item !== page) {
        if (item instanceof env.ContentTree) {
          content.push(item["index.md"]);
        } else {
          content.push(item);
        }
      }
    }
    relative = page.filepath.relative.replace(/\/index.md/, '') + '.json';
    filepath = {
      relative: relative,
      full: page.filepath.full.replace(/\/index.md/, '') + '.json'
    };
    return this[relative] = new Endpoint(filepath, content);
  };

  jsonView = function (env, locals, contents, templates, callback) {
    var content, obj;
    content = (function () {
      var _i, _len, _ref, _results;
      _ref = this.content;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        if (obj instanceof env.plugins.MarkdownPage) {
          _results.push(obj.serialize());
        }
      }
      return _results;
    }).call(this);
    return callback(null, new Buffer(JSON.stringify(content)));
  };
  env.registerView('json', jsonView);
  env.registerGenerator('endpoints', function (contents, callback) {
    var rv = {};
    if (env.config.endpoints || false) {
      rv.endpoints = {};
      _.forEach(getEndpoints(contents), buildEndpoints, rv.endpoints);
    }
    return callback(null, rv);
  });
  env.plugins.Endpoint = Endpoint;
  env.functions.getEndpoints = getEndpoints;
  return callback();
};