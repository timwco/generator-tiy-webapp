### Yeoman TIY Generator

This is a simple [Yeoman](http://yeoman.io/) generator based off the [Gulp Generator](https://github.com/yeoman/generator-gulp-webapp). It has been made specifically for students at The Iron Yard and is used as an introduction to Yeoman & Gulp. It includes a specific set of tools that we use throughout our course and purposefully omits certain ones until we need them.

### What it Includes

* Gulp (instead of Grunt)
* HTML Template 
* jQuery
* Normalize
* Mocha/Chai

### What is Optional

* Sass
* Bourbon & Neat
* Underscore

### Installation & Usage

To install:

```sh
npm install -g generator-tiy-webapp
```

To update:

```sh
npm update -g generator-tiy-webapp
```

Check Current Version - [Current Version](https://github.com/twhitacre/generator-tiy-webapp/releases)

```sh
npm list -g  generator-tiy-webapp
```

This is used like any other Yeoman generator. Simply navigate to your new project folder and run:

```sh
yo tiy-webapp
```

There are a few specific tasks so feel free to check out the `gulpfile.js` but the four most used ones will be.

* `gulp` - This will run the default and build your `dist` folder
* `gulp watch` - Starts a server and watches for changes, also livereload
* `gulp test-server` - Starts a server instance to view your Mocha tests in the browser

## Deploying Your App

By default the `/dist` folder is now ignored by git, so if you want to push this to Github Pages, you will need to remove that from the `.gitignore` file. Once you do that, the command below will work properly.

* `gulp deploy` - Deploys your `dist` folder to a `gh-pages` branch as a subtree push
