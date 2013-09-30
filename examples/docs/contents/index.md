---
title: Embersmith Documentation
description: Documentation for Embersmith stati content generator for Ember.js projects
template: index.hbs
---

**Embersmith** is a static content generator for [Ember.js](http://emberjs.com) projects. It takes *Markdown* files from your project's **/contents** directory and converts them to *HTML* & *JSON* in **/public** directory. Your *Markdown* files can have metadata which is defined as [YAML](http://en.wikipedia.org/wiki/YAML) at the top of the file. Below is an example of a simple document.

```markdown
---
title: Basic document
description: Document that shows basic markup. 
template: index.hbs
---

Your *Markdown* code will go here.

```

The files in **/public** directory will maintain the same directory structure as in **/contents** directory. 

```
/contents/hello.md                -> /public/hello.html
/contents/hello-world/index.md    -> /public/hello-world/index.html
/contents/hello-world/another.md  -> /public/hello-world/another.html
```

**Embersmith** will generate a *JSON* file for every directory. This *JSON* will contain metadata, html and markdown of every file in that directory. You can use these files to preload static content into your *Ember* app.

Checkout the [/contributors](/contributors) page and its [/contributors.json](/contributors.json) representation.

## Installation

**Embersmith** is a Node.js application. If you don't already have Node.js installed, you can install it from [Node.js website](http://nodejs.org/) or with a package manager ( like [Homebrew](http://brew.sh/) on Mac OS X ).

Run ```npm install -g embersmith``` to install **Embersmith**.

## Create a project

**Embersmith** comes with 4 project templates:

- [Ember Starter Kit](https://github.com/emberjs/starter-kit) for experiments and demos - create with ```embersmith create my_project```
- [Ember App Kit](https://github.com/stefanpenner/ember-app-kit) for ambitious applications - create with ```embersmith create -T appkit my_project```
- Blog - a static blog with Ember.js
- Docs - this document

<div class="alert alert-warning">We're looking for contributors to help build a blog template for the Ember community. If you're interested, tweet <a href="https://twitter.com/tarasm">@tarasm</a>.</div>

## CLI Commands

Once you created a project, you can run **Embersmith** commands inside of your project directory.

- ```embersmith preview``` - starts preview server
- ```embersmith build``` - generate all of the pages into the build directory

## Templating

**Embersmith** uses [Handlebars](http://handlebarsjs.com/) templating engine. Every project gets a **/templates** directory with **/templates/partials** and **/templates/helpers**. 

In a page's metadata, you can specify the template that you want to use, like so 

```markdown
title: Example
template: index.hbs
```

<div class="alert alert-danger">A page without the template metadata will not be generated. You will get a *404* when you try to access that page.</div>

### Variables

On every page, you have access to all of page's build in properties and metadata.

- ```{{title}}``` from **title** metadata
- ```{{description}}``` from **description** metadata
- ```{{intro}}``` text before first ```<span class='more'></span>```, ```<h2>``` or ```<hr>```
- ```{{hasMore}}``` beyond the *intro* as a boolean
- ```{{url}}``` complete ( ie. http://example.com/page.html )
- ```{{markdown}}``` unparsed version of the *markdown*
- ```{{{html}}}``` rendered from *markdown*
- ```{{date}}``` in format entered in *date* metadata
- ```{{rfc822date}}``` [rfc822](http://feedvalidator.org/docs/error/InvalidRFC2822Date.html) version of date

Metadata will automatically be available without a prefix.

```markdown
---
title: Example
some_property: some value
---
```

You can use ```{{some_property}}``` to get the value.

### Helpers

Helpers are functions that you can execute in your templates. To register a helper, create a **.js** file in **/templates/helpers**. The name of the file will become the helper. 

**say-hello.js** with ↓ allows me to use ```{{say-hello 'Emberist'}}``` and it will output ```Hello Emerist```.
```javascript
module.exports = function( name ) {
  return "Hello " + name;
}
```

