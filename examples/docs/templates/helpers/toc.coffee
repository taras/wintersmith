cheerio = require('cheerio')

slugify = (str) ->
    str = str.replace(/^\s+|\s+$/g, "")
    from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"
    to   = "aaaaeeeeiiiioooouuuunc------"
    for i in [i..from.length]
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
    # remove accents, swap ñ for n, etc  
    str = str.replace(/\s+/g, "-").replace(/-+/g, "-")
    # remove invalid chars, collapse whitespace and replace by -, collapse dashes
    return str # unnecessary line, but for clarity

module.exports = (html, options) ->
  headings = []
  $ = cheerio.load(html)
  $('h2, h3, h4, h5, h6').each ->
    text = $(this).text()
    headings["##{ slugify text }"] = text
  return ( options.fn {title, url} for url, title of headings ).join "\n"

module.exports.slugify = slugify