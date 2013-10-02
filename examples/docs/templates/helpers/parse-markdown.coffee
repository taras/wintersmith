module.exports = (markdown) -> 
  """ Parse Markdown and return HTML """
  return if markdown then @page.parse_markdown(markdown)