(function() {
  var async, fs, hljs, marked, parseMarkdownSync, path, url, yaml,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  async = require('async');

  fs = require('fs');

  hljs = require('highlight.js');

  marked = require('marked');

  path = require('path');

  url = require('url');

  yaml = require('js-yaml');

  if (marked.InlineLexer.prototype._outputLink == null) {
    marked.InlineLexer.prototype._outputLink = marked.InlineLexer.prototype.outputLink;
    marked.InlineLexer.prototype._resolveLink = function(href) {
      return href;
    };
    marked.InlineLexer.prototype.outputLink = function(cap, link) {
      link.href = this._resolveLink(link.href);
      return this._outputLink(cap, link);
    };
  }

  parseMarkdownSync = function(content, baseUrl, options) {

    /* Parse markdown *content* and resolve links using *baseUrl*, returns html. */
    marked.InlineLexer.prototype._resolveLink = function(uri) {
      return url.resolve(baseUrl, uri);
    };
    options.highlight = function(code, lang) {
      var error;
      if (lang != null) {
        try {
          if (lang === 'c') {
            lang = 'cpp';
          }
          return hljs.highlight(lang, code).value;
        } catch (_error) {
          error = _error;
          return code;
        }
      } else {
        return code;
      }
    };
    marked.setOptions(options);
    return marked(content);
  };

  module.exports = function(env, callback) {
    var MarkdownPage;
    MarkdownPage = (function(_super) {
      __extends(MarkdownPage, _super);

      function MarkdownPage(filepath, metadata, markdown) {
        this.filepath = filepath;
        this.metadata = metadata;
        this.markdown = markdown;
      }

      MarkdownPage.prototype.getLocation = function(base) {
        var uri;
        uri = this.getUrl(base);
        return uri.slice(0, +uri.lastIndexOf('/') + 1 || 9e9);
      };

      MarkdownPage.prototype.getHtml = function(base) {
        var options;
        if (base == null) {
          base = env.config.baseUrl;
        }

        /* parse @markdown and return html. also resolves any relative urls to absolute ones */
        options = env.config.markdown || {};
        return parseMarkdownSync(this.markdown, this.getLocation(base), options);
      };

      MarkdownPage.prototype.serialize = function() {
        var key, page, value, _ref;
        page = {
          title: this.title,
          description: this.description,
          intro: this.intro,
          url: env.locals.url + this.url,
          markdown: this.markdown,
          html: this.html,
          date: this.date,
          rfc822date: this.rfc822date,
          hasMore: this.hasMore
        };
        _ref = this.metadata;
        for (key in _ref) {
          value = _ref[key];
          if (page[key] == null) {
            page[key] = value;
          }
        }
        return page;
      };

      MarkdownPage.prototype.parse_markdown = function(markdown) {
        var options;
        options = env.config.markdown || {};
        return parseMarkdownSync(markdown, this.getLocation(env.config.baseUrl), options);
      };

      return MarkdownPage;

    })(env.plugins.Page);
    MarkdownPage.fromFile = function(filepath, callback) {
      return async.waterfall([
        function(callback) {
          return fs.readFile(filepath.full, callback);
        }, function(buffer, callback) {
          return MarkdownPage.extractMetadata(buffer.toString(), callback);
        }, (function(_this) {
          return function(result, callback) {
            var markdown, metadata, page;
            markdown = result.markdown, metadata = result.metadata;
            page = new _this(filepath, metadata, markdown);
            return callback(null, page);
          };
        })(this)
      ], callback);
    };
    MarkdownPage.extractMetadata = function(content, callback) {
      var markdown, metadata, parseMetadata, result;
      parseMetadata = function(source, callback) {
        var error, lines, markerPad;
        if (!(source.length > 0)) {
          return callback(null, {});
        }
        try {
          return callback(null, yaml.load(source) || {});
        } catch (_error) {
          error = _error;
          if ((error.problem != null) && (error.problemMark != null)) {
            lines = error.problemMark.buffer.split('\n');
            markerPad = ((function() {
              var _i, _ref, _results;
              _results = [];
              for (_i = 0, _ref = error.problemMark.column; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--) {
                _results.push(' ');
              }
              return _results;
            })()).join('');
            error.message = "YAML: " + error.problem + "\n\n" + lines[error.problemMark.line] + "\n" + markerPad + "^\n";
          } else {
            error.message = "YAML Parsing error " + error.message;
          }
          return callback(error);
        }
      };
      metadata = '';
      markdown = content;
      if (content.slice(0, 3) === '---') {
        result = content.match(/^-{3,}\s([\s\S]*?)-{3,}(\s[\s\S]*|\s?)$/);
        if ((result != null ? result.length : void 0) === 3) {
          metadata = result[1];
          markdown = result[2];
        }
      }
      return async.parallel({
        metadata: function(callback) {
          return parseMetadata(metadata, callback);
        },
        markdown: function(callback) {
          return callback(null, markdown);
        }
      }, callback);
    };
    env.registerContentPlugin('pages', '**/*.*(markdown|mkd|md)', MarkdownPage);
    env.registerContentPlugin('index', '**/index.*(markdown|mkd|md)', MarkdownPage);
    env.helpers.markdown = parseMarkdownSync;
    return callback();
  };

}).call(this);
