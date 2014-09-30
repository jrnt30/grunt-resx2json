# grunt-resx2json

> Converts a set of localization files in the resx file format to a set of JSON dictionaries

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install git+https://github.com/jrnt30/grunt-resx2json.git --save-dev
```
Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-resx2json');
```

## resx2json task
_Run this task with the `grunt resx2json` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### defaultLocale

Type: `String`  
Default: `en`

The locale that a file will be assumed to represent should the _languagePattern_ not parse appropriately.


#### concat

Type: `Boolean`  
Default: `false`  

Set `concat` to `true` to have all of the different locales be concated into a single output file, with their respective `locale` being the key and the value being the set of all corresponding values.

The default is false, which will then output a file per locale with the file format `dest`-`locale``ext`


#### dest

Type: `String`  
Default: `dist/output`  

The output destination for the processed files.

When `concat` is `false`, this serves as the base name for the output, which will have the pattern `dest`-`locale``ext`.

When `concat` is `true`, the output will be in the format `dest``ext`.

#### ext

Type: 'String'  
Default: '.json'  

The default extension for the output files to have.

#### languagePattern

Type: `RegExp`
Default: `/^.+-(\w+).resx$/`

A regular expression with a single capture group that extracts the appropriate locale


#### localeExtractor

Type: `Function`  
Default: `function(src, languagePattern){return dest}`

A function given with arguments _(src,languagePattern)_ that is responsible for providing the locale for the given file.

This is used by the plugin to group all the files of a single locale.


### Usage examples

#### Src file declaration
In this example, simply using the common `src` attribute from standard Grunt configuration to specify the set of Resx files to process.  This will result in a different file per locale in the `dest` location with `ext` extension.

```js
// Project configuration.
grunt.initConfig({
  resx2json: {
    src: ['templates/**/*.resx']
  }
});
```

File Structure:
```shell
$ tree -I templates
.
├── baseLocalization/
│   ├── base-de.resx
│   ├── base-fr.resx
│   └── base.resx
└── extended/
    ├── extended-de.resx
    ├── extended-fr.resx
    └── extended.resx

2 directories, 6 files
```

File Output Structure:
```shell
$ tree -I dist
.
└── dist/
    |── output-de.json
    |── output-en.json
    └── output-fr.json
```

#### Concat
In this example, running `grunt resx2json` will result in a single json file, where there is a top level attribtue for each locale.

```js
// Project configuration.
grunt.initConfig({
  resx2json: {
    src: ['templates/**/*.resx'],
    options: {
      concat: true
    }
  }
});
```

File Structure:
```shell
$ tree -I templates
.
├── baseLocalization/
│   ├── base-de.resx
│   ├── base-fr.resx
│   └── base.resx
└── extended/
    ├── extended-de.resx
    ├── extended-fr.resx
    └── extended.resx

2 directories, 6 files
```

File Output Structure:
```shell
$ tree -I dist
.
└── dist/
    └── output.json
```

#### Specifying custom locale pattern

In this example, we use a custom pattern to extract the locale of the files we are parsing. The will result in a file per parsed locale being generated.

```js
// Project configuration.
grunt.initConfig({
  resx2json: {
    src: ['templates/**/*.resx'],
    options: {
      localePattern: /([a-z]{2,2})-.*$/
    }
  }
});
```

File Structure:
```shell
$ tree -I templates
.
├── baseLocalization/
│   ├── de-base.resx
│   ├── fr-base.resx
│   └── base.resx
└── extended/
    ├── de-extended.resx
    ├── fr-extended.resx
    └── extended.resx

2 directories, 6 files
```

File Output Structure:
```shell
$ tree -I dist
.
└── dist/
    |── output-de.json
    |── output-en.json
    └── output-fr.json
```
