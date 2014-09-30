
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
      languagePatternOverride: {
        src: ['test/fixtures/languagePatternOverride/**/*.resx'],
        options: {
          dest: 'tmp/languagePatternOverride/output',
          languagePattern: /([a-z]{2,2})-.*$/
        }
      },
      languagePatternConcatOverride: {
        src: ['test/fixtures/languagePatternOverride/**/*.resx'],
        options: {
          dest: 'tmp/languagePatternConcatOverride/output',
          languagePattern: /([a-z]{2,2})-.*$/,
          concat: true
        }
      },
      localeExtractorOverride: {
        src: ['test/fixtures/base/**/*.resx'],
        options: {
          dest: 'tmp/localeOverride/output',
          localeExtractor: function(){return 'abc'}
        }
      },
      nonConcated: {
        src: ['test/fixtures/base/**/*.resx'],
        options: {
          dest: 'tmp/nonConcated/output'
        }
      },
      concated: {
        src: ['test/fixtures/base/**/*.resx'],
        options: {
          concat: true,
          dest: 'tmp/concated/output'
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
  grunt.registerTask('default', ['clean','resx2json:languagePatternOverride','resx2json:languagePatternConcatOverride','resx2json:localeExtractorOverride','resx2json:nonConcated', 'resx2json:concated', 'nodeunit']);

};
