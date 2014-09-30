var grunt = require('grunt');

exports['dotnetresources'] = {
  setUp: function(done) {
    done();
  },
  tearDown: function(done) {
    done();
  },
  'resx2json:concated' : function(test){
    test.expect(4);
    var filename = 'tmp/concated/output.json';
    var filePres = grunt.file.exists(filename);
    test.ok(filePres, "File wasn't properly generated");
    var jsonRepresentation = grunt.file.readJSON(filename);
    test.ok(jsonRepresentation.en, 'No English representation found');
    test.ok(jsonRepresentation.fr, 'No French representation found');
    test.ok(jsonRepresentation.fr.onlyInFrenchie, 'French only value not present')
    test.done();
  },
  'resx2json:nonConcated': function(test) {
    test.expect(3);
    var basePath = 'tmp/nonConcated/output';
    var extension = '.json';
    test.ok(grunt.file.exists(basePath+'-en.json'), 'English file not present');
    test.ok(grunt.file.exists(basePath+'-fr.json'), 'French file not present');

    var jsonRepresentation = grunt.file.readJSON(basePath+'-fr.json');
    test.ok(jsonRepresentation.onlyInFrenchie, 'French only value not present in merged file');
    test.done();
  },
  'resx2json:localOverride': function(test){
    test.expect(1);
    test.ok(grunt.file.exists('tmp/localeOverride/output-abc.json'), 'Locale override was not present');
    test.done();
  },
  'resx2json:languagePatternOverride': function(test){
    test.expect(2);
    test.ok(grunt.file.exists('tmp/languagePatternOverride/output-fr.json'), 'French file not properly generated');
    test.ok(grunt.file.exists('tmp/languagePatternOverride/output-en.json'), 'English file not properly generated');
    test.done();
  },
  'resx2json:languagePatternConcatOverride': function(test){
    test.expect(4);
    test.ok(grunt.file.exists('tmp/languagePatternConcatOverride/output.json'), 'Concated file not properly generated');

    var jsonRepresentation = grunt.file.readJSON('tmp/languagePatternConcatOverride/output.json');
    test.ok(jsonRepresentation.en, 'No English representation found');
    test.ok(jsonRepresentation.fr, 'No French representation found');
    test.ok(jsonRepresentation.fr.onlyInFrenchie, 'French only value not present')
    test.done();
  }
};
