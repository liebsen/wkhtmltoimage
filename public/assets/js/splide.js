document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.splide.col3')) {
    document.querySelectorAll('.splide.col3').forEach(e => {
      new Splide(e, {
        arrowPath: 'M20 12l-2.83 2.83 9.17 9.17-9.17 9.17 2.83 2.83 12-12z',
        perPage: 3,
        padding: '0',
        breakpoints: {
          '640': {
            perPage: 1
          }
        }}).mount()
    })
  }
  if (document.querySelector('.splide.col1')) {
    document.querySelectorAll('.splide.col1').forEach(e => {
      new Splide(e, {
        arrowPath: 'M20 12l-2.83 2.83 9.17 9.17-9.17 9.17 2.83 2.83 12-12z',
        perPage: 1,
        padding: '0'
      }).mount()
    })
  }
})