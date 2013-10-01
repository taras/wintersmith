""" Add ids to all headings which allows to link to them """

cheerio = require('cheerio')
slugify = require('./toc').slugify

module.exports = (html) ->
  headings = []
  $ = cheerio.load(html)
  $('h2, h3, h4, h5, h6').each ->
    $this = $(this)
    text = $this.text()
    slug = slugify text
    $this.attr("id", slug)
    headings["##{ slug }"] = text
  return $.html()