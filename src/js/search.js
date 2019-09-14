/* global searchSettings */

import GhostSearch from './app/app.search'

((window, document) => {
  const qs = document.querySelector.bind(document)
  const qsa = document.querySelectorAll.bind(document)

  const domBody = document.body
  const searchInput = qs('#search-field')
  const searchResults = qs('#search-results')
  const searchMessage = qs('.js-search-message')

  let searchResultsHeight = {
    outer: 0,
    scroll: 0
  }

  // SHow icon search in header
  qs('.js-search-open').classList.remove('u-hide')

  // Variable for search
  // -----------------------------------------------------------------------------
  const mySearchSettings = {
    on: {
      beforeFetch: () => domBody.classList.add('is-loading'),
      afterFetch: () => setTimeout(() => { domBody.classList.remove('is-loading') }, 4000),
      afterDisplay: results => {
        searchResultActive()

        searchResultsHeight = {
          outer: searchResults.offsetHeight,
          scroll: searchResults.scrollHeight
        }

        // Show message if dont have results
        if (results.total === 0 && searchInput.value !== '') {
          searchMessage.classList.remove('u-hide')
        } else {
          searchMessage.classList.add('u-hide')
        }
      }
    }
  }

  // join user settings
  Object.assign(mySearchSettings, searchSettings)

  // when the Enter key is pressed
  // -----------------------------------------------------------------------------
  function enterKey () {
    const link = searchResults.querySelector('a.search-result--active')
    link && link.click()
  }

  // Attending the active class to the search link
  // -----------------------------------------------------------------------------
  function searchResultActive (t, e) {
    t = t || 0
    e = e || 'up'

    // Dont use key functions
    if (window.innerWidth < 768) return

    const searchLInk = searchResults.querySelectorAll('a')

    if (!searchLInk.length) return

    const searchLinkActive = searchResults.querySelector('a.search-result--active')
    searchLinkActive && searchLinkActive.classList.remove('search-result--active')

    searchLInk[t].classList.add('search-result--active')

    const n = searchLInk[t].offsetTop
    let o = 0

    e === 'down' && n > searchResultsHeight.outer / 2 ? o = n - searchResultsHeight.outer / 2 : e === 'up' && (o = n < searchResultsHeight.scroll - searchResultsHeight.outer / 2 ? n - searchResultsHeight.outer / 2 : searchResultsHeight.scroll)

    searchResults.scrollTo(0, o)
  }

  // Clear Input for write new letters
  // -----------------------------------------------------------------------------
  function clearInput () {
    searchInput.focus()
    searchInput.setSelectionRange(0, searchInput.value.length)
  }

  // Search close with Key
  // -----------------------------------------------------------------------------
  function searchClose () {
    domBody.classList.remove('has-search')
    document.removeEventListener('keyup', mySearchKey)
  }

  // Reacted to the up or down keys
  // -----------------------------------------------------------------------------
  function arrowKeyUpDown (keyNumber) {
    let e
    let indexTheLink = 0

    const resultActive = searchResults.querySelector('.search-result--active')
    if (resultActive) {
      indexTheLink = [].slice.call(resultActive.parentNode.children).indexOf(resultActive)
    }

    searchInput.blur()

    if (keyNumber === 38) {
      e = 'up'
      if (indexTheLink <= 0) {
        searchInput.focus()
        indexTheLink = 0
      } else {
        indexTheLink -= 1
      }
    } else {
      e = 'down'
      if (indexTheLink >= searchResults.querySelectorAll('a').length - 1) {
        indexTheLink = searchResults.querySelectorAll('a').length - 1
      } else {
        indexTheLink = indexTheLink + 1
      }
    }

    searchResultActive(indexTheLink, e)
  }

  // Adding functions to the keys
  // -----------------------------------------------------------------------------
  function mySearchKey (e) {
    e.preventDefault()

    const keyNumber = e.keyCode

    /**
      * 38 => Top
      * 40 => down
      * 27 => escape
      * 13 => enter
      * 191 => /
      **/

    if (keyNumber === 27) {
      searchClose()
    } else if (keyNumber === 13) {
      searchInput.blur()
      enterKey()
    } else if (keyNumber === 38 || keyNumber === 40) {
      arrowKeyUpDown(keyNumber)
    } else if (keyNumber === 191) {
      clearInput()
    }
  }

  // Open Search
  // -----------------------------------------------------------------------------
  qsa('.js-search-open').forEach(item => item.addEventListener('click', function (e) {
    e.preventDefault()
    domBody.classList.add('has-search')
    searchInput.focus()
    window.innerWidth > 768 && document.addEventListener('keyup', mySearchKey)
  }))

  // Close Search
  // -----------------------------------------------------------------------------
  qsa('.js-search-close').forEach(item => item.addEventListener('click', function (e) {
    e.preventDefault()
    domBody.classList.remove('has-search')
    document.removeEventListener('keyup', mySearchKey)
  }))

  // Search
  // -----------------------------------------------------------------------------
  /* eslint-disable no-new */
  new GhostSearch(mySearchSettings)
})(window, document)
