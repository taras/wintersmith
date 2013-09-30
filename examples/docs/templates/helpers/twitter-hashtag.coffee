module.exports = (url) ->
  return """<a href="https://twitter.com/intent/tweet?button_hashtag=embersmith" class="twitter-hashtag-button" data-size="large" data-related="tarasm" data-url="#{ url }">Tweet #embersmith</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
"""