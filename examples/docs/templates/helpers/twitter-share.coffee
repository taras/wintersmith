module.exports = (options) ->
  url = if ( options.hash.url ) then "data-url='#{ options.hash.url }'"
  text = if ( options.hash.text ) then "data-text='#{ options.hash.text }'"
  size = if ( options.hash.size ) then "data-size='#{ options.hash.size }'"
  """<a href="https://twitter.com/share" class="twitter-share-button" #{ url } #{ text } #{ size }>Tweet</a>
    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>"""