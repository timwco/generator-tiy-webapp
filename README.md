### Yeoman TIY Generator

This is a simple [Yeoman](http://yeoman.io/) generator based off the [Gulp Generator](https://github.com/yeoman/generator-gulp-webapp). It has been made specifically for students at The Iron Yard and is used as an introduction to Yeoman & Gulp. It includes a specific set of tools that we use throughout our course and purposefully omits certain ones until we need them.

### What it Includes

* Gulp (instead of Grunt)
* HTML5 Boilerplate
* jQuery
* Normalize
* Sass*
* Modernizer*
* Bourbon*
* Underscore*

_* optional during setup_

### Usage

This is used like any other Yeoman generator. Simply navigate to your new project folder and run:

```sh
yo tiy-webapp
```

There are a few specific tasks so feel free to check out the `gulpfile.js` but the three most used onces will be.

* `gulp` - This will run the default and build your `dist` folder
* `gulp watch` - Starts a server and watches for changes, also livereload
* `gulp deploy` - Deploys your `dist` folder to a `gh-pages` branch*

_* Since we are not pushing a subtree, this will push all of your `dist` folder and other files to your `gh-pages` branch. I'm looking for a better way, but for now that is what is happening._

### Installation

Again since this will change frequently and does not include some tools it has not been published. This means you'll need to link it up manually.

First, clone the repo.

```sh
git clone git@github.com:twhitacre/generator-tiy-webapp.git
```

Change to the directory

```sh
cd generator-tiy-webapp
```

Then link it so we can access it

```sh
npm link
```

Lastly, since we added deploy, you will need to open up your `gulpfile.js` and the SSH link to your remote repo so you can deploy it to Github Pages.
