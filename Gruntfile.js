
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      files: ['dist', 'tmp', 'test/fixtures/**.json']
    },
    nodeunit: {
      files: ['test/*.js']
    },
    resx2json: {
      localePatternOverride: {
        src: ['test/fixtures/localePatternOverride/**/*.resx'],
        options: {
          dest: 'tmp/localePatternOverride/',
          localePattern: /([a-z]{2,2})-.*$/
        }
      },
      localePatternConcatOverride: {
        src: ['test/fixtures/localePatternOverride/**/*.resx'],
        options: {
          dest: 'tmp/localePatternConcatOverride/',
          localePattern: /([a-z]{2,2})-.*$/,
          concat: true
        }
      },
      localeExtractorOverride: {
        src: ['test/fixtures/base/**/*.resx'],
        options: {
          dest: 'tmp/localeOverride/',
          localeExtractor: function(){return 'abc'}
        }
      },
      nonConcated: {
        src: ['test/fixtures/base/**/*.resx'],
        options: {
          dest: 'tmp/nonConcated/'
        }
      },
      concated: {
        src: ['test/fixtures/base/**/*.resx'],
        options: {
          concat: true,
          dest: 'tmp/concated/'
        }
      },
      noPrefix: {
        src: ['test/fixtures/base/**/*.resx'],
        options: {
          dest: 'tmp/noPrefix/',
          prefix: ''
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'tasks/*.js', 'test/*.js'],
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
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task.
  grunt.registerTask('test', ['default']);
  grunt.registerTask('default', ['clean','resx2json:*','nodeunit']);

};
