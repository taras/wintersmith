module.exports = (options) ->
  """ Output an alert with text from body of the block and type from args
  Example: {{#alert type="success"}}Great success!{{/alert}}
  """
  type = if options.hash.type then options.has.type else "info"
  text = options.fn()
  """<div class="alert alert-${ type }">#{ text }</div>"""