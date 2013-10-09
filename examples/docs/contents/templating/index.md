---
title: Templating
description: Variables, helpers, partials and the content tree
template: index.hbs
---

**Embersmith** uses [Handlebars](http://handlebarsjs.com/) templating engine.

<div class="alert alert-danger">A page without the template metadata will not be generated. You will get a *404* when you try to access that page.</div>

## Variables

On every page, you have access to all of page's build in properties and metadata.

- ```{{locals}}``` object with data from locals property in your **onfig.json*
- ```{{contents}}``` entire [contents tree](#Content-Tree)
- ```{{title}}``` from **title** metadata
- ```{{description}}``` from **description** metadata
- ```{{intro}}``` text before first ```<span class='more'></span>```, ```<h2>``` or ```<hr>```
- ```{{hasMore}}``` beyond the *intro* as a boolean
- ```{{url}}``` complete ( ie. http://example.com/page.html )
- ```{{markdown}}``` unparsed version of the *markdown*
- ```{{{html}}}``` rendered from *markdown*
- ```{{date}}``` in format entered in *date* metadata
- ```{{rfc822date}}``` [rfc822](http://feedvalidator.org/docs/error/InvalidRFC2822Date.html) version of date
- ```{{page}}``` original page that was used to create the context

Metadata will automatically be available without a prefix.

```markdown
---
title: Example
some_property: some value
---
```

You can use ```{{some_property}}``` to get the value.

## Helpers

Helpers are functions that you can execute in your templates. To register a helper, create a **.js** file in **/templates/helpers**. The name of the file will become the helper. Your helpers can be in **JavaScript** or **CoffeeScript**

Here is a **say-hello** helper in *JavaScript*.

```javascript
module.exports = function( name ) {
  return "Hello " + name;
}
```

And equivalent helper in *CoffeeScript*.

```coffeescript
module.exports = (name) -> "Hello #{ name }"
```

 ```{{say-hello 'Emberist'}}``` will output "Hello Emberist"

### Scope

Inside of helper functions, you have access to the page that was used to create the context for the **Handlebars** template. It gives you methods like ```this.parse_markdown(content)``` which you can use to parse *Markdown* from *metadata*.

## Partials

Partials go into **/templates/partials** directory. Every partial is a *Handlebars* file with **hbs** extension. You can include partials in a template with ```{{> name_of_partial}}```.

## Content Tree

In the template, you have access to a ```contents``` variable. You can use this variable to access directories and pages in the contents tree. Let's take a look at the following tree structure. 

```
/contents/animals/index.md
/contents/animals/tiger.md
/contents/animals/lion/index.md
/contents/fish/bash.md
/contents/fish/trout.md
```

```contents.animals._.pages``` would give you an object with properties as file or directory name and value as the page. You can use this object to interate over pages.

```handlebars
{{#each contents.animals._.pages}}
  {{title}}
{{/each}}
```

To access the *index.md* file in a directory, 

```handlebars
{{#with contents.animals._.index.[0]}}
  {{title}}
{{/with}}
```