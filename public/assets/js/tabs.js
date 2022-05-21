/* Martin Frith <overlemonsoft@gmail.com> */
let dotab = selector => {
  const tab = document.querySelector(`.tabs a[href="#${selector}"]`)
  const block = document.querySelector(`.tab-block.${selector}`)

  document.querySelectorAll('.tab-block').forEach(e => {
    e.style.display = 'none'
  })
  document.querySelectorAll('.tabs ul li').forEach(e => {
    e.classList.remove('is-active')
  })

  if (tab && tab.parentNode) {
    tab.parentNode.classList.add('is-active')
  }
  if (block) {
    block.style.display = 'block'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const selector = location.hash.substring(1)

  if (selector) {
    dotab(selector)
  } else {
    const active = document.querySelector('.tabs ul li.is-active')
    const selector = active.querySelector('a').getAttribute('href').replace('#', '')
    if (selector) {
      dotab(selector)
    }
  }
})

window.addEventListener('hashchange', e => {
  const selector = location.hash.substring(1)
  if (selector) {
    dotab(selector)
  }
})