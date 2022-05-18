
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
  var img = document.querySelector('img')
  const button = document.querySelector('.send-btn')
  let data = {
    url: url
  }

  function start_loading (data) {
    button.classList.add('is-loading')    
    document.querySelector('.capture-container').classList.add('is-loading')
    var img = document.getElementById('img_loader');
    var capture_url = `/captures/${data.uuid}.jpg`
    console.log("The image is loading...")
    img.onload = function () {
      document.querySelector('.capture-container').classList.remove('is-loading')
      document.querySelector('.capture-img').style.backgroundImage = `url(${capture_url})`
      button.classList.remove('is-loading')
      console.log("The image has loaded!")
    }
    setTimeout(function(){
      img.src = capture_url
    }, 200)
  }

  var request = new Request('/capture', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  fetch(request).then(res => res.json()).then(data => {

    /* validate */
    if (!isValidHttpUrl(data.url)) {
      alert('Please enter a valid URL.')
      return document.getElementById('capture_url').focus()
    }

    start_loading(data)
  })
}
