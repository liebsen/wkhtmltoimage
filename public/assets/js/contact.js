let sendMessage = form => {
  form.style.opacity = 0.5
  form.querySelector('button[type="submit"]').innerHTML = 'Sending...'
  const formData = new FormData(form)
  var data = {}
  formData.forEach(function(value, key){
    data[key] = value
  })

  var request = new Request('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  fetch(request).then(res => res.json()).then(e => {
    if (e.success) {
      form.classList.add('is-hidden')
      let block = document.querySelector('.message-text')
      if (block) {
        block.classList.remove('is-hidden')
        block.classList.add('is-success')
        block.textContent = e.message
      }
    }
  })

  return false
}

