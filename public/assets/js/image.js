document.addEventListener('DOMContentLoaded', () => {

  var img = document.getElementById('img_loader');
  console.log("The image is loading...")

  img.onload = () => {
    document.querySelector('.capture-container').classList.remove('is-loading')
    document.querySelector('.capture-img').classList.remove('skewInDesktop')
    setTimeout(() => {
      document.querySelector('.capture-img').classList.add('skewInDesktop')
    }, 100)
    document.querySelector('.capture-img').style.backgroundImage = `url(${img.src})`
    console.log("The image has loaded!")
  }
})