export default () => {
  const mediaQuery = window.matchMedia('(max-width: 999px)')

  const $head = document.querySelector('.js-header')
  const $menu = $head.querySelector('.js-head-menu')
  const $nav = $menu?.querySelector('.js-nav')
  if (!$nav) return

  const $logo = $head.querySelector('.header-logo')

  const navHTML = $nav.innerHTML

  const iconDropdown = '<svg class="icon text-header-link w-7 h-7" viewBox="0 0 512 512"><circle cx="256" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><circle cx="416" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><circle cx="96" cy="256" r="32" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg>'

  const makeDropdown = () => {
    if (mediaQuery.matches) return

    const submenuItems = []

    while (($nav.offsetWidth + 64) > $menu.offsetWidth) {
      if ($nav.lastElementChild) {
        submenuItems.unshift($nav.lastElementChild)
        $nav.lastElementChild.remove()
      } else {
        break
      }
    }

    if (!submenuItems.length) {
      // $head.classList.add('is-dropdown-loaded')
      return
    }

    const toggle = document.createElement('li')
    toggle.setAttribute('class', 'dropdown is-hoverable cursor-pointer')
    // toggle.setAttribute('aria-label', 'More')
    toggle.innerHTML = iconDropdown

    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'dropdown-menu leading-snug whitespace-normal')

    const content = document.createElement('div')
    content.setAttribute('class', 'dropdown-content')

    submenuItems.forEach(function (child) {
      child.querySelector('a').classList.remove('text-header-link')
      child.querySelector('a').classList.add('py-2', 'px-3')
      content.appendChild(child)
    })

    wrapper.appendChild(content)
    toggle.appendChild(wrapper)
    $nav.appendChild(toggle)

    // $head.classList.add('is-dropdown-loaded')
    $menu.classList.remove('overflow-x-hidden')
  }

  makeDropdown()

  window.addEventListener('load', function () {
    // const image = $head.querySelector('.header-logo-img')
    // const isLoaded = image.complete && image.naturalHeight !== 0

    // if (isLoaded) {
    //   makeDropdown()
    // }

    if (!$logo) {
      makeDropdown()
    }
  })

  window.addEventListener('resize', function () {
    setTimeout(() => {
      $nav.innerHTML = navHTML
      makeDropdown()
    }, 1)
  })
}
