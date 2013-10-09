---
title: Writing
description: Describing directory sturcture, document structure, Markdown syntax, syntax highlighting and JSON generation.
template: index.hbs
---

## Directories

**Embersmith** generates output from files in the **./contents** directory. You can change the *contents* directory path by setting the **contents** property in your project's **config.json**. 

To start writing, we have to create a Markdown file in the *contents* directory. Files with **md** extension will be converted to **html** and written to the **build** directory following the same directory structure.

Pretty urls can be accomplished by creating a directory with an **index.md**.

```
/contents/hello.md                -> /public/hello.html
/contents/hello-world/index.md    -> /public/hello-world/index.html
/contents/hello-world/another.md  -> /public/hello-world/another.html
```

<div class="alert alert-warning">Pages without **template** metadata will not be written to the output directory.</div>

## Documents

Every **Embersmith** document starts with *metadata* at the top, followed by *Markdown* that will be converted to *HTML*. Here is an example of a basic **Embersmith** document.

```
---
title: Basic document
description: Document that shows basic markup. 
template: index.hbs
---

Your *Markdown* code will go here.

```

## Metadata

**Embersmith** metadata is [YAML](http://yaml.org/) formatted string between ```---```. *YAML* parsing is provided by [js-yaml](https://github.com/nodeca/js-yaml) module and covers all of the *YAML* data types including [arrays](#Arrays), [objects](#Objects) and [multiline strings](#Multiline-Strings).

### Arrays
```
---
title: Array demo
people:
  - Tom
  - Bob
  - Jerry
---
```

### Objects
```
---
title: Object demo
person: 
  name: George
  eye-color: green
---
```

### Multiline Strings
```
---
title: Multiline String Demo
long: |
  This will is all one string
  very cool!
---
```

## Markdown

**Embersmith** allows you to write content using [GitHub flavored Markdown](https://help.github.com/articles/github-flavored-markdown). *Markdown* parsing is provided by [marked](https://github.com/chjj/marked) module. You can configure the Markdown parser by specifying any of the *marked* module options in *markdown* property of your project's **config.json**.

```json
{
  "locals": {...},
  "markdown": {
    "gfm": true,           # use GitHub flavored Markdown
    "tables": true,        # enable GFM tables support 
    "breaks": false,       # enable GFM breaks
    "sanitize": false,     # Sanitize the output. Ignore any HTML that has been input.
    "smartLists": true,    # Use smarter list behavior than the original markdown.
    "smartypants": false,  # Use "smart" typograhic punctuation for things like quotes and dashes.
    "langPrefix": "lang-"  # Set the prefix for code block classes.
  }
}

```

## Images

You can place images into the directory where they will be used and embed it with ```![Image description](file.png)``` and the path will be automatically resolved.

## Syntax highlighting

Syntax highlighting is provided by [highlight.js](https://github.com/isagalaev/highlight.js) module. You can do inline code highlighting and fenced in.

## JSON Generation

**Embersmith** will generate a *JSON* file for every root directory with an **index.md** file. This *JSON* will contain metadata, html and markdown of every file in that directory. You can use these files to preload static content into your *Ember* app.

With the following content structure, you will only get a **/contents/animals.json** file for */contents/animals* directory. The */contents/fish* directory will not generate a JSON file because it doesn't have an **index.md** file.

```
/contents/animals/index.md
/contents/animals/tiger.md
/contents/animals/lion/index.md
/contents/fish/bash.md
/contents/fish/trout.md
```

Checkout the [/contributors](/contributors) page and its [/contributors.json](/contributors.json) representation.