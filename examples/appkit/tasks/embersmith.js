// Credit goes to https://github.com/davidtucker
// Repository https://github.com/davidtucker/grunt-wintersmith/blob/master/tasks/wintersmith.js

var embersmith = require("embersmith");

module.exports = function(grunt) {

  var done = {};

  var callback = function(error) {
    if(error) {
      throw error;
      done(false);
    }
    if(done) {
      done();
    }
  };

  grunt.registerMultiTask("embersmith", "Use the embersmith static site generator", function () {

    var options = this.options();
    grunt.verbose.writeflags(options, 'Options');
    var _ = grunt.util._;

    // Create options object by merging user defined options and default options
    options = _.defaults(options, {
      action: 'build',
      config: './config.json'
    });

    // This is an async task, so we need to get the done function
    done = this.async();

    // Create the embersmith environment using config file
    var env = embersmith(options.config);

    if(options.action === 'build') {
      // Build the site using the specified options
      env.build(callback);
    } else if(options.action === 'preview') {
      // This is asynchronous and needs to continue - be sure done isn't called
      done = null;
      env.preview(callback);
    } else {
      grunt.log.error('Action not supported.  May be build or preview.');
      done(false);
    }

  });

};