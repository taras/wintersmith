(function() {
  var fs, handlebars, path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  handlebars = require('handlebars');

  path = require('path');

  fs = require('fs');

  require('coffee-script');

  module.exports = function(env, callback) {
    var HandlebarsHelper, HandlebarsPartial, HandlebarsTemplate, options;
    options = env.config.handlebars || {
      "partialDir": "partials",
      "helperDir": "helpers"
    };
    HandlebarsTemplate = (function(_super) {
      __extends(HandlebarsTemplate, _super);

      function HandlebarsTemplate(tpl) {
        this.tpl = tpl;
      }

      HandlebarsTemplate.prototype.render = function(locals, callback) {
        var ctx, error, rendered;
        try {
          ctx = locals.page.serialize();
          ctx['page'] = locals.page;
          ctx['contents'] = locals.contents;
          ctx['locals'] = locals.env.locals;
          ctx['env'] = env;
          rendered = this.tpl(ctx);
          return callback(null, new Buffer(rendered));
        } catch (_error) {
          error = _error;
          return callback(error);
        }
      };

      return HandlebarsTemplate;

    })(env.TemplatePlugin);
    HandlebarsTemplate.fromFile = function(filepath, callback) {
      return fs.readFile(filepath.full, function(error, contents) {
        var tpl;
        if (error) {
          return callback(error);
        } else {
          try {
            tpl = handlebars.compile(contents.toString());
            return callback(null, new HandlebarsTemplate(tpl));
          } catch (_error) {
            error = _error;
            return callback(error);
          }
        }
      });
    };
    HandlebarsPartial = (function(_super) {
      __extends(HandlebarsPartial, _super);

      function HandlebarsPartial() {
        return HandlebarsPartial.__super__.constructor.apply(this, arguments);
      }

      return HandlebarsPartial;

    })(HandlebarsTemplate);
    HandlebarsPartial.fromFile = function(filepath, callback) {
      return fs.readFile(filepath.full, function(error, contents) {
        var basename, ext, tpl;
        if (error) {
          return callback(error);
        } else {
          try {
            ext = path.extname(filepath.relative);
            basename = path.basename(filepath.relative, ext);
            tpl = handlebars.compile(contents.toString());
            handlebars.registerPartial(basename, tpl);
            return callback(null, new HandlebarsPartial(tpl));
          } catch (_error) {
            error = _error;
            return callback(error);
          }
        }
      });
    };
    HandlebarsHelper = (function(_super) {
      __extends(HandlebarsHelper, _super);

      function HandlebarsHelper() {
        return HandlebarsHelper.__super__.constructor.apply(this, arguments);
      }

      return HandlebarsHelper;

    })(HandlebarsTemplate);
    HandlebarsHelper.fromFile = function(filepath, callback) {
      var basename, error, ext, fn;
      try {
        ext = path.extname(filepath.relative);
        basename = path.basename(filepath.relative, ext);
        fn = require(filepath.full);
        if (fn) {
          handlebars.registerHelper(basename, fn);
          return callback(null, null);
        } else {
          error = new Error('Could not load helper function');
          return callback(error);
        }
      } catch (_error) {
        error = _error;
        return callback(error);
      }
    };
    env.registerTemplatePlugin('**/*.*(hbs)', HandlebarsTemplate);
    env.registerTemplatePlugin("**/" + options.partialDir + "/*.*(hbs)", HandlebarsPartial);
    env.registerTemplatePlugin("**/" + options.helperDir + "/*.*(js|coffee)", HandlebarsHelper);
    return callback();
  };

}).call(this);
