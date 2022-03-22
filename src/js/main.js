/* global followSocialMedia menuDropdown siteSearch localStorage */

// lib
import 'lazysizes'

import loadScript from './util/load-script'
import urlRegexp from './util/url-regular-expression'
import getAll from './util/get-all'

const simplySetup = () => {
  const rootEl = document.documentElement
  const documentBody = document.body

  /* Menu DropDown
  /* ---------------------------------------------------------- */
  const dropDownMenu = () => {
    // Checking if the variable exists and if it is an object
    if (typeof menuDropdown !== 'object' || menuDropdown === null) return

    // check if the box for the menu exists
    const $dropdownMenu = document.querySelector('.js-dropdown-menu')
    if (!$dropdownMenu) return

    Object.entries(menuDropdown).forEach(([name, url]) => {
      if (name !== 'string' && !urlRegexp(url)) return

      const link = document.createElement('a')
      link.href = url
      link.classList = 'dropdown-item block py-2 leading-tight px-5 hover:text-primary'
      link.innerText = name

      $dropdownMenu.appendChild(link)
    })
  }

  dropDownMenu()

  /* Social Media
  /* ---------------------------------------------------------- */
  const socialMedia = () => {
    // Checking if the variable exists and if it is an object
    if (typeof followSocialMedia !== 'object' || followSocialMedia === null) return

    // check if the box for the menu exists
    const $socialMedia = getAll('.js-social-media')
    if (!$socialMedia.length) return

    const linkElement = element => {
      Object.entries(followSocialMedia).forEach(([name, urlTitle]) => {
        const url = urlTitle[0]

        // The url is being validated if it is false it returns
        if (!urlRegexp(url)) return

        const link = document.createElement('a')
        link.href = url
        link.title = urlTitle[1]
        link.classList = 'p-2 inline-block hover:opacity-70'
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        link.innerHTML = `<svg class="icon"><use xlink:href="#icon-${name}"></use></svg>`

        element.appendChild(link)
      })
    }

    $socialMedia.forEach(linkElement)
  }

  socialMedia()

  /*  Toggle modal
  /* ---------------------------------------------------------- */
  const simplyModal = () => {
    const $modals = getAll('.js-modal')
    const $modalButtons = getAll('.js-modal-button')
    const $modalCloses = getAll('.js-modal-close')

    // Modal Click Open
    if (!$modalButtons.length) return
    $modalButtons.forEach($el => $el.addEventListener('click', () => openModal($el.dataset.target)))

    // Modal Click Close
    if (!$modalCloses.length) return
    $modalCloses.forEach(el => el.addEventListener('click', () => closeModals()))

    const openModal = target => {
      documentBody.classList.remove('has-menu')
      const $target = document.getElementById(target)
      rootEl.classList.add('overflow-hidden')
      $target.classList.add('is-active')

      if (target === 'modal-search') {
        document.querySelector('#search-field').focus()
      }
    }

    const closeModals = () => {
      rootEl.classList.remove('overflow-hidden')
      $modals.forEach($el => $el.classList.remove('is-active'))
    }

    document.addEventListener('keydown', function (event) {
      const e = event || window.event
      if (e.keyCode === 27) {
        closeModals()
        // closeDropdowns()
      }
    })
  }

  simplyModal()

  /* Header Transparency
  /* ---------------------------------------------------------- */
  const headerTransparency = () => {
    const hasCover = documentBody.closest('.has-cover')
    const $jsHeader = document.querySelector('.js-header')

    window.addEventListener('scroll', () => {
      const lastScrollY = window.scrollY

      if (lastScrollY > 5) {
        $jsHeader.classList.add('shadow-header', 'header-bg')
      } else {
        $jsHeader.classList.remove('shadow-header', 'header-bg')
      }

      if (!hasCover) return

      lastScrollY >= 20 ? documentBody.classList.remove('is-head-transparent') : documentBody.classList.add('is-head-transparent')
    }, { passive: true })
  }

  headerTransparency()

  /* Dark Mode
  /* ---------------------------------------------------------- */
  const darkMode = () => {
    const $toggleDarkMode = getAll('.js-dark-mode')

    if (!$toggleDarkMode.length) return

    $toggleDarkMode.forEach(item => item.addEventListener('click', function (event) {
      event.preventDefault()

      if (!rootEl.classList.contains('dark')) {
        rootEl.classList.add('dark')
        localStorage.theme = 'dark'
      } else {
        rootEl.classList.remove('dark')
        localStorage.theme = 'light'
      }
    }))
  }

  darkMode()

  /* DropDown Toggle
  /* ---------------------------------------------------------- */
  const dropDownMenuToggle = () => {
    const dropdowns = getAll('.dropdown:not(.is-hoverable)')

    if (!dropdowns.length) return

    dropdowns.forEach(function (el) {
      el.addEventListener('click', function (event) {
        event.stopPropagation()
        el.classList.toggle('is-active')
        documentBody.classList.remove('has-menu')
      })
    })

    const closeDropdowns = () => dropdowns.forEach(function (el) {
      el.classList.remove('is-active')
    })

    document.addEventListener('click', closeDropdowns)
  }

  dropDownMenuToggle()

  /* Toggle Menu
  /* ---------------------------------------------------------- */
  document.querySelector('.js-menu-toggle').addEventListener('click', function (e) {
    e.preventDefault()
    documentBody.classList.toggle('has-menu')
  })

  /* Load Search
  /* ---------------------------------------------------------- */
  if (typeof searchSettings !== 'undefined' && typeof siteSearch !== 'undefined') {
    loadScript(siteSearch)
  }
}

document.addEventListener('DOMContentLoaded', simplySetup)
