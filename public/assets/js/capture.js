
function capture () {
  const button = document.querySelector('.send-btn')
  let data = {
    url: document.getElementById('capture_url').value
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
