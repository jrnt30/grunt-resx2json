var xml2js = require('xml2js'),
  _ = require("underscore"),
  extend = require('xtend');

module.exports = function(grunt) {

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('resx2json', 'Convert resx to a json file.', function() {
    var task = this;

    var options = task.options({
      defaultLocale: 'en',
      concat: false,
      dest: 'dist/output',
      ext: '.json',
      localePattern: /^.+-(\w+).resx$/,
      localeExtractor: function(src, pattern){
        var match = pattern.exec(src);
        return match ? match[1] : null;
      }
    });

    var filesByLang =
      _.groupBy(this.filesSrc,function(thisFile){return (options.localeExtractor(thisFile, options.localePattern) || options.defaultLocale)});

    var allLocales = {};

    _.each(filesByLang, function(fileArr, lang){
      var allMerged =
        _.chain(fileArr)
          .map(function(filePath){
            return parseFile(grunt.file.read(filePath));
          })
          .reduce(function(merged,cur){return _.extend(merged,cur);},{})
          .value();

      if (options.concat){
        var cur = {};
        cur[lang] = allMerged;
        _.extend(allLocales, cur);
      } else {
        grunt.file.write(options.dest+'-'+lang+options.ext,JSON.stringify(allMerged, null, '\t'));
      }
    });

    if (options.concat){
      grunt.file.write(options.dest+options.ext,JSON.stringify(allLocales, null, '\t'));
    }

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('File converted..');
  });

  var parseFile = function(fileContent,lang) {
    var parser = new xml2js.Parser(),
        resourceArr = {};

    parser.parseString(fileContent, function (err, result) {
        if (err){
          grunt.error.writeln("error:"+err);
          return;
        }
        if (result && result.root){
          resourceArr = _.reduce(result.root.data, function(memo,curEle){memo[curEle['$'].name]=curEle.value; return memo;}, {});
        }}

    });
    return resourceArr;
  };
};