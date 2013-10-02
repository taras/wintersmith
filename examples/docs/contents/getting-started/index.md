---
title: Getting Started
description: An overview of Embersmith, how to install it, project templates and commands.
template: index.hbs
tltr: | 
  **Installation**
  ```npm install -g embersmith```

  **Create Starter Kit Project**
  ```embersmith create dir_name```

  **Create EAK Project**
  ```embersmith create -T appkit dir_name```

  **Start Preview Server**
  ```embersmith preview```

  **Build**
  ```embersmith build```

  **With Grunt** use [grunt-embersmith](https://npmjs.org/package/grunt-embersmith) package
---

## Overview

**Embersmith** is a Node.js application that takes *Markdown* files from your project's **/contents** directory and converts them to *HTML* & *JSON* in **/public** directory.

****

## Installation

If you don't already have Node.js installed, you can install it from [Node.js website](http://nodejs.org/) or with a package manager ( like [Homebrew](http://brew.sh/) on Mac OS X ).

Run ```npm install -g embersmith``` to install **Embersmith**.

****

## Project Templates

**Embersmith** comes with 3 project templates:

- [Ember Starter Kit](https://github.com/emberjs/starter-kit) for experiments and demos
- [Ember App Kit](https://github.com/stefanpenner/ember-app-kit) for ambitious applications
- Docs - this site

****

## Create a new project

You can create a project from command line with the ```embersmith create dir_name```(subsitute dir_name for name of the directory) command. This command will assume that you want to create an **Ember Starter Kit** based project. 

To start an **Ember App Kit** based project, you have to tell the *create* command to use the **appkit** template. You can do this with **-T appkit** arguement. ```embersmith create -T appkit dir_name```

****

## Add to an existing project

To add **Embersmith** to an existing project, 

```json
{
  "locals": {
    "name": "",
    "url": "",
    "dev": "",
    "description": "",
    "keywords": ""
  }
}
```

1. create **config.json**
2. create **contents** & **templates** directories in the root of your project
3. create **partials** & **helpers** directories in **templates** directory
4. (Optional) ```npm install embersmith --save-dev``` add save as dev dependancy in your project's **package.json**

****

## Use with Grunt

For projects that use Grunt, you can use the [grunt-embersmith](https://npmjs.org/package/grunt-embersmith) package to automate starting and stoping your server. Add it to your projects with **npm install grunt-embersmith**.

****

## Commands

Once you created a project, you can run **Embersmith** commands inside of your project directory.

- ```embersmith preview``` - starts preview server
- ```embersmith build``` - generate all of the pages into the build directory

<div class="alert alert-warning">When using **Embersmith** with *Ember App Kit*, do not use the ```embersmith``` executable. It will give you very confusing results. Run ```grunt server``` and **embersmith:build** task instead.</div>
