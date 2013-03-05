var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    meta: {
      version: '0.1.0',
      banner: '/*! CascadiaJS - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'CascadiaJS; Licensed MIT */'
    },

    concat: {
      dist: {
        src: ['asset/js/*.js'],
        dest: 'js/compiled/site.js'
      }
    },

    regarde: {
      js: {
        files: 'asset/js/*.js',
        tasks: ['jshint', 'uglify', 'livereload'],
        spawn: true
      },

      css: {
        files: 'asset/css/scss/*.scss',
        tasks: ['compass:build', 'livereload'],
        events: true
      },

      img: {
        files: ['asset/img/*.png', 'asset/img/*.jpg'],
        tasks: ['imagemin', 'livereload']
      },

      html: {
        files: '*.html',
        tasks: 'livereload'
      }
    },

    compass: {
      build: {
        options: {
          sassDir: 'asset/css/scss',
          cssDir: 'asset/css',
          environment: 'production'
        }
      }
    },

    connect: {
      livereload: {
        options: {
          port: 8000,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, '.')];
          }
        }
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        devel: true
      },

      globals: {
        jQuery: true,
        $: true,
        _: true
      }
    },

    uglify: {
      options: {
        sourceMap: 'asset/js/sourcemap.json',
        sourceMappingURL: '/asset/js/sourcemap.json',
        sourceMapPrefix: 1
      },
      dist: {
        files: {
          'asset/js/compiled/site.min.js': ['asset/js/*.js']
        }
      }
    },

    imagemin: {
      options: {
        optimizationLevel: 3
      },

      files: {
        'asset/img/*.png': 'asset/img/*.png',
        'asset/img/*.jpg': 'asset/img/*.jpg'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['livereload-start','connect','regarde']);
  grunt.registerTask('start', ['livereload-start','connect','open-browser','regarde']);
  grunt.registerTask('build', ['compass:build', 'jshint', 'uglify', 'imagemin']);

  grunt.registerTask('open-browser', function() {
    var open = require('open');
    open( 'http://localhost:8000' );
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-regarde');
};
