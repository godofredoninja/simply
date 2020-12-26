/* global prismJs followSocialMedia menuDropdown siteSearch */

// lib
import 'lazysizes'

import loadScript from './components/load-script'
import videoResponsive from './components/video-responsive'
import resizeImagesInGalleries from './components/resize-images-galleries'
import mediumZoomImg from './components/medium-zoom'
import simplyModal from './components/modal'

import dropDownMenu from './app/menu-drop-down'
import socialMedia from './app/soncial-media'
import headerTransparency from './app/header-transparency'
import darkMode from './app/dark-mode'
import dropdownToggle from './app/dropdown-toggle'

const simplySetup = () => {
  /* Menu DropDown
  /* ---------------------------------------------------------- */
  if (typeof menuDropdown === 'object' && menuDropdown !== null) {
    dropDownMenu(menuDropdown, '.js-dropdown-menu')
  }

  /* Social Media
  /* ---------------------------------------------------------- */
  if (typeof followSocialMedia === 'object' && followSocialMedia !== null) {
    socialMedia(followSocialMedia, '.js-social-media')
  }

  /*  Toggle modal
  /* ---------------------------------------------------------- */
  simplyModal('.js-modal', '.js-modal-button', '.js-modal-close', 'is-active')

  /* Toggle Menu
  /* ---------------------------------------------------------- */
  document.querySelector('.js-menu-toggle').addEventListener('click', function (e) {
    e.preventDefault()
    document.body.classList.toggle('has-menu')
  })

  /* Header Transparency
  /* ---------------------------------------------------------- */
  headerTransparency('.has-cover', 'is-head-transparent')

  /* Dark Mode
  /* ---------------------------------------------------------- */
  darkMode('.js-dark-mode')

  /* All Video Responsive
  /* ---------------------------------------------------------- */
  videoResponsive()

  /* Gallery Card
  /* ---------------------------------------------------------- */
  resizeImagesInGalleries()

  /* medium-zoom
  /* ---------------------------------------------------------- */
  mediumZoomImg('.post-body img')

  /* DropDown Toggle
  /* ---------------------------------------------------------- */
  dropdownToggle('.dropdown:not(.is-hoverable)')

  /* highlight prismjs
  /* ---------------------------------------------------------- */
  if (document.querySelectorAll('code[class*=language-]').length && typeof prismJs !== 'undefined') {
    loadScript(prismJs)
  }

  /* Load Search
  /* ---------------------------------------------------------- */
  if (typeof searchSettings !== 'undefined' && typeof siteSearch !== 'undefined') {
    loadScript(siteSearch)
    // loadScript('https://unpkg.com/@tryghost/content-api@1.4.9/umd/content-api.min.js', () => {
    //   loadScript(siteSearch)
    // })
  }
  //
}

document.addEventListener('DOMContentLoaded', simplySetup)
