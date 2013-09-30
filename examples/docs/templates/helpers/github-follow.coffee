module.exports = (username) ->
  if username
    """<iframe src="http://ghbtns.com/github-btn.html?user=#{ username }&type=follow"
  allowtransparency="true" frameborder="0" scrolling="0" width="120" height="20"></iframe>"""
  else 
    ""