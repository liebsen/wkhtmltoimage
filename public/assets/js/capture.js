
function isValidHttpUrl(string) {
  let url;
  
  if (!string.startsWith('http')) {
    string = `https://${string}`
  }

  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function capture () {
  const button = document.querySelector('.send-btn')
  let url = document.getElementById('capture_url').value
  var img = document.querySelector('img')
  let data = { url: url }

  /* validate */
  if (!isValidHttpUrl(url)) {
    alert('Please enter a valid URL.')
    return document.getElementById('capture_url').focus()
  }

  var request = new Request('/capture', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  button.classList.add('is-loading')
  document.querySelector('.capture-container').classList.add('is-loading')

  fetch(request).then(res => res.json()).then(e => {
    capture_loading(e)
  })
}

function capture_loading (data) {
  const button = document.querySelector('.send-btn')
console.log(data)
  if (!data.success) {
    button.classList.remove('is-loading')
    document.querySelector('.capture-container').classList.remove('is-loading')
    document.querySelector('.capture-img').classList.remove('skewInDesktop')

    return alert(`there is a problem with this url: ${data.message}`)
  }
  var img = document.getElementById('img_loader');
  var capture_url = `/captures/${data.uuid}.jpg`
  console.log("The image is loading...")

  img.onload = function () {
    button.classList.remove('is-loading')
    document.querySelector('.capture-container').classList.remove('is-loading')
    document.querySelector('.capture-img').classList.remove('skewInDesktop')
    setTimeout(() => {
      document.querySelector('.capture-img').classList.add('skewInDesktop')
    }, 100)
    document.querySelector('.capture-img').style.backgroundImage = `url(${capture_url})`
    console.log("The image has loaded!")
  }

  setTimeout(function(){
    img.src = capture_url
  }, 500)
}
