'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var wiredep = require('wiredep');

var AppGenerator = module.exports = function Appgenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // Installing mocha using shared generator
  this.hookFor('mocha', {
    as: 'app',
    options: {
      options: {
        'skip-install': options['skip-install-message'],
        'skip-message': options['skip-install']
      }
    }
  });

  this.options = options;
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  if (!this.options['skip-welcome-message']) {
    this.log(yosay('Welcome to the TIY App Generator \n Version: ' + this.pkg.version));
    this.log(chalk.magenta('Included in this generator is a HTML Template, Normalize, jQuery, Mocha/Chai(for testing) and Gulp.'));
  }

  var prompts = [{
    type: 'checkbox',
    name: 'features',
    message: 'What more would you like?',
    choices: [{
      name: 'Sass',
      value: 'includeSass',
      checked: true
    },{
      name: 'UnderscoreJS',
      value: 'includeUnderscore',
      checked: true
    },{
      name: 'Bourbon & Neat',
      value: 'includeBourbon',
      checked: false 
    }]
  }];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    var hasFeature = function (feat) {
      return features.indexOf(feat) !== -1;
    }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.includeSass = hasFeature('includeSass');
    this.includeBourbon = hasFeature('includeBourbon');
    this.includeUnderscore = hasFeature('includeUnderscore');

    cb();
  }.bind(this));
};

AppGenerator.prototype.gulpfile = function () {
  this.template('gulpfile.js');
};

AppGenerator.prototype.packageJSON = function () {
  this.template('_package.json', 'package.json');
};

AppGenerator.prototype.git = function () {
  this.copy('gitignore', '.gitignore');
};

AppGenerator.prototype.bower = function () {
  this.copy('bower.json', 'bower.json');
};


AppGenerator.prototype.editorConfig = function () {
  this.copy('Readme.md', 'Readme.md');
};

AppGenerator.prototype.h5bp = function () {
  this.copy('favicon.ico', 'app/favicon.ico');
};

AppGenerator.prototype.mainStylesheet = function () {
  var css = 'main.' + (this.includeSass ? 's' : '') + 'css';
  this.copy(css, 'app/styles/' + css);
};

AppGenerator.prototype.writeIndex = function () {
  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    optimizedPath: 'scripts/main.js',
    sourceFileList: ['scripts/main.js']
  });
};

AppGenerator.prototype.app = function () {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.write('app/index.html', this.indexFile);
  this.write('app/scripts/main.js', 'console.log(\'JavaScript!!!\');');
};

AppGenerator.prototype.install = function () {
  var howToInstall =
    '\nAfter running `npm install & bower install`, inject your front end dependencies into' +
    '\nyour HTML by running:' +
    '\n' +
    chalk.yellow.bold('\n  gulp wiredep');

  if (this.options['skip-install']) {
    this.log(howToInstall);
    return;
  }

  var done = this.async();
  this.installDependencies({
    skipMessage: this.options['skip-install-message'],
    skipInstall: this.options['skip-install'],
    callback: function () {
      var bowerJson = JSON.parse(fs.readFileSync('./bower.json'));

      // wire Bower packages to .html
      wiredep({
        bowerJson: bowerJson,
        directory: 'bower_components',
        src: 'app/index.html'
      });

      if (this.includeSass) {
        // wire Bower packages to .scss
        wiredep({
          bowerJson: bowerJson,
          directory: 'bower_components',
          src: 'app/styles/*.scss'
        });
      }

      done();
    }.bind(this)
  });
};
