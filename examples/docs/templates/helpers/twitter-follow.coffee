module.exports = (handle) ->
  if handle
    return """
      <a href="https://twitter.com/#{ handle }" class="twitter-follow-button" data-show-count="false">Follow #{ handle }</a>
      <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
    """
  else
    return ""