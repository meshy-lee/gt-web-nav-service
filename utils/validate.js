function isString(str, len) {
  if (!len) return (Object.prototype.toString.call(str) === '[object String]' && str !== '')
  else return (Object.prototype.toString.call(str) === '[object String]' && str !== '' && str.length <= len)
}

function isNum(val) {
  if (val === '' || val === null) {
    return false;
  }
  return !!(!isNaN(val))
}

function isUrl(url) {
  const reg = /(www|http:|https:)+[^\s]+[\w]/
  return !!(url !== '' && reg.test(url))
}

module.exports = {
  isString,
  isNum,
  isUrl
}