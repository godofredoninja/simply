(() => {
  const filterBtn = document.querySelectorAll('.js-filter-btn')

  if (!filterBtn.length) return

  function filterSelection (str) {
    const allCard = document.querySelectorAll('.js-filter-items')

    if (!allCard.length) return

    for (let i = 0; i < allCard.length; i++) {
      const portfolioCard = allCard[i]

      portfolioCard.classList.add('hidden')
      // portfolioCard.style.transform = 'scale(0.8)'

      if (portfolioCard.getAttribute('data-id') === str || str === 'all') {
        portfolioCard.classList.remove('hidden')
        // portfolioCard.style.transform = 'scale(1)'
      }
    }
  }

  // Click filter Buttons
  filterBtn.forEach(btn => btn.addEventListener('click', function (e) {
    e.preventDefault()

    // Activating the border in the button menu for the filter
    const current = document.querySelector('.js-filter-btn.border-primary')
    current.classList.remove('border-primary')
    this.classList.add('border-primary')
    // current[0].className = current[0].className.replace(' border-primary', '')
    // this.className += ' border-primary'

    // Calling the function to display
    // stories according to tag
    const dataFilter = btn.getAttribute('data-filter')
    filterSelection(dataFilter)
  }))
})()
