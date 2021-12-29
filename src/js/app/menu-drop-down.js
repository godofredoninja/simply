import urlRegexp from '../components/url-regular-expression'

export default (menuDropDown, box) => {
  // check if the box for the menu exists
  const newbox = document.querySelector(box)

  /*
    var menuDropdown = {
      'Sidebar': 'http://...',
      'Featured': 'http://...'
    }
  */

  if (!newbox) return

  Object.entries(menuDropDown).forEach(([name, url]) => {
    if (name !== 'string' && !urlRegexp(url)) return

    const link = document.createElement('a')
    link.href = url
    link.classList = 'dropdown-item hover:text-primary'
    link.innerText = name
    // link.innerHTML = `<a href="${url}" class="dropdown-item hover:text-primary">${name}</a>`

    newbox.appendChild(link)
  })
}
