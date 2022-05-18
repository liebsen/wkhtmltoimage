document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
  const $pathname = location.pathname

  document.querySelectorAll('.navbar-item').forEach(item => {
    item.classList.remove('has-background-info', 'has-text-white')
    if ($pathname === item.getAttribute('href')) {
      item.classList.add('has-background-info', 'has-text-white')
    }
  })

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target
      const $target = document.getElementById(target)

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active')
      $target.classList.toggle('is-active')

    })
  })

})

