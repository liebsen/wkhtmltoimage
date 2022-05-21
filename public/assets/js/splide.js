document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.splide')) {
    document.querySelectorAll('.splide').forEach(e => {
      console.log(e)
      new Splide(e, {
        arrowPath: 'M20 12l-2.83 2.83 9.17 9.17-9.17 9.17 2.83 2.83 12-12z',
        perPage: 3,
        padding: '0',
        breakpoints: {
          '640': {
            perPage: 1
          }
        }}).mount();
    })
  }
})