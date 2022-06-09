var scrollImg = e => {
  console.log('----')
  console.log(e)
}
document.addEventListener('DOMContentLoaded', () => {

  var img = document.getElementById('img_loader')
  console.log("The image is loading...")
  img.onload = () => {
    document.querySelector('.capture-img').classList.remove('is-hidden')
    document.querySelector('.capture-container').classList.remove('is-loading')
    document.querySelector('.capture-img').classList.remove('skewInDesktop')
    setTimeout(() => {
      document.querySelector('.capture-img').classList.add('skewInDesktop')
    }, 1)
    document.querySelector('.capture-img').style.backgroundImage = `url(${img.src})`
    console.log("The image has loaded!")
    img.onmouseover = e => {
      console.log(e)
    }    
  }

  /* img.addEventListener('mouseover', e => {
    console.log(e)
  }) */

  setTimeout(function(){
    img.src = img.src
  }, 500)    
})