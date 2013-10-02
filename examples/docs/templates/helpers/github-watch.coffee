module.exports = (size) ->
  switch size
    when "small"
      width = 75
      height = 20
    else 
      size = "large"
      width = 120
      height = 32
  """<iframe src="http://ghbtns.com/github-btn.html?user=taras&repo=embersmith&type=watch&count=true&size=#{ size }"
  allowtransparency="true" frameborder="0" scrolling="0" width="#{ width }" height="#{ height }"></iframe>"""