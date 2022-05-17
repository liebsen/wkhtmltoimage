function copyClipboard (url) {
  navigator.clipboard.writeText(url).then(function() {
    alert(`${url} copied to clipboard`)
  }, function(err) {
    console.error('Async: Could not copy text: ', err)
  })
}
