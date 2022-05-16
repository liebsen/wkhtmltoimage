
function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function capture () {
  let url = document.getElementById('capture_url').value
  if (!isValidHttpUrl(url)) {
    alert('Please enter a valid URL.')
    return document.getElementById('capture_url').focus()
  }
  const button = document.querySelector('.send-btn')
  let data = {
    url: url
  }
  button.classList.add('is-loading')
  var request = new Request('/capture', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  fetch(request).then(res => res.json()).then(data => {
    setTimeout(() => {
      document.querySelector('.capture-img').style.backgroundImage = `url(/captures/${data.uuid}.jpg)`
      button.classList.remove('is-loading')
    }, 1000)
    // Handle response we get from the API
  })
}
