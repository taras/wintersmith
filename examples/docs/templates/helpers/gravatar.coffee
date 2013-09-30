crypto = require('crypto')

module.exports = ->
  md5sum = crypto.createHash('md5');
  md5sum.update(@metadata.email);
  hash = md5sum.digest("hex")
  if @metadata.email then "http://www.gravatar.com/avatar/#{ hash }?s=250" else ''