var xml2js = require('xml2js'),
  _ = require("underscore"),
  extend = require('xtend');

module.exports = function(grunt) {

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('resx2json', 'Convert resx to a json file.', function() {
    var task = this;
    var localeExtractor = function(src, options){
        var match = options.localePattern.exec(src);
        return match ? match[1] : options.defaultLocale;
    };

    var rename = function(src, options){
      if (!options) options = src;
      var filename;
      if (options.concat){
        filename = options.prefix+options.ext;
      } else {
        filename = (options.prefix ? options.prefix + '-' : '') + options.localeExtractor(src, options) + options.ext;
      }
      return filename;
    };
    var allLocales = {};
    var options = task.options({
      defaultLocale: 'en',
      concat: false,
      dest: 'dist/',
      prefix: 'output',
      ext: '.json',
      localePattern: /^.+-(\w+).resx$/,
      localeExtractor: localeExtractor
    });

    var filesByLocale =
      _.chain(this.filesSrc)
        .map(function(thisFile){return {src: thisFile, locale: options.localeExtractor(thisFile, options), dest: rename(thisFile, options)}})
        .groupBy(function(destObj){return destObj.locale})
        .value();


    _.each(filesByLocale, function(destObjs, locale){
      var allMerged =
        _.chain(destObjs)
          .map(function(destObj){
            return parseFile(grunt.file.read(destObj.src));
          })
          .reduce(function(merged,cur){return _.extend(merged,cur);},{})
          .value();

      if (options.concat){
        var cur = {};
        cur[locale] = allMerged;
        _.extend(allLocales, cur);
      } else {
        grunt.file.write(options.dest+destObjs[0].dest,JSON.stringify(allMerged, null, '\t'));
      }
    });

    if (options.concat){
      grunt.file.write(options.dest + rename(options),JSON.stringify(allLocales, null, '\t'));
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
          resourceArr = _.reduce(result.root.data, function(memo,curEle){memo[curEle['$'].name]=(curEle.value||[])[0]; return memo;}, {});
        }
    });
    return resourceArr;
  };
};