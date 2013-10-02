module.exports = (title) ->
  """ Return "active" if passed title matches title of current page """
  return if ( title == @title ) then "active"